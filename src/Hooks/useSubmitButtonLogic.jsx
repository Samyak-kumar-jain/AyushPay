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

  const { subscriptions, buyPlan, purchasedPlan } =
    useContext(SubscriptionContext);

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleClick = async (e) => {
    e.preventDefault();
    const path = location.pathname;

    if (path === "/dashboard") return;

    if (path.includes(`/pre_approved_share_details/${anchor}/pre-approved`)) {
      if (handleFormSubmit(e)) navigate(`/${anchor}/pre_approved_buy_subscription`);
      return;
    }

    // ✅ Buy subscription only navigates on successful payment
    if (path === `/${anchor}/pre_approved_buy_subscription`) {
      const selectedPlan = subscriptions[0]; // pick based on UI
      if (!selectedPlan) {
        alert("Please select a plan before buying!");
        return;
      }

      const paymentSuccess = await buyPlan(selectedPlan); // await payment
      if (paymentSuccess) {
        navigate("/dashboard"); // only navigate on success
      }
      return;
    }

    if (loginMode === "userid") {
      if (handleAuthSubmit(e)) navigate("/fill-details");
      return;
    }

    if (loginMode === "phone") {
      if (step === 1) {
        handleGetOtp(e);
      } else if (step === 2 && handleVerifyOtp(e)) {
        navigate(`/pre_approved_share_details/${anchor}/pre-approved`);
      }
      return;
    }
  };

  const getButtonText = () => {
    if (location.pathname.includes(`/pre_approved_share_details/${anchor}/pre-approved`)) return "View Plans";
    if (location.pathname === `/${anchor}/pre_approved_buy_subscription`) return "Buy Plan";
    if (location.pathname === "/dashboard") return "CHECK PLAN DETAILS";
    if (loginMode === "userid") return "Login";
    if (loginMode === "phone") return step === 1 ? "GET OTP" : "VERIFY OTP";
    return "Submit";
  };

  const isDisabled = () => {
    const path = location.pathname;
    if (path === "/dashboard") return false; 
    if (path.includes(`/pre_approved_share_details/${anchor}/pre-approved`)) return !isDetailsFormValid();
    if (location.pathname.includes(`/${anchor}/pre_approved_buy_subscription`)) return subscriptions.length === 0;
    if (loginMode === "userid") return !isAuthFormValid();
    if (loginMode === "phone") return step === 1 ? !isPhoneValid() : !isOtpValid();
    return false;
  };

  return { handleClick, getButtonText, isDisabled };
};

export default useSubmitButtonLogic;
