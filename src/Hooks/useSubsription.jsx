import { useContext } from "react";
import { PlanContext } from "../Context/PlanContext";

export const useSubscription = () => {
  return useContext(PlanContext);
};