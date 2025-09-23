import { ANALYTICS_CONFIG } from "../config/analytics";
import type { GeolocationData } from "../types";

export async function getLocationFromIP(ip: string): Promise<Partial<GeolocationData> | null> {
  if (
    ip === "unknown" ||
    ip.includes("127.0.0.1") ||
    ip.includes("localhost")
  ) {
    return null;
  }

  try {
    const response = await fetch(`${ANALYTICS_CONFIG.GEOLOCATION_API_URL}/${ip}/json/`);
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data.country_code && data.country_code !== "XX") {
      return {
        country_code: data.country_code,
        region: data.region,
        city: data.city,
      };
    }

    return null;
  } catch (error) {
    console.log("Geolocation API error:", error);
    return null;
  }
}

export function extractClientIP(headers: Record<string, string | undefined>): string {
  return (
    headers["x-forwarded-for"]?.split(",")[0] ||
    headers["x-real-ip"] ||
    headers["cf-connecting-ip"] ||
    "unknown"
  );
}