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
    const order = data?.msg?.response_body;

    if (!order?.id) {
      return { status: "failed", error: "Failed to create order" };
    }

    // 2️⃣ Razorpay payment flow
    const result = await new Promise((resolve) => {
      const options = {
        key: "rzp_test_Me092IVDqsmT2R",
        amount: order.amount,
        currency: order.currency,
        name: payload.name || "Your App",
        order_id: order.id,
        handler: function (res) {
          console.log("Payment Success:", res);
          resolve({ status: "success", data: res });
        },

        
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
            resolve({ status: "cancel" });
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

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        resolve({ status: "failed", error: response.error });
      });
    });

    return result; // { status: "success" | "cancel" | "failed", data?, error? }

  } catch (error) {
    console.error("Payment initiation failed:", error);
    return { status: "failed", error: error.message };
  }
};
