import React, { useContext } from "react";
import { FormContext } from "../../Context/FormContext";

const FormComponent = () => {
  const { formData, errors, handleChange, handleSubmit } = useContext(FormContext);

  return (
    <div className="w-[350px] px-[23px] py-[15px] bg-white rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-[16px]">
        {/* First Name */}
        <div className="relative">
          <label
            htmlFor="firstName"
            className="absolute -top-2 left-3 text-[13px] bg-white px-1 text-gray-600"
          >
            First Name<span>*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter Your First Name"
            className={`w-full rounded-[12px] border px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none ${
              errors.firstName ? "border-red-500" : "border-[#4E4E4C80]"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="relative">
          <label
            htmlFor="lastName"
            className="absolute -top-2 left-3 text-[13px] bg-white px-1 text-gray-600"
          >
            Last Name<span>*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Your Last Name"
            className={`w-full rounded-[12px] border px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none ${
              errors.lastName ? "border-red-500" : "border-[#4E4E4C80]"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <label
            htmlFor="email"
            className="absolute -top-2 left-3 text-[13px] bg-white px-1 text-gray-600"
          >
            Email Id
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email Id"
            className={`w-full rounded-[12px] border px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none ${
              errors.email ? "border-red-500" : "border-[#4E4E4C80]"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
