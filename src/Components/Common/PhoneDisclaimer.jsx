import shield from "../../assets/ProtectShield 2.png";
import agree from "../../assets/Agreed 2.png";

const Disclaimer = () => {
  // JSON with image icons
  const items = [
    {
      icon: shield,
      text: "We protect your data with bank-grade security.",
    },
    {
      icon: agree,
      text: `By continuing, you agree to AyushPay’s 
             <a href="/terms" class="text-blue-600 underline">Terms</a> 
             and <a href="/privacy" class="text-blue-600 underline">Privacy Policy</a>.`,
    },
  ];

  return (
    <div className="text-[11px] text-gray-600 space-y-2 mt-4">
      {items.map((item, index) => (
        <p key={index} className="flex items-start gap-3">
          <img src={item.icon} alt="icon" className="w-3 h-3 mt-0.5" />
          <span dangerouslySetInnerHTML={{ __html: item.text }} />
        </p>
      ))}
    </div>
  );
};

export default Disclaimer;
