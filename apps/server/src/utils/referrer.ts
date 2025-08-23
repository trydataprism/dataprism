import { REFERRER_CATEGORIES } from "../constants";

export function categorizeReferrer(domain: string): string {
  if (!domain) return REFERRER_CATEGORIES.DIRECT;
  
  if (domain.includes("google") || domain.includes("bing") || domain.includes("yahoo")) {
    return REFERRER_CATEGORIES.SEARCH;
  }
  
  if (
    domain.includes("facebook") ||
    domain.includes("twitter") ||
    domain.includes("instagram") ||
    domain.includes("linkedin") ||
    domain.includes("youtube")
  ) {
    return REFERRER_CATEGORIES.SOCIAL;
  }

  return REFERRER_CATEGORIES.DIRECT;
}