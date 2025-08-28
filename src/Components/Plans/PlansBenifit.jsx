import Check from "../../assets/Check.png";

const PlansBenefit = ({ benefits = [], consultation = [], saveOn = [] }) => {
  // helper to render each section
  const renderSection = (data = []) =>
    data.map((item, idx) => (
      <div
        key={idx}
        className="flex justify-between items-start px-1 py-3 border-b border-b-[#4E4E4C] last:border-b-0"
      >
        {/* Left text with HTML */}
        <div
          className="text-[14px] text-gray-700 leading-snug w-[250px] text-left"
          dangerouslySetInnerHTML={{ __html: item.key }}
        />

        {/* Right value */}
        <div className="text-sm font-semibold text-gray-800 text-right">
          {!item.value || item.value === "" ? (
            <img src={Check} className="w-4 h-4" alt="check" />
          ) : (
            <span
              className={
                item.value === "Unlimited" ? "text-blue-600 font-bold" : ""
              }
              dangerouslySetInnerHTML={{ __html: item.value }}
            />
          )}
        </div>
      </div>
    ));

  return (
    <div className="w-full rounded-lg overflow-hidden -mt-3">

      {benefits.length > 0 && renderSection(benefits)}
      
      {/* ✅ Render benefits */}
      
      {saveOn.length > 0 && renderSection(saveOn)}
      {/* ✅ Render consultation */}
      {consultation.length > 0 && renderSection(consultation)}
      

      {/* ✅ Render save_on */}
     
    </div>
  );
};

export default PlansBenefit;
