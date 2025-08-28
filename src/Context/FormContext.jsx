import React, { createContext, useContext, useState, useEffect } from "react";
import { OtpContext } from "./OtpContext";
import { saveApplicationData } from "../Api/SaveData/saveUserData.js";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // ✅ Get applicationId and authToken from OtpContext
  const { applicationId: contextAppId, authToken: contextToken } = useContext(OtpContext);

  // ✅ Local state for appId and token (fall back to localStorage if context is empty)
  const [applicationId, setApplicationId] = useState(
    contextAppId || localStorage.getItem("applicationId") || null
  );
  const [authToken, setAuthToken] = useState(
    contextToken || localStorage.getItem("authToken") || null
  );

  // ✅ Sync context values when they change
  useEffect(() => {
    if (contextAppId) setApplicationId(contextAppId);
    if (contextToken) setAuthToken(contextToken);
  }, [contextAppId, contextToken]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Validation
  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName.trim()) tempErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) tempErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      tempErrors.email = "Enter a valid email";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ Handle submit with API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!applicationId || !authToken) {
      console.error("❌ Application ID or auth token not set. Verify OTP first.");
      setErrors({ form: "Please verify OTP before submitting the form." });
      return false;
    }

    if (!validate()) return false;

    setLoading(true);

    const bodyData = {
      data: [
        {
          model_name: "personal",
          field: [
            { key: "first_name", value: formData.firstName.trim() },
            { key: "middle_name", value: "" },
            { key: "last_name", value: formData.lastName.trim() },
            { key: "email", value: formData.email.trim() },
          ],
        },
        {
          model_name: "application",
          field: [{ key: "journey_type", value: "pre-approved" }],
        },
      ],
    };

    try {
      console.log("Submitting data to API:", applicationId, bodyData);

      // ✅ Pass authToken to API function
      const response = await saveApplicationData(applicationId, bodyData, authToken);

      console.log("✅ Save API Response:", response);

      if (response?.metadata?.api_status) {
        return response;
      } else {
        console.error("❌ API returned error:", response);
        setErrors({ form: response?.msg || "Failed to save data" });
        return false;
      }
    } catch (error) {
      console.error("❌ Failed to save data:", error);
      setErrors({ form: "Failed to save data. Please try again." });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        errors,
        loading,
        handleChange,
        handleSubmit,
        applicationId,
        authToken,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
