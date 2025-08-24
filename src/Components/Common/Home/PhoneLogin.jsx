import React, { useContext } from "react";
import { OtpContext } from "../../../Context/OtpContext";
import { AuthContext } from "../../../Context/AuthContex";
import LoginDisclaimer from "../LoginDisclaimer";
import editPen from "../../../assets/editPen.png"



export default function TwoStepForm() {
  const {
    step,
    phone,
    setPhone,
    otp,
    error,
    success,
    inputsRef,
    handleOtpChange,
    handleKeyDown,
    setStep,
    setOtp,
  } = useContext(OtpContext);

  const { handleToggleLogin } = useContext(AuthContext); // switch to userid login

  return (
    <div className="bg-gray-50">
      {/* STEP 1: Enter Mobile */}
      {step === 1 && (
        <div className="w-full bg-white border border-gray-200 rounded-xl shadow-[0_0_4px_0_rgba(0,0,0,0.1)] p-5">
          <h3 className="text-base font-semibold mb-4 text-center">
            Please enter your Mobile No. to proceed
          </h3>

          <div className="flex items-center border border-[#4E4E4C80] rounded-lg overflow-hidden mb-3">
            <span className="px-3 text-gray-600">+91</span>
            <input
              type="tel"
              maxLength="10"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 10-Digit Mobile No."
              className="w-full p-2 outline-none text-sm  "
            />
          </div>

          <div className="flex items-center my-3 px-16">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-sm mb-4">
            <span
              className="text-[#4298C8] font-bold underline cursor-pointer"
              onClick={handleToggleLogin}
            >
              Login using User Id and Password
            </span>
          </p>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <LoginDisclaimer/>
        </div>
      )}

      {/* STEP 2: Enter OTP */}
      {step === 2 && phone && (
        <div className="w-[350px] bg-white border border-gray-200 rounded-xl shadow-md p-5">
         <h3 className="text-[16px] font-bold mb-4">
  We’ve sent an OTP
  <b className="inline-flex items-center text-[16px] font-bold ">
    to mobile number {phone}
    <span
      onClick={() => {
        setStep(1);
        setOtp(["", "", "", ""]);
      }}
      className="ml-1 text-blue-600 cursor-pointer"
    >
      <img src={editPen} alt="edit" className="w-[20px] h-[20px] inline mb-1" />
    </span>
  </b>
</h3>


          <label className="block text-sm font-medium mb-2 text-[#4E4E4C]">Enter OTP</label>

          <div className="flex justify-between mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 md:w-14 md:h-14 text-center text-lg border-[#4E4E4C80] border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-4">
            <span>Didn’t receive your OTP?</span>
            <span
              className="text-[#4298C8] font-medium cursor-pointer"
              // Resend OTP logic can be triggered separately
            >
              Resend OTP
            </span>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

         
   
        </div>
      )}
       
      
    </div>
  );
}
