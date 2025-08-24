import React from 'react'
import Check from "../../assets/Check.png"


const PurchasedPlanBenifits = ({benefits={}}) => {
  return (
    <div className="w-full overflow-hidden space-y-[10px] ">
          {Object.entries(benefits).map(([key, value], idx) => (
            <div
              key={idx}
              className="flex justify-between rounded-[6px] bg-white items-start p-[12px] shadow-[0px_0px_4px_0px_#0000001A]
 border border-gray-100"
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
  )
}

export default PurchasedPlanBenifits