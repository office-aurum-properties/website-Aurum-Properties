import { Project, BlogPost, Plot } from './types';

// ESM Image Imports for Vite production bundling
import goldenAcresImg from './assets/images/golden_acres_farmland_1789360181883.webp';
import villageLandParcelImg from './assets/images/village_land_parcel_1788782273132.webp';
import guduvancheryImg from './assets/images/guduvanchery_plots_1782481597171.webp';
import coimbatoreImg from './assets/images/coimbatore_plots_1782481615987.webp';
import hosurFarmsImg from './assets/images/hosur_farms_1782481642308.webp';
import maduraiImg from './assets/images/madurai_plots_1782481696298.webp';
import thanjavurImg from './assets/images/thanjavur_lakeview_1782481663329.webp';
import gatedEntranceImg from './assets/images/gated_entrance_1782481578176.webp';
import familyNewHomeImg from './assets/images/family_new_home_1782481713774.webp';
import sreNagarImg from './assets/images/sre_nagar_erode_1791374287268.jpg';

export const projectsData: Project[] = [
  {
    id: "sre-nagar-extension-erode",
    name: "Sre Nagar Extension – Muthampalayam, Erode",
    location: "Muthampalayam, Erode",
    city: "Erode",
    priceNumeric: 33,
    priceStr: "From ₹2,999 / Sq.Ft",
    sqft: 1107,
    unitSize: "1,107 – 2,586 Sq.Ft",
    totalArea: "Prime Gated Layout • 19 Villa Plots",
    status: "Ready to Construct",
    dtcpApproved: true,
    reraRegistered: true,
    reraNo: "TN/10/Layout/2024",
    bankLoanAvailable: true,
    brochureUrl: "/Aurum-Sre-Nagar-Extension-Brochure.pdf",
    pricePerSqft: "South: ₹2,999/Sq.Ft • North: ₹3,299/Sq.Ft",
    bankPartners: [
      "State Bank of India (SBI)",
      "HDFC Bank",
      "ICICI Bank",
      "Canara Bank",
      "Axis Bank",
      "LIC Housing Finance"
    ],
    description: "DTCP Approved & RERA Registered gated villa layout in Muthampalayam, near Maharaja Multicomplex, Erode. Exactly 19 demarcated plots: 7 North-facing plots (Plot 05–11) at Rs. 3,299/Sq.Ft and 12 South-facing plots (Plot 01–04 & 12–19) at Rs. 2,999/Sq.Ft. Features 40ft & 30ft blacktop tar roads, sweet potable water, and 80%-90% bank loan sanction from SBI & HDFC Bank.",
    aboutText: "SRE NAGAR EXTENSION is an esteemed DTCP-approved and RERA-registered gated residential layout situated in Muthampalayam, Near Maharaja Multicomplex, Erode - 638009. Thoughtfully developed for premium family living and strong capital appreciation, this exclusive enclave contains exactly 19 demarcated villa plots ranging from 1,107 Sq.Ft to 2,586 Sq.Ft, priced strictly on square-foot rates: 7 North-facing plots (Plot 05 to 11) at Rs. 3,299/Sq.Ft and 12 South-facing plots (Plot 01 to 04 & Plot 12 to 19) at Rs. 2,999/Sq.Ft. Interconnected by heavy-load 40-foot main boulevard and 30-foot cross roadways, the project includes abundant sweet potable groundwater, solar LED streetlights, underground drainage, and pre-approved 80%-90% bank loan sanctions from leading banking partners including SBI and HDFC Bank.",
    plotsCount: 19,
    availablePlots: 19,
    imageGradientFrom: "from-emerald-800",
    imageGradientTo: "to-teal-950",
    imageUrl: sreNagarImg,
    isNegotiable: true,
    highlights: [
      "DTCP Approved Layout & RERA Registered (TN/10/Layout/2024)",
      "Exactly 19 Exclusive Demarcated Villa Plots (All 19 Available for Sale)",
      "7 North Facing Plots (Plot 05 to Plot 11) @ Rs. 3,299 / Sq.Ft",
      "12 South Facing Plots (Plot 01–04 & Plot 12–19) @ Rs. 2,999 / Sq.Ft",
      "Up to 80% – 90% Bank Loan Approved by SBI & HDFC Bank",
      "Prime Muthampalayam Location: Near Maharaja Multicomplex (<5 KM to All Hubs)",
      "Heavy-Duty 40 Feet Main Boulevard & 30 Feet Cross Blacktop Roads",
      "Sweet Natural Potable Groundwater & Individual Pipeline Points",
      "Gated Community with Grand Arch Entrance & 24/7 Security",
      "100% Clear Titles, Encumbrance-Free & Instant Patta Transfer"
    ],
    connectivityHighlights: [
      { name: "Maharaja Theatre & STEM Park", distance: "1.2 KM", time: "3 Mins", category: "Entertainment" },
      { name: "Erode Railway Junction", distance: "4.8 KM", time: "10 Mins", category: "Transit" },
      { name: "Erode Central Bus Stand", distance: "4.5 KM", time: "9 Mins", category: "Transit" },
      { name: "Lotus Hospital Multi-Speciality", distance: "3.5 KM", time: "7 Mins", category: "Healthcare" },
      { name: "BVB School (Bharatiya Vidya Bhavan)", distance: "2.8 KM", time: "5 Mins", category: "Education" },
      { name: "Indian Public School (TIPS)", distance: "3.2 KM", time: "6 Mins", category: "Education" },
      { name: "Erode Arts & Science College", distance: "4.2 KM", time: "8 Mins", category: "Education" },
      { name: "Thindal Murugan Temple & Suburb", distance: "3.0 KM", time: "6 Mins", category: "Heritage" },
      { name: "Major Daily Markets & Banks (SBI, HDFC)", distance: "800 M", time: "2 Mins", category: "Daily Essentials" }
    ],
    roadDetails: [
      "40 Feet Wide Main Grand Entrance Boulevard",
      "30 Feet Wide Internal Cross Tar Roads",
      "Heavy-load Asphalt Blacktop with Concrete Kerbing",
      "Wide Turning Radius for Hassle-Free Vehicle Navigation",
      "Neat Paver-Lined Pedestrian Walkways"
    ],
    amenities: [
      "DTCP & RERA Approved Layout",
      "80%-90% Bank Loan Approved by SBI & HDFC",
      "40ft & 30ft Blacktop Tar Roads",
      "Grand Gated Entrance Arch",
      "Sweet Potable Groundwater",
      "Solar Street Lighting System",
      "Underground Storm Drainage Network",
      "Children's Play Park & Green Avenues",
      "24/7 Security Post & CCTV Surveillance",
      "Clear Title & Instant Patta Transfer"
    ],
    partitionDetails: {
      totalPlots: 19,
      ratePerSqftStr: "Rs. 2,999 – Rs. 3,299 / Sq.Ft",
      isNegotiable: true,
      plots: [
        { id: "Plot 01", name: "Plot 01 (South Facing • 40ft Main Road)", sqft: 1534, facing: "South Facing", ratePerSqft: 2999, priceStr: "₹46.00 Lakhs", status: "Available" },
        { id: "Plot 02", name: "Plot 02 (South Facing • 40ft Main Road)", sqft: 1655, facing: "South Facing", ratePerSqft: 2999, priceStr: "₹49.63 Lakhs", status: "Available" },
        { id: "Plot 03", name: "Plot 03 (South Facing • 40ft Main Road)", sqft: 1770, facing: "South Facing", ratePerSqft: 2999, priceStr: "₹53.08 Lakhs", status: "Available" },
        { id: "Plot 04", name: "Plot 04 (South Facing • 30ft Avenue)", sqft: 1842, facing: "South Facing", ratePerSqft: 2999, priceStr: "₹55.24 Lakhs", status: "Available" },
        { id: "Plot 05", name: "Plot 05 (North Facing • 30ft Avenue)", sqft: 2586, facing: "North Facing", ratePerSqft: 3299, priceStr: "₹85.31 Lakhs", status: "Available" },
        { id: "Plot 06", name: "Plot 06 (North Facing • Park Facing)", sqft: 1587, facing: "North Facing", ratePerSqft: 3299, priceStr: "₹52.36 Lakhs", status: "Available" },
        { id: "Plot 07", name: "Plot 07 (North Facing • Corner Avenue)", sqft: 1572, facing: "North Facing", ratePerSqft: 3299, priceStr: "₹51.86 Lakhs", status: "Available" },
        { id: "Plot 08", name: "Plot 08 (North Facing • 30ft Avenue)", sqft: 1557, facing: "North Facing", ratePerSqft: 3299, priceStr: "₹51.37 Lakhs", status: "Available" },
        { id: "Plot 09", name: "Plot 09 (North Facing • 30ft Avenue)", sqft: 1543, facing: "North Facing", ratePerSqft: 3299, priceStr: "₹50.90 Lakhs", status: "Available" },
        { id: "Plot 10", name: "Plot 10 (North Facing • 30ft Avenue)", sqft: 1528, facing: "North Facing", ratePerSqft: 3299, priceStr: "₹50.41 Lakhs", status: "Available" },
        { id: "Plot 11", name: "Plot 11 (North Facing • 30ft Avenue)", sqft: 1530, facing: "North Facing", ratePerSqft: 3299, priceStr: "₹50.47 Lakhs", status: "Available" },
        { id: "Plot 12", name: "Plot 12 (South Facing • 30ft Avenue)", sqft: 1545, facing: "South Facing", ratePerSqft: 2999, priceStr: "₹46.33 Lakhs", status: "Available" },
        { id: "Plot 13", name: "Plot 13 (South Facing • 30ft Avenue)", sqft: 1494, facing: "South Facing", ratePerSqft: 2999, priceStr: "₹44.81 Lakhs", status: "Available" },
        { id: "Plot 14", name: "Plot 14 (South Facing • 30ft Avenue)", sqft: 1479, facing: "South Facing", ratePerSqft: 2999, priceStr: "₹44.36 Lakhs", status: "Available" },
        { id: "Plot 15", name: "Plot 15 (South Facing • 30ft Avenue)", sqft: 1464, facing: "South Facing", ratePerSqft: 2999, priceStr: "₹43.91 Lakhs", status: "Available" },
        { id: "Plot 16", name: "Plot 16 (South Facing • 40ft Main Road)", sqft: 1455, facing: "South Facing", ratePerSqft: 2999, priceStr: "₹43.64 Lakhs", status: "Available" },
        { id: "Plot 17", name: "Plot 17 (South Facing • 40ft Main Road)", sqft: 1445, facing: "South Facing", ratePerSqft: 2999, priceStr: "₹43.34 Lakhs", status: "Available" },
        { id: "Plot 18", name: "Plot 18 (South Facing • Prime Villa Plot)", sqft: 1435, facing: "South Facing", ratePerSqft: 2999, priceStr: "₹43.04 Lakhs", status: "Available" },
        { id: "Plot 19", name: "Plot 19 (South Facing • Corner Villa Plot)", sqft: 1107, facing: "South Facing", ratePerSqft: 2999, priceStr: "₹33.20 Lakhs", status: "Available" }
      ]
    },
    mapUrl: "https://maps.google.com/maps?q=11.3142%2C77.7085&z=17&hl=en",
    mapEmbedUrl: "https://maps.google.com/maps?q=11.3142,77.7085&hl=en&z=16&output=embed",
    coordinates: { lat: 11.3142, lng: 77.7085 },
    snapshot: {
      projectName: "Sre Nagar Extension",
      marketer: "Aurum Properties",
      location: "Muthampalayam, Near Maharaja Multicomplex, Erode",
      totalFarm: "Prime Gated Layout (19 Plots)",
      unitSize: "1,107 – 2,586 Sq.Ft",
      plantation: "Avenue Tree Plantations & Parks",
      concept: "DTCP & RERA Gated Villa Community",
      horizon: "Ready to Construct / Immediate Registration",
      market: "Erode City, NRI & Plotted Villa Buyers",
      priceExact: "From ₹2,999 / Sq.Ft (From ₹33.20L)"
    }
  },
  {
    id: "avinashi",
    name: "Avinashi",
    location: "Avinashi, Tiruppur / Coimbatore Corridor",
    city: "Avinashi",
    priceNumeric: 10,
    priceStr: "₹10 Lakhs / Cent (Negotiable)",
    sqft: 51403,
    unitSize: "23.5 Cents / Plot (or Full 1.18 Acres)",
    totalArea: "1.18 Acres (118 Cents)",
    status: "Ready to Construct",
    dtcpApproved: false,
    reraRegistered: false,
    description: "Prime 1.18-Acre contiguous land parcel in Avinashi, with option to split into 5 individual plots of 23.5 Cents each. High-potential investment at ₹10 Lakhs per Cent (Negotiable).",
    aboutText: "Avinashi is an exceptional 1.18-Acre (118 Cents) prime property strategically situated in Avinashi, the vibrant commercial and industrial nexus between Coimbatore and Tiruppur along NH 544. Offering immediate connectivity to national highways, high-load access roads, and abundant sweet groundwater, this property is ideally suited for plotted villa communities, agro-farmsteads, commercial warehouses, or high-yield long-term capital appreciation. The property is available as a full 1.18-Acre contiguous parcel or can be subdivided into 5 well-proportioned independent plots of 23.5 Cents each at ₹10 Lakhs per cent (negotiable), backed by 100% clear titles, individual patta, and direct registry-ready documentation.",
    plotsCount: 5,
    availablePlots: 5,
    imageGradientFrom: "from-amber-900",
    imageGradientTo: "to-emerald-950",
    imageUrl: villageLandParcelImg,
    pricePerCent: "₹10,00,000 / Cent (Negotiable)",
    isNegotiable: true,
    partitionDetails: {
      totalPlots: 5,
      centsPerPlot: 23.5,
      pricePerCentStr: "₹10 Lakhs / Cent (Negotiable)",
      isNegotiable: true,
      plots: [
        { id: "Plot 1", name: "Plot 1 (North-East Corner)", cents: 23.5, sqft: 10237, priceStr: "₹2.35 Cr (Negotiable)", status: "Available" },
        { id: "Plot 2", name: "Plot 2 (Main Road Frontage)", cents: 23.5, sqft: 10237, priceStr: "₹2.35 Cr (Negotiable)", status: "Available" },
        { id: "Plot 3", name: "Plot 3 (Central Avenue)", cents: 23.5, sqft: 10237, priceStr: "₹2.35 Cr (Negotiable)", status: "Available" },
        { id: "Plot 4", name: "Plot 4 (Prime East Facing)", cents: 23.5, sqft: 10237, priceStr: "₹2.35 Cr (Negotiable)", status: "Available" },
        { id: "Plot 5", name: "Plot 5 (West Vista Plot)", cents: 23.5, sqft: 10237, priceStr: "₹2.35 Cr (Negotiable)", status: "Available" }
      ]
    },
    amenities: [
      "1.18 Acres Contiguous Land Parcel",
      "Split Option: 5 Plots of 23.5 Cents Each",
      "₹10 Lakhs / Cent (Negotiable Rate)",
      "Wide Heavy-Vehicle Road Frontage",
      "Clear Title & Individual Patta Transfer",
      "Sweet Natural Groundwater & Borewell",
      "3-Phase Industrial & Agro Electricity Line",
      "Immediate Access to NH 544 Corridor",
      "Ideal for Plotted Villa, Warehouse or Estate"
    ],
    mapUrl: "https://maps.google.com/maps?q=11.1920433%2C77.2766952&z=17&hl=en",
    mapEmbedUrl: "https://maps.google.com/maps?q=11.1920433,77.2766952&hl=en&z=16&output=embed",
    coordinates: { lat: 11.1920433, lng: 77.2766952 },
    snapshot: {
      projectName: "Avinashi",
      marketer: "Aurum Properties",
      location: "Avinashi, Tiruppur / Coimbatore Corridor",
      totalFarm: "1.18 Acres (118 Cents)",
      unitSize: "23.5 Cents / Plot (5 Plots)",
      plantation: "Plotted / Commercial / Agro-Villa Feasible",
      concept: "5-Plot Partition or Full 1.18 Acre Estate",
      horizon: "Ready for Immediate Registration",
      market: "Investors, NRI, Industrial & Plotted Buyers",
      priceExact: "₹10L / Cent (Negotiable)"
    }
  },
  {
    id: "golden-acres-sivagiri-tenkasi",
    name: "Golden Acres Premium Managed Farmland Community – Sivagiri, Tenkasi",
    location: "Sivagiri, Tenkasi",
    city: "Tenkasi",
    priceNumeric: 25,
    priceStr: "₹25,00,000",
    sqft: 10890,
    unitSize: "25 Cents",
    totalArea: "140 Acres",
    status: "Ready to Construct",
    dtcpApproved: false,
    reraRegistered: false,
    description: "Nestled against the scenic foothills of the Western Ghats, Golden Acres is an exclusive 140-Acre managed farmland sanctuary in Sivagiri, Tenkasi with 25-Cent units, sandalwood plantations, organic fruit groves, and leisure retreat amenities.",
    aboutText: "Golden Acres is an exclusive managed agro-farmland community situated in the picturesque foothills of Sivagiri, Tenkasi. Spanning 140 fertile agricultural acres with sweeping mountain vistas, this property offers thoughtfully planned 25-Cent farmland units planted with high-value Sandalwood and supporting horticultural trees, backed by round-the-clock estate management, drip irrigation, sweet groundwater, and individual boundary fencing. Ideal for long-term capital wealth creation and private leisure farmstead living.",
    plotsCount: 60,
    availablePlots: 18,
    imageGradientFrom: "from-emerald-800",
    imageGradientTo: "to-emerald-950",
    imageUrl: goldenAcresImg,
    amenities: [
      "Western Ghats Panoramic Views",
      "Sandalwood + Supporting Plants Plantation",
      "Managed Agro-Farmland Estate Care",
      "Organic Fruit & Timber Groves",
      "Individual Drip Irrigation Network",
      "24/7 Gated Security & Caretaker",
      "Sweet Natural Groundwater",
      "Gravel Internal Avenues",
      "Clear Title & Individual Patta"
    ],
    mapUrl: "https://maps.google.com/maps?q=9.3436%2C77.4303&z=17&hl=en",
    mapEmbedUrl: "https://maps.google.com/maps?q=9.3436,77.4303&hl=en&z=16&output=embed",
    coordinates: { lat: 9.3436, lng: 77.4303 },
    snapshot: {
      projectName: "Golden Acres",
      marketer: "Aurum Properties",
      location: "Sivagiri, Tenkasi",
      totalFarm: "140 Acres",
      unitSize: "25 Cents",
      plantation: "Sandalwood + Supporting Plants",
      concept: "Managed Farm + Leisure Lifestyle",
      horizon: "Long Term",
      market: "Tamil Nadu + NRI Buyers",
      priceExact: "₹25,00,000"
    }
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: "right-time-to-buy-now",
    title: "Is NOW the Right Time to Buy a Plot in Tamil Nadu?",
    category: "Investment Tips",
    author: "Mythili Ramaswamy",
    authorTitle: "CEO, Aurum Properties",
    authorAvatar: "MR",
    date: "May 14, 2026",
    readingTime: "6 min read",
    excerpt: "With infrastructure expansion exploding across NH Highways, Outer Ring Roads, and Metro lines, 2025 presents an unprecedented goldmine window for physical land acquisition in Tamil Nadu.",
    isFeatured: true,
    imageGradientFrom: "from-brand-green",
    imageGradientTo: "to-emerald-950",
    imageUrl: familyNewHomeImg,
    paragraphs: [
      "The Tamil Nadu real estate landscape is now undergoing an unprecedented paradigm shift. Historically, urban real estate was restricted to core city limits, but the massive expansion of the Chennai Metro, the Coimbatore IT Corridor, and the industrial developments in Hosur and Madurai have created high-growth micro-markets that offer exceptional value.",
      "One of the major catalysts is the expansion of Tamil Nadu's national highway infrastructure. Areas that were once considered far-flung suburbs are now highly accessible via modern bypasses and outer ring roads. Guduvanchery, Tambaram West, and Saravanampatti have seen a massive influx of residents, causing a natural surge in land and plot values. Buying a plot today is not just about owning land; it is about securing an appreciating asset that outpaces typical financial instruments.",
      "Furthermore, unlike completed apartments which depreciate in building value over time, raw land continues to appreciate consistently. With Tamil Nadu's guideline values adjusting periodically to reflect infrastructure gains, the equity built in a piece of land is highly robust and secure. It offers unmatched flexibility—allowing owners to hold, sell, or build their dream house at their own pace and custom budget.",
      "RERA compliance and DTCP approvals have also introduced immense security to the sector. Gone are the days when buyers feared clear title issues. Buying from structured, branded developers like Aurum Properties ensures that every plot has clear title deeds, is encumbrance-free, and adheres strictly to municipal master plans, providing peace of mind to investors.",
      "When we look at historical data, plots in Chennai's Southern suburbs have appreciated by over 18% year-on-year over the past five years. Coimbatore's IT corridor has followed a similar, if not steeper, trajectory of 22% annual appreciation. In 2025, with interest rates stabilizing and digital land registry records becoming completely transparent in Tamil Nadu, the barriers to entry have never been lower, while the potential remains extraordinarily high.",
      "In summary, land is a finite resource. As urban populations continue to expand, the demand for well-laid, secure, and clean plot layouts within gated communities is scaling rapidly. Investors who secure DTCP-approved land in key Tamil Nadu corridors during 2025 are positioning themselves for substantial wealth generation and physical security in the decades to come."
    ]
  },
  {
    id: "legal-checklist-decoded",
    title: "Legal Checklist for Buying Plots in Chennai: RERA & DTCP Decoded",
    category: "Legal Matters",
    author: "Ramesh Iyer",
    authorTitle: "Head of Legal, Aurum Properties",
    authorAvatar: "RI",
    date: "June 02, 2026",
    readingTime: "5 min read",
    excerpt: "Before putting your hard-earned money into any land, understand the critical difference between DTCP and CMDA, and why RERA registration is non-negotiable.",
    imageGradientFrom: "from-brand-green-light",
    imageGradientTo: "to-amber-900",
    imageUrl: guduvancheryImg,
    paragraphs: [
      "Investing in real estate is a milestone decision, but it requires thorough legal diligence. In Tamil Nadu, the two main layout approval bodies are CMDA (Chennai Metropolitan Development Authority) and DTCP (Directorate of Town and Country Planning). CMDA handles approvals within Chennai Metropolitan areas, while DTCP approves layouts across the rest of Tamil Nadu. A proper approval ensures the land is legally authorized for residential development, and that the layout allocates appropriate spaces for public roads and community parks.",
      "Next in the checklist is the RERA registration. The Real Estate (Regulation and Development) Act ensures total transparency and protects buyer interests. Registered projects must publish periodic progress reports and cannot deviate from the approved layout layout plans. Purchasing a RERA-registered plot ensures legal recourse and guards you against developers selling unapproved or disputed lands.",
      "Always check the Parent Document and Title Deed. These documents establish the chain of ownership. A clear legal title ensures that the seller has absolute ownership of the land and has the complete legal right to transfer ownership. Hire a qualified legal professional to verify documents dating back at least 30 years to guarantee there are no pending litigations, minor rights, or family disputes.",
      "An Encumbrance Certificate (EC) is another absolute must. It verifies whether there are any registered liabilities, mortgages, or legal charges on the plot. In Tamil Nadu, you can easily apply for and download ECs online via the TNREGINET portal. Make sure the EC is completely clear up to the current date and lists the current owner as the undisputed title holder."
    ]
  },
  {
    id: "coimbatore-villa-plots-trend",
    title: "The Rise of Coimbatore: Why Smart Investors are Choosing Villa Plots",
    category: "Tamil Nadu Real Estate News",
    author: "Priya Venkatesh",
    authorTitle: "COO, Aurum Properties",
    authorAvatar: "PV",
    date: "May 28, 2026",
    readingTime: "4 min read",
    excerpt: "Coimbatore is no longer just a textile hub. Discover why Saravanampatti and Kovaipudur are seeing massive double-digit plot appreciation.",
    imageGradientFrom: "from-teal-700",
    imageGradientTo: "to-brand-green",
    imageUrl: coimbatoreImg,
    paragraphs: [
      "Coimbatore, known as the 'Manchester of South India', has emerged as one of the most promising Tier-2 real estate hotspots in the country. The city boasts a wonderful climate, excellent air quality, sweet Siruvani water, and a highly stable socio-economic profile, making it a highly desirable residential choice.",
      "The massive growth of the IT sector has fueled an enormous demand for high-quality housing. Saravanampatti, the IT hub of Coimbatore, houses major tech parks and employs thousands of young professionals. These professionals are looking to build independent villas in gated, structured communities, driving up the land values in surrounding areas like Kovaipudur.",
      "Unlike congested metros, Coimbatore offers spacious living, excellent educational institutions, and world-class healthcare centers. Investors are realizing that buying a gated villa plot in Coimbatore provides a premium lifestyle with massive long-term financial appreciation. It serves as both a high-yielding asset and an idyllic location for raising a family."
    ]
  },
  {
    id: "understanding-encumbrance-certificate",
    title: "Understanding Encumbrance Certificate (EC) in Tamil Nadu Real Estate",
    category: "Legal Matters",
    author: "Ramesh Iyer",
    authorTitle: "Head of Legal, Aurum Properties",
    authorAvatar: "RI",
    date: "April 18, 2026",
    readingTime: "5 min read",
    excerpt: "A comprehensive guide to applying for, reading, and verifying the Encumbrance Certificate via the TNREGINET portal.",
    imageGradientFrom: "from-blue-900",
    imageGradientTo: "to-emerald-950",
    imageUrl: gatedEntranceImg,
    paragraphs: [
      "An Encumbrance Certificate (EC) is the single most important legal document to prove that a property is free from any monetary or legal liabilities. It contains a chronological record of all registered transactions on the property, including sale deeds, mortgages, gifts, or partitions.",
      "In Tamil Nadu, the registration department has fully digitized property records. Through the TNREGINET portal, buyers can search for transactions, verify registration numbers, and request a certified digital copy of the EC. This process ensures absolute transparency and helps prevent fraudulent transactions.",
      "When verifying an EC, look for any 'Mortgage by Deposit of Title Deeds'. This indicates that the property has been pledged as collateral for a bank loan. Such mortgages must be formally discharged and registered with the sub-registrar office before the property can be legally sold. Always ensure you obtain a NIL Encumbrance Certificate for the latest period before signing any purchase agreements."
    ]
  },
  {
    id: "soil-testing-vital-step",
    title: "Soil Testing 101: Why It's the Vital First Step in Building Your Home",
    category: "Buying Guides",
    author: "Priya Venkatesh",
    authorTitle: "COO, Aurum Properties",
    authorAvatar: "PV",
    date: "March 30, 2026",
    readingTime: "4 min read",
    excerpt: "Don't build your house on weak foundations. Learn how different soil types in Tamil Nadu affect your structural safety and building costs.",
    imageGradientFrom: "from-amber-800",
    imageGradientTo: "to-orange-950",
    imageUrl: guduvancheryImg,
    paragraphs: [
      "Many plot owners rush into architectural designs and foundation excavations without a fundamental understanding of the soil beneath their feet. Soil testing determines the bearing capacity of the soil, which in turn dictates the type and depth of foundation required to support your structure safely.",
      "Tamil Nadu features diverse geological profiles—ranging from sandy soils in coastal Chennai to clay-heavy black cotton soils in parts of Coimbatore, and firm gravelly or rocky soils in Hosur. Sandy or clayey soils are highly prone to moisture shifts, which can lead to foundation settlement, wall cracks, and structural failure if not accounted for.",
      "By conducting a standard soil test (SBC test), engineers can accurately design a safe foundation—such as a simple column footing, a robust raft foundation, or deep piles. Investing a nominal amount in professional soil testing upfront saves lakhs in future structural repairs and prevents catastrophic building failures."
    ]
  },
  {
    id: "emerging-hotspots-madurai-thanjavur",
    title: "Thanjavur & Madurai: Emerging Hotspots for Affordable Land Investments",
    category: "Tamil Nadu Real Estate News",
    author: "Mythili Ramaswamy",
    authorTitle: "CEO, Aurum Properties",
    authorAvatar: "MR",
    date: "March 12, 2026",
    readingTime: "5 min read",
    excerpt: "With rapid urban development and solid culture-led tourism, historic cities are yielding excellent ROI for long-term land buyers.",
    imageGradientFrom: "from-purple-900",
    imageGradientTo: "to-brand-green",
    imageUrl: thanjavurImg,
    paragraphs: [
      "While Tier-1 metro cities continue to see high property rates, smart money is quietly moving into Tier-2 heritage cities like Madurai and Thanjavur. These cities blend deep-rooted cultural heritage with rapid infrastructure modernization, making them incredibly attractive for long-term investors.",
      "Madurai is expanding rapidly along its ring roads and the Madurai-Tuticorin industrial corridor. Similarly, Thanjavur is seeing a rise in retired professionals returning to build heritage homes, attracted by its peaceful environment, clean groundwater, and rich cultural tapestry. The entry ticket size in these locations is highly affordable compared to Chennai.",
      "As the government expands digital connectivity and boosts domestic tourism, these cities are witnessing steady economic development. Purchasing DTCP-approved layouts here now ensures substantial capital gains as suburban areas merge with expanding city boundaries over the next 5 to 7 years."
    ]
  },
  {
    id: "how-to-plan-construction-budget",
    title: "How to Plan Your Construction Budget: A Step-by-Step Plot Owner's Guide",
    category: "Buying Guides",
    author: "Mythili Ramaswamy",
    authorTitle: "CEO, Aurum Properties",
    authorAvatar: "MR",
    date: "February 20, 2026",
    readingTime: "6 min read",
    excerpt: "From architect fees to civil contracts and finishing materials, we break down the real costs of building your independent house.",
    imageGradientFrom: "from-slate-700",
    imageGradientTo: "to-slate-950",
    imageUrl: familyNewHomeImg,
    paragraphs: [
      "Owning a plot is only half the journey; the actual magic happens when you build your independent home. However, construction costs can spiral out of control without a meticulously planned and monitored budget. A successful build relies on clear financial structuring before a single brick is laid.",
      "Your budget is broadly divided into three main components: Civil Construction (foundation, pillars, brickwork, plastering), Finishing Works (flooring, tiles, paint, doors, windows), and MEP works (mechanical, electrical, plumbing). Typically, civil work consumes about 50% of the budget, while finishing accounts for 35%, and MEP takes up the remaining 15%.",
      "Always allocate a contingency buffer of at least 10% to accommodate fluctuations in steel, cement, or labor rates. By utilizing reliable assistance programs like Aurum Build Assist, plot owners can access transparent, pre-negotiated contractor rates and structural oversight, ensuring a stress-free construction experience."
    ]
  },
  {
    id: "green-living-eco-plots",
    title: "Green Living: How Eco-Friendly Plots Increase Long-Term Asset Value",
    category: "Investment Tips",
    author: "Priya Venkatesh",
    authorTitle: "COO, Aurum Properties",
    authorAvatar: "PV",
    date: "January 28, 2026",
    readingTime: "4 min read",
    excerpt: "Miyawaki forests, rain harvesting, and solar streetlights are no longer just optional accessories—they directly drive land appreciation.",
    imageGradientFrom: "from-emerald-700",
    imageGradientTo: "to-green-950",
    imageUrl: maduraiImg,
    paragraphs: [
      "The modern home buyer is highly conscious of their ecological footprint and physical well-being. Gated community layouts that incorporate eco-friendly elements—like rainwater harvesting networks, solar-powered public streetlights, solid waste management systems, and intensive native greenery—appreciate much faster than conventional concrete layouts.",
      "Miyawaki micro-forests, for example, cool down localized ambient temperatures by 2-3 degrees, filter dust, and attract native birds. This creates an immensely peaceful residential ecosystem that commands premium rental yields and higher resale values.",
      "Sustainable water management is equally crucial. In areas with deep rainwater recharge trenches, groundwater tables remain stable and sweet even during hot summer months. Investing in eco-friendly plots is both a responsible choice for the planet and a highly profitable strategy for your financial portfolio."
    ]
  }
];

export const plotList: Plot[] = Array.from({ length: 20 }, (_, i) => {
  const soldIndices = [2, 4, 5, 8, 10, 14, 15, 17, 19]; // hardcoded sold plots for realism
  const id = `P${i + 1}`;
  return {
    id,
    size: 1200,
    status: soldIndices.includes(i) ? 'Sold' : 'Available',
    price: 15 + (i % 3) * 1.5 // varying price slightly for realism
  };
});
