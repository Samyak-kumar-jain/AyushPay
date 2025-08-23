import { createContext, useState, useEffect } from "react";
import { plans } from "../Data/Plans.js"; // adjust path as needed

export const PlansContext = createContext();

export const PlansProvider = ({ children }) => {
  const [selected, setSelected] = useState("Platinum");
  const [loading, setLoading] = useState(false);
  const [purchasedPlan, setPurchasedPlan] = useState(null); // 🛒 only one plan

  // Load purchased plan from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("purchasedPlan");
    if (saved) {
      setPurchasedPlan(JSON.parse(saved));
    }
  }, []);

  // Save purchased plan to localStorage whenever it changes
  useEffect(() => {
    if (purchasedPlan) {
      localStorage.setItem("purchasedPlan", JSON.stringify(purchasedPlan));
    } else {
      localStorage.removeItem("purchasedPlan"); // clear if null
    }
  }, [purchasedPlan]);

  // Find selected plan object
  const selectedPlanObj = plans.plans.find((plan) => plan.name === selected);

  // Handle selecting a plan
  const handleSelect = (planName) => {
    if (planName === selected) return;
    setSelected(planName);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // 🔘 External button to select a plan
  const selectPlanByButton = (planName) => {
    handleSelect(planName);
  };

  // 🛒 External button to BUY (replace old plan)
  const buyPlan = (planName) => {
    const planToBuy = plans.plans.find((p) => p.name === planName);
    if (!planToBuy) return;

    setPurchasedPlan(planToBuy); // replace old one
  };

  return (
    <PlansContext.Provider
      value={{
        plans: plans.plans,
        selected,
        selectedPlanObj,
        loading,
        handleSelect,
        selectPlanByButton,
        buyPlan,         // 👈 Buy button logic
        purchasedPlan,   // 👈 Only one active plan
      }}
    >
      {children}
    </PlansContext.Provider>
  );
};

