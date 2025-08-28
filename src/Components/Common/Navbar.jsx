import { useEffect, useState } from "react";
import { useAnchor } from "../../Hooks/UseAnchor.jsx";
import Logo from "../../assets/Logo.png";
import { fetchAnchorLogo } from "../../Api/Logo/fetchLogo.js";

function Navbar() {
  const { anchor } = useAnchor(); 
  const [companyLogo, setCompanyLogo] = useState(null);

  useEffect(() => {
  if (anchor && anchor.trim() !== "") {
    fetchAnchorLogo(anchor).then((logoUrl) => {
      setCompanyLogo(logoUrl);
    });
  }
}, [anchor]);


  return (
    <div className="w-full max-w-[390px] h-[80px] flex justify-between items-center px-[20px] py-[27px] border border-gray-200 shadow-sm bg-white">
   
      <img
        src={Logo}
        alt="AyushPay"
        className="max-w-[162px] h-auto object-contain"
      />

     
      {companyLogo ? (
        <img
          src={companyLogo}
          alt={`${anchor} logo`}
          className="max-w-[114px] h-[40px] object-contain"
        />
      ) : (
        <div className="w-[114px] h-[40px] bg-gray-100 animate-pulse rounded"></div>
      )}
    </div>
  );
}

export default Navbar;
