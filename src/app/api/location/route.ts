import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "8.8.8.8"; // fallback

    // === Fetch location info from IPAPI ===

    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();

    return NextResponse.json({
      country: data.country_name,
      country_code: data.country,
      city: data.city,
      ip,
    });
  } catch (error) {
    console.error("Error fetching location:", error);
    return NextResponse.json(
      { country: "Unknown", error: "Location fetch failed" },
      { status: 500 }
    );
  }
}
