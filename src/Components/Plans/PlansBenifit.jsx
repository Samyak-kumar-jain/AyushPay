import React from "react";
import Check from "../../assets/Check.png"

const PlansBenifit = ({ benefits = {} }) => {
  return (
    <div className="w-full  rounded-lg overflow-hidden -mt-3">
      {Object.entries(benefits).map(([key, value], idx) => (
        <div
          key={idx}
          className="flex justify-between items-start px-1 py-3 border-b border-b-[#4E4E4C] last:border-b-0"
        >
          {/* Left text */}
          <div className="text-sm text-gray-700 leading-snug w-[250px] text-left">
            {key}
            {key === "Max cashback on Surgeries" && (
              <p className="text-xs text-gray-500">
                (Only if loan isn’t approved)
              </p>
            )}
            {key === "Daily Hospital Allowance" && (
              <p className="text-xs text-gray-500">(Max 3 days)</p>
            )}
            {key === "Health Guardian Assistance" && (
              <p className="text-xs text-gray-500">(For hospital admissions)</p>
            )}
          </div>

          {/* Right value */}
          <div className="text-sm font-semibold text-gray-800 text-right">
            {typeof value === "boolean" ? (
              value ? <img src={Check} className=" w-4 h-4" /> : "-"
            ) : (
              <span
                className={
                  value === "Unlimited" ? "text-blue-600 font-bold" : ""
                }
              >
                {value}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlansBenifit;
