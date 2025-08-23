import Logo from "../../assets/Logo.png";
import company from "../../assets/company.png";

function Navbar() {
  return (
    <div className="w-full max-w-[390px] h-[80px] flex justify-between items-center px-[20px] py-[27px] border border-gray-200 shadow-sm bg-white">
      {/* Left Logo */}
      <img
        src={Logo}
        alt="AyushPay"
        className="max-w-[162px] h-auto object-contain"
      />

      {/* Right Logo */}
      <img
        src={company}
        alt="Turtlemint"
        className="max-w-[114px] h-auto object-contain"
      />
    </div>
  );
}

export default Navbar;
