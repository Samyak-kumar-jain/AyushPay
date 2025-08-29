// Context/SubscriptionContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { fetchSubscriptions } from "../Api/PlanCarsApi/planCardAPi.js";
import { initiatePaymentAPI } from "../Api/RazorPay/RazorPayapi.js"; 
import { OtpContext } from "./OtpContext";
import { PlanContext } from "./PlanContext.jsx";
import { useSubscription } from "../Hooks/useSubsription.jsx";


export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const { applicationId: contextAppId, authToken: contextToken } = useContext(OtpContext);

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasedPlan, setPurchasedPlan] = useState(null);
  const { setIsPlanLoading} = useSubscription()

  // 👇 NEW state for selected plan
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [applicationId, setApplicationId] = useState(
    contextAppId || localStorage.getItem("applicationId") || null
  );
  const [authToken, setAuthToken] = useState(
    contextToken || localStorage.getItem("authToken") || null
  );

  useEffect(() => {
    if (contextAppId) setApplicationId(contextAppId);
    if (contextToken) setAuthToken(contextToken);
  }, [contextAppId, contextToken]);

  useEffect(() => {
    const saved = localStorage.getItem("purchasedPlan");
    if (saved) setPurchasedPlan(JSON.parse(saved));
  }, []);

  useEffect(() => {
    async function loadSubscriptions() {
      if (!applicationId || !authToken) return;

      try {
        setLoading(true);
        const data = await fetchSubscriptions(applicationId, authToken);

        const plans = data.msg.items.map((item) => ({
          id: item.id,
          name: item.subscription.name,
          price: item.subscription.amount,
          gst: "+ GST",
          duration: `${item.subscription.plan_in_months} months`,
          planPerMonth: `₹${Math.ceil(item.subscription.amount / item.subscription.plan_in_months)}/month`,
          tag: item.subscription.is_best_value ? "Best Value" : null,
          benefits: item.subscription.data.benefits,
          consultation: item.subscription.data.consultation,
          saveOn: item.subscription.data.save_on,
          vehicle: item.subscription.vehicle,
        }));

        setSubscriptions(plans);

        // 👇 Set first plan as default selection
        if (plans.length && !selectedPlan) {
          setSelectedPlan(plans[0]);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch subscriptions");
      } finally {
        setLoading(false);
      }
    }

    loadSubscriptions();
  }, [applicationId, authToken]);

 const buyPlan = async (plan) => {
  if (!plan) {
    alert("Please select a plan to buy");
    return { status: "failed" };
  }

  if (!authToken || !applicationId) {
    alert("Please login first to buy a plan");
    return { status: "failed" };
  }

setIsPlanLoading(true)
  try {
    const payload = {
      application_id: applicationId,
      eservice: "pg-razorpay",
      amount: plan.price.toString(),
    };

    // this should now return { status: "success" | "cancel" | "failed" }
    const paymentResult = await initiatePaymentAPI(payload, authToken);

    if (paymentResult?.status === "success") {
      setPurchasedPlan(plan);
      localStorage.setItem("purchasedPlan", JSON.stringify(plan));
      return { status: "success" };
    } else if (paymentResult?.status === "cancel") {
      return { status: "cancel" };
    } else {
      return { status: "failed" };
    }
  } catch (err) {
    console.error("Payment failed:", err);
    return { status: "failed" };
  } finally {
    setIsPlanLoading(false)
  }
};

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        loading,
        error,
        purchasedPlan,
        buyPlan,
        selectedPlan,      // 👈 expose selected plan
        setSelectedPlan,   // 👈 expose setter
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
