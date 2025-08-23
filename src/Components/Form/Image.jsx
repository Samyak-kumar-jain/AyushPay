import React from "react";
import form from "../../assets/form.png"
const CenteredImage = () => {
  return (
    <div className="flex justify-center ">
      <img
        src={form} 
        alt="Illustration"
        className="w-[272px] h-[230px] "
      />
    </div>
  );
};

export default CenteredImage;
