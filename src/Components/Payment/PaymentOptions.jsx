import wallet from "../../assets/Wallet.png";
import upi from "../../assets/upi.png";
import { useState } from "react";

export const PaymentOptions = () => {
  const [selected, setSelected] = useState(""); // track selected option

  const options = [
    { id: "upi", name: "UPI", icon: upi },
    { id: "wallet", name: "Wallet", icon: wallet },
  ];

  return (
    <div className="w-full flex flex-col space-y-3  p-3 rounded-lg bg-gray-50">
      <p className="text-[12px] font-semibold text-[#3A358A] ml-[15px]">More Payment Options</p>

      <div className="flex flex-col space-y-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`w-full flex items-center gap-4 p-[10px] rounded-lg cursor-pointer transition 
              ${selected === option.id ? "border-2 border-blue-600 bg-blue-50" : "bg-white border border-gray-200"}
            `}
          >
            <img
              src={option.icon}
              alt={option.name}
              className="w-[62px] h-[62px] rounded-lg object-cover"
            />
            <p className="font-medium text-[#3A358A]">{option.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
