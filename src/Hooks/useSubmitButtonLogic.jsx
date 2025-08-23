// src/hooks/useSubmitButtonLogic.js
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContex.jsx";
import { OtpContext } from "../Context/OtpContext";
import { FormContext } from "../Context/FormContext";
import { PlansContext } from "../Context/PaymentContext.jsx";

const useSubmitButtonLogic = () => {
  const { loginMode, handleSubmit: handleAuthSubmit, formData: authFormData } =
    useContext(AuthContext);

  const { step, handleGetOtp, handleVerifyOtp, phone, otp } =
    useContext(OtpContext);

  const { handleSubmit: handleFormSubmit, formData: detailsFormData } =
    useContext(FormContext);

const { selected, selectedPlanObj, buyPlan } = useContext(PlansContext);

  const navigate = useNavigate();
  const location = useLocation();


  //  * Validation Helpers
  
  const isDetailsFormValid = () =>
    detailsFormData &&
    Object.values(detailsFormData).every(
      (value) =>
        value !== undefined &&
        value !== null &&
        value.toString().trim() !== ""
    );

  const isAuthFormValid = () =>
    authFormData.userId?.trim() && authFormData.password?.trim();

  const isPhoneValid = () => phone && phone.trim() !== "";
  const isOtpValid = () => otp.join("").length === 4;

 
  //  * ✅ Handle Click Logic
  
  const handleClick = (e) => {
    e.preventDefault();

    const path = location.pathname;

    // Fill Details Submit
    if (path.includes("/fill-details")) {
      if (handleFormSubmit(e)) navigate("/plans");
      return;
    }

    // Plans Page -> Buy Plan
    // ✅ Case 2: Plans Page (Buy Plan)
if (location.pathname.includes("/plans")) {
  if (selectedPlanObj) {
    console.log(selectedPlanObj)
    buyPlan(selected);   // pass plan name string
    navigate("/plans/payment-page");
  } else {
    alert("Please select a plan before buying!");
  }
  return;
}


    // Login with UserId
    if (loginMode === "userid") {
      if (handleAuthSubmit(e)) navigate("/fill-details");
      return;
    }

    // Login with Phone
    if (loginMode === "phone") {
      if (step === 1) {
        handleGetOtp(e);
      } else if (step === 2 && handleVerifyOtp(e)) {
        navigate("/fill-details");
      }
      return;
    }
  };

  /** -------------------------------
   * ✅ Button Text Logic
   * ------------------------------- */
  const getButtonText = () => {
    if (location.pathname.includes("/fill-details")) return "View Plans";
    if (location.pathname.includes("/plans")) return "Buy Plan";

    if (loginMode === "userid") return "Login";
    if (loginMode === "phone") return step === 1 ? "GET OTP" : "VERIFY OTP";

    return "Submit";
  };

  /** -------------------------------
   * ✅ Disable Button Logic
   * ------------------------------- */
  const isDisabled = () => {
    const path = location.pathname;

    if (path.includes("/fill-details")) return !isDetailsFormValid();
if (location.pathname.includes("/plans")) {
  return !selectedPlanObj; // ✅ Disabled only if no plan selected
}
    if (loginMode === "userid") return !isAuthFormValid();
    if (loginMode === "phone") {
      return step === 1 ? !isPhoneValid() : !isOtpValid();
    }

    return false;
  };

  return { handleClick, getButtonText, isDisabled };
};

export default useSubmitButtonLogic;
