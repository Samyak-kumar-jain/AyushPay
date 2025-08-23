import { Building, HeartPulse, Umbrella } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Building className="w-6 h-6 text-sky-500" />,
      title: "Cashless Hospitalization",
      desc: "Across 10K+ Partner Hospitals",
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-sky-500" />,
      title: "Health Guardian Support",
      desc: "For Hospital Admissions",
    },
    {
      icon: <Umbrella className="w-6 h-6 text-sky-500" />,
      title: "Comprehensive Coverage",
      desc: "Surgeries, Pre-Existing Diseases",
    },
  ];

  return (
   
      <div className="flex flex-col space-y-[25px] w-full max-w-md  px-[17px] py-[25px] rounded-[12px] bg-white  border border-gray-200">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4  border  bg-white  rounded-[12px] border-[#4E4E4C80]"
          >
            {/* Icon in Circle */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-50">
              {item.icon}
            </div>

            {/* Text */}
            <div>
              <h3 className="font-inter font-bold text-[16px] text-[#4298C8]">
                {item.title}
              </h3>
              <p className="font-inter font-normal text-[14px] leading-[112%] align-middle text-[#4E4E4C]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    
  );
}
