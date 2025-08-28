// Context/AnchorContext.jsx
import { createContext, useState } from "react";
import { useParams } from "react-router-dom";

export const AnchorContext = createContext();

export const AnchorProvider = ({ children }) => {
  const { anchor: paramAnchor } = useParams();   // get from URL
  const [anchor, setAnchor] = useState(paramAnchor || null);

  return (
    <AnchorContext.Provider value={{ anchor, setAnchor }}>
      {children}
    </AnchorContext.Provider>
  );
};
