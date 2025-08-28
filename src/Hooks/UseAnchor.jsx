import { useContext } from "react";
import { AnchorContext } from "../Context/AnchorContext";
export const useAnchor = () => useContext(AnchorContext);