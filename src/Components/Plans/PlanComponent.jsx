import React from "react";
import PlansBenifit from "./PlansBenifit.jsx";
import AyushPayLoader from "../Common/AyuspayLoader.jsx";
import { usePlans } from "../../Hooks/UsePlan.jsx"; // 👈 import context
import checkMark from "../../assets/CheckMark.png"

export default function PlansCard() {
  // 👇 Pull everything from context instead of local state
  const { plans, selected, selectedPlanObj, loading, handleSelect } = usePlans();

  return (
    <>
      {/* Plan Cards Row */}
      <div className="w-full p-2 overflow-x-auto no-scrollbar space-y-[25px]">
        <div className="flex space-x-[10px]">
          {plans.map((plan, idx) => {
            const isSelected = selected === plan.name;
            return (
              <div
                key={idx}
                onClick={() => handleSelect(plan.name)}
                className={`relative w-[100px] h-[130px] text-[10px] rounded-[12px] flex flex-col justify-between px-[8px] py-[20px] cursor-pointer transition 
                  ${
                    isSelected
                      ? "bg-[linear-gradient(135deg,#374295,#366BD1)] text-white "
                      : "bg-white border-[0.75px] border-[#4E4E4C] text-gray-800"
                  }`}
              >
                {/* Best Value Tag */}
                {plan.tag && (
                  <span
                    className={`absolute -top-1 left-3.5 text-[11px] font-semibold px-2 py-0.5 rounded-sm 
                    ${
                      isSelected
                        ? "bg-green-400 text-blue-900 shadow-[0_0_4px_0_rgba(0,0,0,0.35)]"
                        : "text-white bg-gray-600 shadow-[0_0_4px_0_rgba(0,0,0,0.35)]"
                    }`}
                  >
                    {plan.tag}
                  </span>
                )}

                {/* Plan Info */}
                <div className="w-[100px]">
                  <h3 className="text-[14px] font-medium">{plan.name}</h3>
                  <p className="font-bold flex items-center text-[16px]">
                    {plan.price}
                    <span className="text-[12px] ml-[7px] font-normal">
                      {plan.gst}
                    </span>
                  </p>
                  <p className="text-[13px] mt-1">{plan.duration}</p>
                  <p className="text-[11px]">{plan.planPerMonth}</p>
                </div>

                {/* Tick for Selected */}
                {isSelected && (
                  <div className="flex justify-end">
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-[0_0_4px_0_rgba(0,0,0,0.35)]">
                      <img src={checkMark} alt="checkmark"></img>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      {selectedPlanObj && (
        <div className="mt-4">
          {loading ? (
            <AyushPayLoader />
          ) : (
            <PlansBenifit
              selectedPlan={selectedPlanObj.name}
              benefits={selectedPlanObj.benefits}
            />
          )}
        </div>
      )}
    </>
  );
}
