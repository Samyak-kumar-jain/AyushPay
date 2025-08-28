import { createContext, useState, useRef } from "react";
import { getOtpGeneric } from "../Api/Otp/getOtp.js"; 
import { verifyOtp } from "../Api/Otp/verifyOtp.js";
import { useAnchor } from "../Hooks/UseAnchor.jsx";

export const OtpContext = createContext();

export const OtpProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [txnId, setTxnId] = useState(null);
  const [applicationId, setApplicationId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const inputsRef = useRef([]);
  
  const { anchor: contextAnchor } = useAnchor(); // ✅ get anchor from context



  // ------------------- GET OTP -------------------
  const handleGetOtp = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccess("");

    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const payload = { mobile: phone, anchor: contextAnchor.toUpperCase() };
      const res = await getOtpGeneric(payload);
      console.log("OTP API Response:", res);

      if (res?.metadata?.api_status) {
        setStep(2);
        setSuccess("OTP sent successfully ✅");
        if (res?.txnId) setTxnId(res.txnId);
      } else {
        const errMsg = Array.isArray(res?.msg)
          ? res.msg.map((m) => `${m.key}: ${m.value}`).join(", ")
          : res?.msg || "Failed to send OTP";
        setError(errMsg);
      }
    } catch (err) {
      console.error("OTP API Error:", err);
      setError("Failed to send OTP. Please try again.");
    }
  };

  // ------------------- RESEND OTP -------------------
  const handleResendOtp = async () => {
    setError("");
    setSuccess("");

    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number to resend OTP.");
      return;
    }

    try {
      const payload = { mobile: phone, anchor: contextAnchor.toUpperCase() };
      const res = await getOtpGeneric(payload);
      console.log("Resend OTP API Response:", res);

      if (res?.metadata?.api_status) {
        setSuccess("OTP resent successfully ✅");
        if (res?.txnId) setTxnId(res.txnId);
        setOtp(["", "", "", ""]);
        inputsRef.current[0]?.focus();
      } else {
        const errMsg = Array.isArray(res?.msg)
          ? res.msg.map((m) => `${m.key}: ${m.value}`).join(", ")
          : res?.msg || "Failed to resend OTP";
        setError(errMsg);
      }
    } catch (err) {
      console.error("Resend OTP API Error:", err);
      setError("Failed to resend OTP. Please try again.");
    }
  };

  // ------------------- OTP INPUT HANDLERS -------------------
  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // ------------------- VERIFY OTP -------------------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setError("Please enter a 4-digit OTP.");
      return false;
    }

    try {
      const payload = {
        anchor: contextAnchor, // ✅ use context anchor here
        otp: enteredOtp,
        mobile: phone,
        txnId, // include txnId for verification
        journey_type: "pre-approved",
      };

      const res = await verifyOtp(payload);
      console.log("Verify OTP API Response:", res);

      if (res?.metadata?.api_status && res?.msg?.token) {
        setSuccess("OTP Verified successfully ✅");

        // store token
        setAuthToken(res.msg.token);
        localStorage.setItem("authToken", res.msg.token);

        // store applicationId
        const appId = res?.msg?.items?.[0]?.id || null;
        setApplicationId(appId);
        if (appId) localStorage.setItem("applicationId", appId);

        setOtp(["", "", "", ""]);
        return true;
      } else {
        const errMsg = Array.isArray(res?.msg)
          ? res.msg.map((m) => `${m.key}: ${m.value}`).join(", ")
          : res?.msg || "Invalid OTP. Please try again.";
        setError(errMsg);
        return false;
      }
    } catch (err) {
      console.error("Verify OTP API Error:", err);
      setError("Failed to verify OTP. Please try again.");
      return false;
    }
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
        txnId,
        handleGetOtp,
        handleResendOtp,
        handleOtpChange,
        handleKeyDown,
        handleVerifyOtp,
        applicationId,
        authToken,
      }}
    >
      {children}
    </OtpContext.Provider>
  );
};
