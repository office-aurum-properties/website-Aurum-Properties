export interface Project {
  id: string;
  name: string;
  location: string;
  city: string;
  priceNumeric: number; // in Lakhs, e.g. 15, 28, 45, etc.
  priceStr: string; // e.g. "From ₹15L"
  sqft: number; // e.g. 1200
  status: 'Ready to Construct' | 'Under Development' | 'Upcoming';
  dtcpApproved: boolean;
  reraRegistered: boolean;
  reraNo?: string;
  description: string;
  aboutText?: string;
  plotsCount: number;
  availablePlots: number;
  imageGradientFrom: string; // e.g. "from-emerald-800"
  imageGradientTo: string; // e.g. "to-teal-950"
  imageUrl?: string; // Optional actual plot image
  amenities: string[];
  mapUrl?: string;
  mapEmbedUrl?: string;
  coordinates?: { lat: number; lng: number };
  unitSize?: string;
  totalArea?: string;
  pricePerCent?: string;
  pricePerSqft?: string;
  brochureUrl?: string;
  isNegotiable?: boolean;
  partitionDetails?: {
    totalPlots: number;
    centsPerPlot?: number;
    pricePerCentStr?: string;
    ratePerSqftStr?: string;
    isNegotiable: boolean;
    plots?: {
      id: string;
      name: string;
      cents?: number;
      sqft: number;
      facing?: string;
      ratePerSqft?: number;
      priceStr: string;
      status: 'Available' | 'Reserved' | 'Sold';
    }[];
  };
  snapshot?: ProjectSnapshot;
  bankLoanAvailable?: boolean;
  bankPartners?: string[];
  highlights?: string[];
  connectivityHighlights?: { name: string; distance: string; time: string; category?: string }[];
  roadDetails?: string[];
  layoutFeatures?: string[];
}

export interface ProjectSnapshot {
  projectName: string;
  marketer: string;
  location: string;
  totalFarm: string;
  unitSize: string;
  plantation: string;
  concept: string;
  horizon: string;
  market: string;
  priceExact: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Investment Tips' | 'Tamil Nadu Real Estate News' | 'Buying Guides' | 'Legal Matters';
  author: string;
  authorTitle: string;
  authorAvatar: string;
  date: string;
  readingTime: string;
  excerpt: string;
  paragraphs: string[];
  imageGradientFrom: string;
  imageGradientTo: string;
  imageUrl?: string; // Optional actual article image
  isFeatured?: boolean;
}

export interface Plot {
  id: string; // e.g. "P1"
  size: number; // e.g. 1200
  status: 'Available' | 'Sold';
  price: number; // e.g. 15 Lakhs
}
