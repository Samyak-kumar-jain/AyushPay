export async function fetchAnchorLogo(anchorCode) {
  try {
    

    const response = await fetch(
      `https://sandbox.ayushpay.com/eci/apis/v4/anchors/${anchorCode.toUpperCase()}/get_logo/`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      }
    );

   

    if (!response.ok) {
      throw new Error(`Failed to fetch logo: ${response.status}`);
    }

    const data = await response.json();
   

    // Just return logo_url directly
    const logoUrl = data?.msg?.anchor?.logo_url || null;
    console.log("🎯 Extracted logo URL:", logoUrl);

    return logoUrl;
  } catch (error) {
    console.error("❌ Error fetching anchor logo:", error);
    throw error;
  }
}
