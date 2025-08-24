import React from "react";

function MedicalLoanCard() {
  return (
    <div className="max-w-[350px] w-full bg-[#F1F6FE] rounded-[12px]  px-[8px] py-[19px] text-center relative">
      {/* Heading with * */}
      <h2 className="font-inter text-[24px] leading-[115%]">
        <span className="font-bold text-[#4298C8]">
          Unlock Zero Cost Medical Loans for just ₹39/month
        </span>
        <span className="font-light text-[#3B82B6]">*</span>
      </h2>

      {/* Subtitle (closer to heading) */}
      <p className="font-inter font-medium text-[14px] leading-[115%] text-[#4E4E4C] mt-2 text-center">
        A Financial Safety Net for Medical Emergencies
      </p>

      {/* Terms (updated as per your spec) */}
      <p className="font-inter font-normal text-[8px] leading-[100%] text-[#6B7280] mt-3  text-right mr-7">
        *T&amp;C apply
      </p>
    </div>
  );
}

export default MedicalLoanCard;
