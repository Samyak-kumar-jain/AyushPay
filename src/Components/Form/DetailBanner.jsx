import React from "react";

function DetailBanner() {
  return (
    <div className="max-w-[350px] w-full bg-[#F1F6FE] h-[138px] rounded-[12px]  px-[10px] py-[20px] text-center relative shadow-sm">
      {/* Heading with * */}
      <h2 className="font-inter text-[25px] leading-[115%]">
        <span className="font-bold text-[#4298C8]">
          Ready for better <br></br> Health care?
        </span>
        
      </h2>

      {/* Subtitle (closer to heading) */}
      <p className="font-inter font-medium text-[14px] leading-[115%] text-[#4E4E4C] mt-2 text-center">
        Just Tell Us a Bit About Yourself, and We’ll Customize Your Plan.
      </p>

    
    </div>
  );
}

export default DetailBanner;
