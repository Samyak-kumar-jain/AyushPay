// utils/api.js
export async function saveApplicationData(uuid, bodyData, authToken) {
  if (!authToken) {
    throw new Error("Auth token is required to call this API");
  }

  const response = await fetch(
    `https://sandbox.ayushpay.com/eci/apis/v2/applications/${uuid}/save/data/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`, // ✅ set token here
      },
      body: JSON.stringify(bodyData),
    }
  );

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  return result;
}
