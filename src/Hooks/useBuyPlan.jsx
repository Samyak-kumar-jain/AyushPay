// src/hooks/useBuyPlan.js
import { useContext } from "react";
import { BuyPlanContext } from "../Context/BuyPlanContext";

export const useBuyPlan = () => {
  const context = useContext(BuyPlanContext);
  if (!context) {
    throw new Error("useBuyPlan must be used inside BuyPlanProvider");
  }
  return context;
};
