import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContex.jsx";
import TwoStepForm from "./PhoneLogin.jsx";
import Disclaimer from "../PhoneDisclaimer.jsx";

export default function LoginForm() {
  const {
    loginMode,
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleToggleLogin,
  } = useContext(AuthContext);


  return (
    <>
      {loginMode === "userid" ? (
        <div className="flex items-center justify-center bg-gray-100 rounded-[12px]">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-[12px] shadow-md w-[350px]"
          >
            <h2 className="text-base font-semibold mb-6">
              Please enter User Id <br /> and Password to proceed
            </h2>

            {/* User Id */}
            <div className="mb-5 relative">
              <label
                htmlFor="userId"
                className="absolute -top-2 left-3 text-[10px] bg-white px-1 text-gray-600"
              >
                User Id<span>*</span>
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="Enter User Id"
                className="w-full rounded-2xl border border-[#4E4E4C80] px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none"
              />
              {errors.userId && (
                <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-[10px]"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full rounded-2xl border border-[#4E4E4C80] px-4 py-3 text-gray-700 placeholder-gray-500 outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Divider */}
            <div className="flex items-center my-4 px-16">
              <div className="flex-2 border-t border-gray-300"></div>
              <span className="px-2 text-gray-500 text-sm">Or</span>
              <div className="flex-2 border-t border-gray-300"></div>
            </div>

            {/* Toggle */}
            <p
              className="text-center font-bold mb-4 text-sm text-blue-600 cursor-pointer underline hover:underline"
              onClick={handleToggleLogin}
            >
              Login using Mobile No. and OTP
            </p>

            {/* Footer */}
              <Disclaimer/>
          </form>
        </div>
      ) : (
        <TwoStepForm />
      )}
    </>
  );
}
