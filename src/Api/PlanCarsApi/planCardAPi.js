
export async function fetchSubscriptions(applicationId, token) {
  try {
    const response = await fetch(
      `https://sandbox.ayushpay.com/v3/apis/webapi/v4/applications/${applicationId}/subscriptions/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
}
