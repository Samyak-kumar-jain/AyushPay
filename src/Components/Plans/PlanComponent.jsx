import React from "react";
import PlansBenifit from "./PlansBenifit.jsx";
import AyushPayLoader from "../Common/AyuspayLoader.jsx";
import { SubscriptionContext } from "../../Context/SubscriptionContext.jsx";
import { useContext } from "react";
import checkMark from "../../assets/CheckMark.png";

export default function PlansCard() {
  const { subscriptions = [], loading, selectedPlan, setSelectedPlan } =
    useContext(SubscriptionContext);

  if (loading) return <AyushPayLoader />;
  if (!subscriptions.length) return <p>No plans available</p>;

  const handleSelect = (plan) => setSelectedPlan(plan);

  return (
    <>
      <div className="w-full p-2 overflow-x-auto no-scrollbar space-y-[25px]">
        <div className="flex space-x-[10px]">
          {subscriptions.map((plan, idx) => {
            const isSelected = selectedPlan?.name === plan.name;
            return (
              <div
                key={idx}
                onClick={() => handleSelect(plan)}
                className={`relative w-[110px] h-[130px] text-[10px] rounded-[12px] flex flex-col justify-between px-[8px] py-[20px] cursor-pointer transition 
                  ${
                    isSelected
                      ? "bg-[linear-gradient(135deg,#374295,#366BD1)] text-white "
                      : "bg-white border-[0.75px] border-[#4E4E4C] text-gray-800"
                  }`}
              >
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

                <div className="w-[100px]">
                  <h3 className="text-[12px] font-medium">{plan.name}</h3>
                  <p className="font-bold flex items-center text-[16px]">
                    {plan.price}
                    <span className="text-[12px] ml-[7px] font-normal">
                      {plan.gst}
                    </span>
                  </p>
                  <p className="text-[13px] mt-1">{plan.duration}</p>
                  <p className="text-[11px]">{plan.planPerMonth}</p>
                </div>

                {isSelected && (
                  <div className="flex justify-end">
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-[0_0_4px_0_rgba(0,0,0,0.35)]">
                      <img src={checkMark} alt="checkmark" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedPlan && (
        <div className="mt-4">
          <PlansBenifit
            selectedPlan={selectedPlan.name}
            benefits={selectedPlan.benefits}
            consultation={selectedPlan.consultation}
            saveOn={selectedPlan.saveOn}
          />
        </div>
      )}
    </>
  );
}
