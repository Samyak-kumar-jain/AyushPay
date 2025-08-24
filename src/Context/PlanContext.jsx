import { createContext, useEffect, useState } from "react";

export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState(null);
  const [isPlanLoading, setIsPlanLoading] = useState(false);

  useEffect(() => {
    // On initial load, check if user already has a plan
    const storedPlan = localStorage.getItem("purchasedPlan");
    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }
  }, []);

  return (
    <PlanContext.Provider value={{ plan, setPlan, isPlanLoading, setIsPlanLoading }}>
      {children}
    </PlanContext.Provider>
  );
};
