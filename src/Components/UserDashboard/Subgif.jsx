import React from "react";
import Subgifimg from "../../assets/loadgif.gif";

export default function Subgif() {
  return (
    <div className="w-full flex justify-center">
      
      <img src={Subgifimg} className="w-[328px] h-[260px]" alt="loading..." />
    </div>
  );
}
