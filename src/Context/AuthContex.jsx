import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginMode, setLoginMode] = useState("userid");
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.userId.trim()) newErrors.userId = "User Id is required";
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false; // ❌ not valid
    }
    localStorage.setItem("authenticated",true)
    return true; // ✅ valid
  };

  const handleToggleLogin = () => {
    setLoginMode(loginMode === "phone" ? "userid" : "phone");
  };

  return (
    <AuthContext.Provider
      value={{
        loginMode,
        setLoginMode,
        formData,
        errors,
        handleChange,
        handleSubmit,
        handleToggleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
