export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalPath?: string;
}

export const primaryKeywordsList = [
  "Aurum Properties",
  "best real estate companies in chennai",
  "best real estate companies in tamil nadu",
  "plots for sale in chennai",
  "plots for sale in tamil nadu",
  "residential plots for sale",
  "low budget land for sale",
  "plots for sale",
  "low budget land for sale in chennai",
  "gated community villa plots for sale",
  "cmda approved plots for sale",
  "property developers Tamil Nadu"
];

export const primaryKeywordsString = primaryKeywordsList.join(", ");

export const siteSEOConfig: Record<string, PageSEO> = {
  home: {
    // 54 chars
    title: "Aurum Properties | Best Real Estate Company in Chennai",
    // 147 chars
    description: "Discover premium properties with Aurum Properties. Find trusted real estate projects, residential plots, and investment opportunities across India.",
    keywords: "Aurum Properties, best real estate companies in chennai, best real estate companies in tamil nadu, plots for sale in chennai, plots for sale in tamil nadu, residential plots for sale, low budget land for sale, plots for sale, low budget land for sale in chennai, gated community villa plots for sale, cmda approved plots for sale, property developers Tamil Nadu",
    canonicalPath: "/"
  },
  projects: {
    // 54 chars
    title: "Plots for Sale in Chennai & TN | CMDA Approved Plots",
    // 154 chars
    description: "Explore gated community villa plots for sale, CMDA approved plots & low budget land for sale in Chennai and Tamil Nadu with clear titles by Aurum Properties.",
    keywords: "plots for sale in chennai, plots for sale in tamil nadu, residential plots for sale, low budget land for sale, gated community villa plots for sale, cmda approved plots for sale, property developers Tamil Nadu",
    canonicalPath: "/projects"
  },
  about: {
    // 54 chars
    title: "About Aurum Properties | Top Property Developers in TN",
    // 154 chars
    description: "Aurum Properties is among the best real estate companies in Chennai & Tamil Nadu, specializing in residential plots for sale and gated villa communities.",
    keywords: "Aurum Properties, best real estate companies in chennai, best real estate companies in tamil nadu, property developers Tamil Nadu, residential plots for sale",
    canonicalPath: "/about"
  },
  buildAssist: {
    // 54 chars
    title: "Build Assist | Custom Villa Construction in Tamil Nadu",
    // 154 chars
    description: "Build your custom villa on residential plots for sale. Aurum Properties offers architectural design, CMDA approvals, and cost estimates across Tamil Nadu.",
    keywords: "residential plots for sale, gated community villa plots for sale, property developers Tamil Nadu, Aurum Properties, villa construction cost chennai",
    canonicalPath: "/build-assist"
  },
  blogs: {
    // 53 chars
    title: "Real Estate Blog & Land Buying Guides | Aurum Insights",
    // 154 chars
    description: "Expert guides on plots for sale in Chennai, CMDA approved plots, DTCP approvals, and land investment insights from top property developers in Tamil Nadu.",
    keywords: "plots for sale in chennai, cmda approved plots for sale, residential plots for sale, best real estate companies in chennai, property developers Tamil Nadu",
    canonicalPath: "/blogs"
  },
  contact: {
    // 53 chars
    title: "Contact Aurum Properties | Real Estate Developers TN",
    // 153 chars
    description: "Contact Aurum Properties to book VIP site visits for residential plots for sale, CMDA approved plots & low budget land for sale in Chennai and Tamil Nadu.",
    keywords: "contact Aurum Properties, plots for sale in chennai, best real estate companies in chennai, property developers Tamil Nadu",
    canonicalPath: "/contact"
  },
  privacy: {
    // 51 chars
    title: "Privacy Policy & Terms of Service | Aurum Properties",
    // 153 chars
    description: "Review legal policies, DTCP & CMDA verification terms, and buyer data protection guidelines for Aurum Properties real estate developments in Tamil Nadu.",
    keywords: "Aurum Properties privacy policy, terms of service, cmda approved plots for sale, property developers Tamil Nadu",
    canonicalPath: "/privacy"
  },
  terms: {
    // 51 chars
    title: "Terms of Service & Buyer Policy | Aurum Properties",
    // 153 chars
    description: "Review legal policies, DTCP & CMDA verification terms, and buyer data protection guidelines for Aurum Properties real estate developments in Tamil Nadu.",
    keywords: "Aurum Properties terms of service, property developers Tamil Nadu, residential plots for sale",
    canonicalPath: "/terms"
  }
};
