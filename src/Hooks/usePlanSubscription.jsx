import { useContext } from "react";
import { SubscriptionContext } from "../Context/subscriptionContext";

export const usePlanSubscriptions = () => {
  return useContext(SubscriptionContext);
};