// api.js

export async function getOtpGeneric(payload) {
  try {
    const response = await fetch("https://sandbox.ayushpay.com/eci/apis/v2/auth/get-otp-generic/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("OTP API Response:", data);
    return data;
  } catch (error) {
    console.error("Error calling OTP API:", error);
    throw error;
  }
}
