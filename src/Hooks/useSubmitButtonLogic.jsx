// src/hooks/useSubmitButtonLogic.js
import { useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContex.jsx";
import { OtpContext } from "../Context/OtpContext";
import { FormContext } from "../Context/FormContext";
import { SubscriptionContext } from "../Context/SubscriptionContext.jsx";

const useSubmitButtonLogic = () => {
  const { loginMode, handleSubmit: handleAuthSubmit, formData: authFormData } =
    useContext(AuthContext);

  const { anchor } = useParams();
  const { step, handleGetOtp, handleVerifyOtp, phone, otp } =
    useContext(OtpContext);
  const { handleSubmit: handleFormSubmit, formData: detailsFormData } =
    useContext(FormContext);

  const { subscriptions, buyPlan, selectedPlan, purchasedPlan } =
    useContext(SubscriptionContext);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  /** ------------------ Validators ------------------ */
 const isDetailsFormValid = () =>
   detailsFormData &&
  ["firstName", "lastName"].every(
    (key) =>  detailsFormData[key] !== undefined &&  detailsFormData[key] !== null &&  detailsFormData[key].toString().trim() !== ""
  );

  const isAuthFormValid = () =>
    Boolean(authFormData.userId?.trim() && authFormData.password?.trim());

  const isPhoneValid = () => Boolean(phone?.trim());
  const isOtpValid = () => Array.isArray(otp) && otp.join("").length === 4;

  /** ------------------ Handlers ------------------ */
  const handleClick = async (e) => {
    e.preventDefault();

    // Prevent action on dashboard
    if (path === "/dashboard") return;

    // 1️⃣ Fill Details → Plans
    if (path.includes(`/pre_approved_share_details/${anchor}/pre-approved`)) {
      const success = handleFormSubmit(e);
      if (success) navigate(`/${anchor}/pre_approved_buy_subscription`);
      return;
    }

    // 2️⃣ Buy Subscription → Dashboard (only on success)
  if (path === `/${anchor}/pre_approved_buy_subscription`) {
  if (!selectedPlan) {
    alert("Please select a plan before buying!");
    return;
  }

  const paymentResult = await buyPlan(selectedPlan);

  if (paymentResult?.status === "success") {
    navigate("/dashboard");
  } else if (paymentResult?.status === "cancel") {
    // 👉 Do nothing or show message
    navigate(`/${anchor}/pre_approved_buy_subscription`);
  } else {
    alert("Payment failed. Please try again.");
  }

  return;
}


    // 3️⃣ Login with UserID
    if (loginMode === "userid") {
      const success = handleAuthSubmit(e);
      if (success) navigate("/fill-details");
      return;
    }

    // 4️⃣ Login with Phone
    if (loginMode === "phone") {
      if (step === 1) {
        handleGetOtp(e);
      } else if (step === 2) {
        const verified = handleVerifyOtp(e);
        if (verified) navigate(`/pre_approved_share_details/${anchor}/pre-approved`);
      }
      return;
    }
  };

  /** ------------------ Button Label ------------------ */
  const getButtonText = () => {
    if (path.includes(`/pre_approved_share_details/${anchor}/pre-approved`))
      return "View Plans";
    if (path === `/${anchor}/pre_approved_buy_subscription`) return "Buy Plan";
    if (path === "/dashboard") return "CHECK PLAN DETAILS";
    if (loginMode === "userid") return "Login";
    if (loginMode === "phone") return step === 1 ? "GET OTP" : "VERIFY OTP";
    return "Submit";
  };

  /** ------------------ Disable Button Logic ------------------ */
  const isDisabled = () => {
    if (path === "/dashboard") return false;
    if (path.includes(`/pre_approved_share_details/${anchor}/pre-approved`))
      return !isDetailsFormValid();
    if (path === `/${anchor}/pre_approved_buy_subscription`)
      return !selectedPlan;
    if (loginMode === "userid") return !isAuthFormValid();
    if (loginMode === "phone")
      return step === 1 ? !isPhoneValid() : !isOtpValid();
    return false;
  };

  return { handleClick, getButtonText, isDisabled };
};

export default useSubmitButtonLogic;
