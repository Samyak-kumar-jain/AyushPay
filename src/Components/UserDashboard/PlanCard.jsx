// src/components/PlanCard.jsx
import React from "react";
import CrownIcon from "../../assets/Crown.png"; // replace with your icon path

const PlanCard = ({ plan }) => {
  if (!plan) return null;

  return (
    <div
      className=" rounded-[12px] w-[350px]  px-[13px] py-[18px] text-white shadow-[0px_2px_4px_0px_#00000040]
 bg-[linear-gradient(93.33deg,_#374295_2.27%,_#3761C2_98.65%)]"
      
    >
      {/* Icon and status */}
      <div className="flex items-center mb-2">
        <img src={CrownIcon} alt="Crown" className="w-[30px] h-[30px] mr-2" />
      </div>

      {/* Plan Name */}
      <h2 className=" font-bold text-[23px] ">{plan.name} Plan <span className="text-green-400 text-[17px]">(Active)</span></h2>
      <p className="text-[15px] text-gray-200 font-extralight -mt-1">Valid until {plan.validUntil || "November 11, 2025"}</p>

      {/* Plan Price and Duration */}
      <div className="flex justify-between text-sm  mt-[43px]">
        <div>
          <p className="font-weight-100 text-gray-200">Plan Value</p>
          <p className="text-[16px] font-semibold ">{plan.price} {plan.gst}</p>
        </div>
        <div>
          <p className="font-medium">Duration</p>
          <p>{plan.duration}</p>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
