export const initiatePaymentAPI = async (payload, authToken) => {
  try {
    // 1️⃣ Create Razorpay order on backend
    const response = await fetch(
      "https://sandbox.ayushpay.com/finverv/internal/v2/pg_razorpay_order_create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    // Extract the order from the nested response
    const order = data?.msg?.response_body;

    if (!order?.id) {
      return { success: false, error: "Failed to create order" };
    }

    // 2️⃣ Razorpay payment flow
    const result = await new Promise((resolve) => {
      const options = {
        key: "rzp_test_Me092IVDqsmT2R",
        amount: order.amount, // amount in paise
        currency: order.currency,
        name: payload.name || "Your App",
        description: payload.amount,
        order_id: order.id,
        handler: function (res) {
          console.log("Payment Success:", res);
          resolve({ success: true, data: res });
        },
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
            resolve({ success: false, error: "Payment cancelled" });
          },
        },
        prefill: {
          email: data?.msg?.email || "customer@example.com",
          contact: data?.msg?.contact || "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    });

    return result; // { success: true/false, data/error }

  } catch (error) {
    console.error("Payment initiation failed:", error);
    return { success: false, error: error.message };
  }
};
