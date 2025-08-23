import { useContext } from "react";
import {PlansContext} from "../Context/PaymentContext.jsx"

export const usePlans = () => useContext(PlansContext);
