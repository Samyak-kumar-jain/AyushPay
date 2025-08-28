// Context/SubscriptionContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { fetchSubscriptions } from "../Api/PlanCarsApi/planCardAPi.js";
import { initiatePaymentAPI } from "../Api/RazorPay/RazorPayapi.js"; // separate API call
import { OtpContext } from "./OtpContext";

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const { applicationId: contextAppId, authToken: contextToken } = useContext(OtpContext);

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasedPlan, setPurchasedPlan] = useState(null);

  const [applicationId, setApplicationId] = useState(
    contextAppId || localStorage.getItem("applicationId") || null
  );
  const [authToken, setAuthToken] = useState(
    contextToken || localStorage.getItem("authToken") || null
  );

  // Sync context updates
  useEffect(() => {
    if (contextAppId) setApplicationId(contextAppId);
    if (contextToken) setAuthToken(contextToken);
  }, [contextAppId, contextToken]);

  // Load purchased plan from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("purchasedPlan");
    if (saved) setPurchasedPlan(JSON.parse(saved));
  }, []);

  // Fetch subscriptions
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
      } catch (err) {
        setError(err.message || "Failed to fetch subscriptions");
      } finally {
        setLoading(false);
      }
    }

    loadSubscriptions();
  }, [applicationId, authToken]);

  // Buy plan + Razorpay
  const buyPlan = async (plan) => {
    if (!plan) {
      alert("Please select a plan to buy");
      return false;
    }

    if (!authToken || !applicationId) {
      alert("Please login first to buy a plan");
      return false;
    }

    setLoading(true);
    try {
      // ✅ Prepare payload
      const payload = {
        application_id: applicationId,
        eservice: "pg-razorpay",
        amount: plan.price.toString(), // make sure it's a string
      };

      // ✅ Call Razorpay API
      const paymentSuccess = await initiatePaymentAPI(payload, authToken,payload);

      if (paymentSuccess) {
        setPurchasedPlan(plan);
        localStorage.setItem("purchasedPlan", JSON.stringify(plan));
        return true; // payment succeeded
      } else {
        alert("Payment failed or was cancelled.");
        return false; // payment failed
      }
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
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
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
