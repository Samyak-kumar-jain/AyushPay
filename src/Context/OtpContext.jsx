import { createContext, useState, useRef } from "react";

export const OtpContext = createContext();

export const OtpProvider = ({ children }) => {
  // Two-Step Login State
  const [step, setStep] = useState(1); // 1 = phone, 2 = OTP
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputsRef = useRef([]);

  // Step 1: Get OTP
  const handleGetOtp = (e) => {
    e.preventDefault();
    setError("");
    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    console.log("Sending OTP to", phone);
    setStep(2);
  };

  // Step 2: Handle OTP input
  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Step 2: Verify OTP
 const handleVerifyOtp = (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  const enteredOtp = otp.join("");
  if (enteredOtp.length !== 4) {
    setError("Please enter a 4-digit OTP.");
    return;
  }

  // Save values to localStorage
  localStorage.setItem("otp", enteredOtp);
  localStorage.setItem("phone", phone);
  localStorage.setItem("authenticated", "true"); // ✅ set authenticated flag

  console.log("Stored in localStorage:", { phone, enteredOtp, authenticated: true });

  setSuccess("OTP Verified and stored in localStorage ✅");
  setOtp(["", "", "", ""])
  setSuccess("");
  return true;
};


  return (
    <OtpContext.Provider
      value={{
        step,
        setStep,
        phone,
        setPhone,
        otp,
        setOtp,
        error,
        success,
        inputsRef,
        handleGetOtp,
        handleOtpChange,
        handleKeyDown,
        handleVerifyOtp,
      }}
    >
      {children}
    </OtpContext.Provider>
  );
};
