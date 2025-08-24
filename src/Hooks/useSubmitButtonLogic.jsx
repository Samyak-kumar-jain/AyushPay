// src/hooks/useSubmitButtonLogic.js
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContex.jsx";
import { OtpContext } from "../Context/OtpContext";
import { FormContext } from "../Context/FormContext";
import { PlansContext } from "../Context/PaymentContext.jsx";
import { useBuyPlan } from "../Hooks/useBuyPlan.jsx";
import { useSubscription } from "../Hooks/useSubsription.jsx";

const useSubmitButtonLogic = () => {
  const { loginMode, handleSubmit: handleAuthSubmit, formData: authFormData } =
    useContext(AuthContext);

  const { step, handleGetOtp, handleVerifyOtp, phone, otp } =
    useContext(OtpContext);

  const { handleSubmit: handleFormSubmit, formData: detailsFormData } =
    useContext(FormContext);

  const { selected, selectedPlanObj, buyPlan } = useContext(PlansContext);

  const { handleBuyPlan } = useBuyPlan();
  const {  setPlan, setIsPlanLoading } = useSubscription();

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

  const handleClick = (e) => {
    e.preventDefault();

    const path = location.pathname;

    if (path.includes("/fill-details")) {
      if (handleFormSubmit(e)) navigate("/plans");
      return;
    }

    if (location.pathname === "/plans") {
      if (selectedPlanObj) {
        buyPlan(selected);
        navigate("/plans/payment-page");
      } else {
        alert("Please select a plan before buying!");
      }
      return;
    }

    if (location.pathname === "/plans/payment-page") {
      if (handleBuyPlan(e)) {
        localStorage.setItem("purchasedPlan", JSON.stringify(selectedPlanObj));
        setIsPlanLoading(true);
        navigate("/dashboard");
        setTimeout(() => {
          setIsPlanLoading(false);
          setPlan(selectedPlanObj);
        }, 2000);
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
        navigate("/fill-details");
      }
      return;
    }
  };

  const getButtonText = () => {
    if (location.pathname.includes("/fill-details")) return "View Plans";
    if (location.pathname === "/plans") return "Buy Plan";
    if (location.pathname === "/plans/payment-page") return "Buy Now";
      if (location.pathname === "/dashboard") return "CHECK PLAN DETAILS";

    if (loginMode === "userid") return "Login";
    if (loginMode === "phone") return step === 1 ? "GET OTP" : "VERIFY OTP";
    return "Submit";
  };

  const isDisabled = () => {
    const path = location.pathname;
    if (path === "/dashboard") return false; 

    if (path.includes("/fill-details")) return !isDetailsFormValid();
    if (location.pathname.includes("/plans")) {
      return !selectedPlanObj;
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
