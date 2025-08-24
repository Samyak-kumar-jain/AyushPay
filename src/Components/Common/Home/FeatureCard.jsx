import Hospital from "../../../assets/Hospital.png";
import easyAdmission from "../../../assets/easyAdmission.png";
import MedicalC from "../../../assets/MedicalC.png";

export default function Features() {
  const features = [
    {
      icon: Hospital,
      title: "Cashless Hospitalization",
      desc: "Across 10K+ Partner Hospitals",
    },
    {
      icon: easyAdmission,
      title: "Health Guardian Support",
      desc: "For Hospital Admissions",
    },
    {
      icon: MedicalC,
      title: "Comprehensive Coverage",
      desc: "Surgeries, Pre-Existing Diseases",
    },
  ];

  return (
    <div className="flex flex-col space-y-[25px] w-full max-w-md px-[17px] py-[25px] rounded-[12px] bg-white border border-gray-200">
      {features.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 border bg-white rounded-[12px] border-[#4E4E4C80]"
        >
          {/* Icon/Image in Circle */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-50">
            <img
              src={item.icon}
              alt={item.title}
              className="w-6 h-6 object-contain"
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="font-inter font-bold text-[16px] text-[#4298C8]">
              {item.title}
            </h3>
            <p className="font-inter font-normal text-[14px] leading-[112%] text-[#4E4E4C]">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
