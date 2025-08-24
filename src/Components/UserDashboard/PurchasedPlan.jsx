import React from "react";
import PlanCard from "../../Components/UserDashboard/PlanCard.jsx";
import PurchasedPlanBenifits from "./PurchasedPlanBenifits.jsx";
import BenifitTag from "./BenifitTag.jsx";
import { SubBanner } from "./SubBanner.jsx";
import Subgif from "../../Components/UserDashboard/Subgif.jsx";
import { useSubscription } from "../../Hooks/useSubsription.jsx";

const PurchasedPlan = () => {
  const { plan, isPlanLoading } = useSubscription();

  return (
    <div className="flex justify-center flex-col space-y-[25px] mt-5">
      {isPlanLoading ? (
        <Subgif />
      ) : plan ? (
        <>
          <PlanCard plan={plan} />
          <div className="space-y-[10px]">
            <BenifitTag />
            <PurchasedPlanBenifits benefits={plan?.benefits || []} />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No plan purchased yet.</p>
      )}
    </div>
  );
};

export default PurchasedPlan;
