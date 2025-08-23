import PlanBannerimg from "../../assets/PlanBanner.png";

export default function PlanBanner() {
  return (
    <div className=" bg-blue-50 rounded-lg flex items-center  px-[16px] py-[35px] gap-3 shadow-sm ">
      {/* Left Content */}
      <div>
        <h2 className="text-xl font-bold text-[#4298C8]">
          Choose the Plan <br /> that’s Right for You
        </h2>
        <p className="text-[#4E4E4C] text-[13px]">
          As Per Your Need and Requirements
        </p>
      </div>

      {/* Right Image Illustration */}
      <div className="flex-shrink-0">
        <img
          src={PlanBannerimg}
          alt="Plan Banner Illustration"
          className="w-[78px] h-[78px] object-contain"
        />
      </div>
      
    </div>
  );
}
