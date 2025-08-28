export async function verifyOtp({ anchor, otp, mobile, journey_type }) {
  try {
    const response = await fetch(
      "https://sandbox.ayushpay.com/eci/apis/v4/auth/verify-otp/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          anchor,
          otp,
          mobile,
          journey_type,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to verify OTP: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}
