import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { jsPDF } from 'jspdf';
import { execSync } from 'child_process';

const W = 1240;
const H = 1754;

// Load real project image
const heroImgPath = path.resolve('src/assets/images/sre_nagar_erode_1791374287268.jpg');
const heroImgBase64 = fs.existsSync(heroImgPath)
  ? `data:image/jpeg;base64,${fs.readFileSync(heroImgPath).toString('base64')}`
  : '';

// PAGE 1: COVER PAGE
const page1Svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#387799"/>
      <stop offset="40%" stop-color="#7BB4D3"/>
      <stop offset="70%" stop-color="#FCEFD2"/>
      <stop offset="100%" stop-color="#FDFBF7"/>
    </linearGradient>
    <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#C59B27"/>
      <stop offset="35%" stop-color="#F3E5AB"/>
      <stop offset="50%" stop-color="#E2B93B"/>
      <stop offset="85%" stop-color="#996E14"/>
      <stop offset="100%" stop-color="#DFBC42"/>
    </linearGradient>
    <linearGradient id="emeraldBanner" x1="0" y1="0" x2="1" y2="0.3">
      <stop offset="0%" stop-color="#052417"/>
      <stop offset="50%" stop-color="#0A3622"/>
      <stop offset="100%" stop-color="#062215"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Sky & Horizon -->
  <rect width="${W}" height="${H}" fill="url(#skyGrad)"/>

  <!-- Background Hero Perspective Image -->
  ${heroImgBase64 ? `<image href="${heroImgBase64}" x="0" y="240" width="${W}" height="1060" preserveAspectRatio="xMidYMid slice" opacity="0.95"/>` : ''}

  <!-- Sun Rays & Glow -->
  <circle cx="160" cy="380" r="280" fill="#FFF7D6" opacity="0.45"/>
  <circle cx="160" cy="380" r="140" fill="#FFFFFF" opacity="0.6"/>

  <!-- Top Foliage Canopy -->
  <path d="M0,0 L${W},0 L${W},180 C1100,140 1000,220 850,150 C700,80 600,190 450,120 C300,50 150,160 0,110 Z" fill="#1C381E" opacity="0.85"/>
  <path d="M0,0 L${W},0 L${W},130 C1050,100 950,160 820,110 C690,60 580,140 430,90 C280,40 120,110 0,70 Z" fill="#2E582C" opacity="0.75"/>

  <!-- Aurum Crest & Crown -->
  <g transform="translate(620, 190)" text-anchor="middle" filter="url(#shadow)">
    <!-- Ornate Gold Emblem -->
    <path d="M-80,-45 C-120,-80 -40,-130 0,-140 C40,-130 120,-80 80,-45 C120,-10 100,40 0,65 C-100,40 -120,-10 -80,-45 Z" fill="url(#goldRibbon)"/>
    <path d="M-65,-40 C-95,-70 -30,-110 0,-120 C30,-110 95,-70 65,-40 C95,-10 80,30 0,50 C-80,30 -95,-10 -65,-40 Z" fill="#0A3622"/>
    <!-- Crown Towers inside crest -->
    <rect x="-24" y="-85" width="12" height="42" fill="url(#goldRibbon)" rx="2"/>
    <rect x="-6" y="-105" width="12" height="62" fill="url(#goldRibbon)" rx="2"/>
    <rect x="12" y="-85" width="12" height="42" fill="url(#goldRibbon)" rx="2"/>
    <polygon points="0,-120 -15,-100 15,-100" fill="url(#goldRibbon)"/>
    <!-- Brand Title -->
    <text y="10" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-weight="900" font-size="44" fill="url(#goldRibbon)" letter-spacing="4">AURUM</text>
    <text y="38" font-family="'Montserrat', sans-serif" font-weight="700" font-size="14" fill="#EAD598" letter-spacing="8">PROPERTIES</text>
  </g>

  <!-- Top Right RERA & DTCP Circular Badge -->
  <g transform="translate(1080, 160)" filter="url(#shadow)">
    <circle cx="0" cy="0" r="76" fill="#8C1D18" stroke="url(#goldRibbon)" stroke-width="5"/>
    <circle cx="0" cy="0" r="66" fill="#A82823" stroke="#FCE082" stroke-width="1.5" stroke-dasharray="4,2"/>
    <text y="-20" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="800" font-size="12" fill="#FFE899" letter-spacing="2">REGISTERED</text>
    <text y="5" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="17" fill="#FFFFFF" letter-spacing="1">RERA &amp; DTCP</text>
    <text y="28" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="800" font-size="13" fill="#FFE899" letter-spacing="2">APPROVED</text>
  </g>

  <!-- Left Bank Loan Badge -->
  <g transform="translate(90, 830)" filter="url(#shadow)">
    <rect x="0" y="0" width="280" height="90" rx="14" fill="#FFFFFF" stroke="#E2B93B" stroke-width="3"/>
    <text x="14" y="52" font-family="'Montserrat', sans-serif" font-weight="900" font-size="52" fill="#E28913">80%</text>
    <text x="135" y="38" font-family="'Montserrat', sans-serif" font-weight="800" font-size="15" fill="#1A382B">BANK LOAN</text>
    <text x="135" y="58" font-family="'Montserrat', sans-serif" font-weight="800" font-size="14" fill="#1A382B">APPLICABLE</text>
    <rect x="12" y="66" width="256" height="18" rx="4" fill="#0C3F68"/>
    <text x="140" y="79" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="700" font-size="10.5" fill="#FFFFFF" letter-spacing="1">APPROVED BY SBI &amp; HDFC BANK</text>
  </g>

  <!-- Bottom Curving Emerald & Gold Banners -->
  <g filter="url(#shadow)">
    <!-- Gold Ribbon Outline -->
    <path d="M0,1210 C350,1130 850,1290 1240,1170 L1240,1754 L0,1754 Z" fill="url(#goldRibbon)"/>
    <!-- Inner Deep Emerald Banner -->
    <path d="M0,1225 C350,1145 850,1305 1240,1185 L1240,1754 L0,1754 Z" fill="url(#emeraldBanner)"/>
  </g>

  <!-- Bottom Gold Ribbon Accent Strip -->
  <path d="M0,1610 C350,1570 850,1630 1240,1590 L1240,1620 C850,1660 350,1600 0,1640 Z" fill="url(#goldRibbon)" opacity="0.65"/>

  <!-- Project Title & Subtitles -->
  <g transform="translate(620, 1370)" text-anchor="middle" filter="url(#shadow)">
    <text y="0" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-weight="900" font-size="62" fill="url(#goldRibbon)" letter-spacing="3">SRE NAGAR EXTENSION</text>
    <text y="54" font-family="'Montserrat', sans-serif" font-weight="600" font-size="26" fill="#FFFFFF" letter-spacing="3">- Premium Residential Plots -</text>
    <!-- Location Address -->
    <text y="145" font-family="'Montserrat', sans-serif" font-weight="600" font-size="20" fill="#EAD598" letter-spacing="1">Muthampalayam, Near Maharaja Multicomplex, Erode - 638009.</text>
  </g>

  <!-- Corner Leaves Embellishments -->
  <g fill="#254F23" opacity="0.9">
    <path d="M0,1754 C80,1680 140,1660 220,1680 C160,1730 100,1754 0,1754 Z"/>
    <path d="M1240,1754 C1160,1680 1100,1660 1020,1680 C1080,1730 1140,1754 1240,1754 Z"/>
  </g>
</svg>
`;

// PAGE 2: PRIME CONNECTIVITY (<5 KM)
const page2Svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgP2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FCFBF7"/>
      <stop offset="50%" stop-color="#F5EFE1"/>
      <stop offset="100%" stop-color="#EDE2CA"/>
    </linearGradient>
    <linearGradient id="headerGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#052417"/>
      <stop offset="50%" stop-color="#0E482E"/>
      <stop offset="100%" stop-color="#052417"/>
    </linearGradient>
    <linearGradient id="gold2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#C59B27"/>
      <stop offset="50%" stop-color="#F5E8B7"/>
      <stop offset="100%" stop-color="#9C7316"/>
    </linearGradient>
    <filter id="p2Shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.18"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bgP2)"/>

  <!-- Top & Bottom Golden Swags -->
  <path d="M0,0 L${W},0 L${W},80 C950,50 300,50 0,80 Z" fill="url(#gold2)"/>
  <path d="M0,${H} L${W},${H} L${W},${H-70} C950,${H-40} 300,${H-40} 0,${H-70} Z" fill="url(#gold2)"/>

  <!-- Header Banner -->
  <g transform="translate(620, 150)" text-anchor="middle" filter="url(#p2Shadow)">
    <rect x="-480" y="-55" width="960" height="110" rx="36" fill="url(#headerGrad)" stroke="url(#gold2)" stroke-width="4"/>
    <text y="0" font-family="'Cinzel', Georgia, serif" font-weight="900" font-size="36" fill="url(#gold2)" letter-spacing="3">EASY ACCESS / PRIME CONNECTIVITY</text>
    <text y="42" font-family="'Montserrat', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF" letter-spacing="2">within 5 Km</text>
  </g>

  <!-- 9 Connectivity Items Flow (Alternating Pills) -->
  ${[
    { name: "Maharaja Theatre &amp; STEM Park", iconBg: "#D9483B", num: "01", side: "left", y: 340, desc: "Entertainment &amp; Science Park" },
    { name: "Erode Railway Junction", iconBg: "#2A72B5", num: "02", side: "right", y: 475, desc: "Major Southern Railway Terminal (10 Mins)" },
    { name: "Erode Bus Stand", iconBg: "#D49826", num: "03", side: "left", y: 610, desc: "Central Inter-City Transit Hub" },
    { name: "Lotus Hospital", iconBg: "#2DA067", num: "04", side: "right", y: 745, desc: "24/7 Multi-Speciality Emergency Care" },
    { name: "BVB School", iconBg: "#7B46A3", num: "05", side: "left", y: 880, desc: "Bharatiya Vidya Bhavan Matric &amp; CBSE" },
    { name: "Indian Public School (TIPS)", iconBg: "#D15B28", num: "06", side: "right", y: 1015, desc: "Leading International School Academy" },
    { name: "Erode Arts &amp; Science College", iconBg: "#1C8894", num: "07", side: "left", y: 1150, desc: "Premier Higher Education Campus" },
    { name: "Thindal Murugan Temple", iconBg: "#C4881A", num: "08", side: "right", y: 1285, desc: "Famous Heritage Hill Shrine &amp; Suburb" },
    { name: "Major Daily Markets &amp; Banks", iconBg: "#2B8749", num: "09", side: "left", y: 1420, desc: "Fresh Produce, Supermarkets, ATMs (800m)" }
  ].map(item => {
    const isLeft = item.side === 'left';
    const pillX = isLeft ? 190 : 350;
    const badgeX = isLeft ? 190 : 1050;
    const pillFill = isLeft ? "#FFF8E7" : "#EAF4F0";
    const pillStroke = isLeft ? "#E8C87A" : "#8CC6A5";
    return `
      <g filter="url(#p2Shadow)">
        <!-- Connecting decorative curved line -->
        <line x1="620" y1="${item.y}" x2="${badgeX}" y2="${item.y}" stroke="#D1BE8C" stroke-width="2" stroke-dasharray="6,4"/>

        <!-- Pill Box -->
        <rect x="${pillX}" y="${item.y - 42}" width="700" height="84" rx="42" fill="${pillFill}" stroke="${pillStroke}" stroke-width="2.5"/>
        <text x="${isLeft ? pillX + 130 : pillX + 40}" y="${item.y - 6}" font-family="'Montserrat', sans-serif" font-weight="800" font-size="25" fill="#163828">${item.name}</text>
        <text x="${isLeft ? pillX + 130 : pillX + 40}" y="${item.y + 22}" font-family="'Montserrat', sans-serif" font-weight="500" font-size="17" fill="#6B7280">${item.desc}</text>

        <!-- Circular Badge Icon -->
        <circle cx="${badgeX}" cy="${item.y}" r="48" fill="${item.iconBg}" stroke="#FFFFFF" stroke-width="4"/>
        <text x="${badgeX}" y="${item.y + 11}" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="28" fill="#FFFFFF">${item.num}</text>
      </g>
    `;
  }).join('')}

  <!-- Footer Banner text -->
  <text x="620" y="1610" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="700" font-size="21" fill="#0A3622" letter-spacing="1">
    SRE NAGAR EXTENSION • MUTHAMPALAYAM • ERODE
  </text>
</svg>
`;

// PAGE 3: MAP LAYOUT & EXACT 19 PLOTS TABLE
const plotsDataPage3 = [
  { no: 1, sqft: 1534, facing: "S", rate: 2999, price: "46.00 L" },
  { no: 2, sqft: 1655, facing: "S", rate: 2999, price: "49.63 L" },
  { no: 3, sqft: 1770, facing: "S", rate: 2999, price: "53.08 L" },
  { no: 4, sqft: 1842, facing: "S", rate: 2999, price: "55.24 L" },
  { no: 5, sqft: 2586, facing: "N", rate: 3299, price: "85.31 L" },
  { no: 6, sqft: 1587, facing: "N", rate: 3299, price: "52.36 L" },
  { no: 7, sqft: 1572, facing: "N", rate: 3299, price: "51.86 L" },
  { no: 8, sqft: 1557, facing: "N", rate: 3299, price: "51.37 L" },
  { no: 9, sqft: 1543, facing: "N", rate: 3299, price: "50.90 L" },
  { no: 10, sqft: 1528, facing: "N", rate: 3299, price: "50.41 L" },
  { no: 11, sqft: 1530, facing: "N", rate: 3299, price: "50.47 L" },
  { no: 12, sqft: 1545, facing: "S", rate: 2999, price: "46.33 L" },
  { no: 13, sqft: 1494, facing: "S", rate: 2999, price: "44.81 L" },
  { no: 14, sqft: 1479, facing: "S", rate: 2999, price: "44.36 L" },
  { no: 15, sqft: 1464, facing: "S", rate: 2999, price: "43.91 L" },
  { no: 16, sqft: 1455, facing: "S", rate: 2999, price: "43.64 L" },
  { no: 17, sqft: 1445, facing: "S", rate: 2999, price: "43.34 L" },
  { no: 18, sqft: 1435, facing: "S", rate: 2999, price: "43.04 L" },
  { no: 19, sqft: 1107, facing: "S", rate: 2999, price: "33.20 L" }
];

const page3Svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgP3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FCFBF7"/>
      <stop offset="50%" stop-color="#F7F1E4"/>
      <stop offset="100%" stop-color="#EDE2CA"/>
    </linearGradient>
    <linearGradient id="gold3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#C59B27"/>
      <stop offset="50%" stop-color="#F5E8B7"/>
      <stop offset="100%" stop-color="#9C7316"/>
    </linearGradient>
    <linearGradient id="tblHead" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#EDE0BE"/>
      <stop offset="100%" stop-color="#DFCE9E"/>
    </linearGradient>
    <filter id="p3Shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bgP3)"/>

  <!-- Top Banner -->
  <g transform="translate(60, 50)" filter="url(#p3Shadow)">
    <rect width="450" height="85" rx="20" fill="#0A3622" stroke="url(#gold3)" stroke-width="3"/>
    <text x="40" y="56" font-family="'Cinzel', Georgia, serif" font-weight="900" font-size="44" fill="url(#gold3)" letter-spacing="2">Map Layout</text>
  </g>

  <!-- Left: Architectural Site Layout Drawing -->
  <g transform="translate(60, 165)">
    <!-- Layout Boundary Container -->
    <rect width="660" height="1420" rx="20" fill="#FFFFFF" stroke="#D1BE8C" stroke-width="3" filter="url(#p3Shadow)"/>

    <!-- Green Landscaping Hedge Perimeter -->
    <rect x="15" y="15" width="630" height="1390" fill="#F8FAF8" stroke="#799F69" stroke-width="2" stroke-dasharray="8,4"/>

    <!-- 40 FEET MAIN ROAD (Vertical center-right) -->
    <rect x="420" y="30" width="130" height="1360" fill="#4B5563"/>
    <!-- Road dashed markings -->
    <line x1="485" y1="30" x2="485" y2="1390" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="25,18"/>
    <!-- 40 FEET ROAD Labels -->
    <text x="-400" y="492" transform="rotate(-90)" font-family="'Montserrat', sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" letter-spacing="3">40 Feet Road</text>
    <text x="-1100" y="492" transform="rotate(-90)" font-family="'Montserrat', sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" letter-spacing="3">40 Feet Road</text>

    <!-- 30 FEET INTERNAL ROAD (West side) -->
    <rect x="35" y="450" width="85" height="780" fill="#6B7280"/>
    <text x="-900" y="88" transform="rotate(-90)" font-family="'Montserrat', sans-serif" font-weight="900" font-size="23" fill="#FFFFFF" letter-spacing="2">30 Feet Road</text>

    <!-- EB Utility Block (Top Right) -->
    <rect x="565" y="50" width="70" height="90" fill="#1F2937" rx="6"/>
    <text x="600" y="105" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="26" fill="#FBBF24">EB</text>

    <!-- PLOTS 1, 2, 3, 4 (East of 40ft road) -->
    ${[
      { id: "1", y: 155, h: 220, w: 70, sqft: "1534" },
      { id: "2", y: 390, h: 220, w: 70, sqft: "1655" },
      { id: "3", y: 625, h: 220, w: 70, sqft: "1770" },
      { id: "4", y: 860, h: 260, w: 70, sqft: "1842" }
    ].map(p => `
      <rect x="565" y="${p.y}" width="${p.w}" height="${p.h}" fill="#FEF3C7" stroke="#B45309" stroke-width="2" rx="4"/>
      <text x="600" y="${p.y + p.h/2 - 8}" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="24" fill="#B45309">${p.id}</text>
      <text x="600" y="${p.y + p.h/2 + 16}" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="700" font-size="12" fill="#78350F">${p.sqft}</text>
    `).join('')}

    <!-- PLOTS 5 to 11 (Facing North / East-west corridor) -->
    ${[
      { id: "11", x: 280, y: 50, w: 125, h: 100 },
      { id: "10", x: 280, y: 160, w: 125, h: 100 },
      { id: "9", x: 280, y: 270, w: 125, h: 100 },
      { id: "8", x: 280, y: 380, w: 125, h: 100 },
      { id: "7", x: 280, y: 490, w: 125, h: 100 },
      { id: "6", x: 280, y: 600, w: 125, h: 100 },
      { id: "5", x: 280, y: 710, w: 125, h: 180 }
    ].map(p => `
      <rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" fill="#DCFCE7" stroke="#15803D" stroke-width="2" rx="4"/>
      <text x="${p.x + p.w/2}" y="${p.y + p.h/2 + 8}" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="22" fill="#15803D">${p.id}</text>
    `).join('')}

    <!-- PLOTS 12 to 19 (Facing South along 30ft road) -->
    ${[
      { id: "12", x: 135, y: 50, w: 130, h: 100 },
      { id: "13", x: 135, y: 160, w: 130, h: 100 },
      { id: "14", x: 135, y: 270, w: 130, h: 100 },
      { id: "15", x: 135, y: 380, w: 130, h: 100 },
      { id: "16", x: 135, y: 490, w: 130, h: 100 },
      { id: "17", x: 135, y: 600, w: 130, h: 100 },
      { id: "18", x: 135, y: 710, w: 130, h: 100 },
      { id: "19", x: 135, y: 820, w: 130, h: 120 }
    ].map(p => `
      <rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" fill="#FEF3C7" stroke="#B45309" stroke-width="2" rx="4"/>
      <text x="${p.x + p.w/2}" y="${p.y + p.h/2 + 8}" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="22" fill="#B45309">${p.id}</text>
    `).join('')}
  </g>

  <!-- Right: Official Specification Table (Matching page 3 exact) -->
  <g transform="translate(750, 165)" filter="url(#p3Shadow)">
    <rect width="440" height="1420" rx="16" fill="#FFFDF8" stroke="#C59B27" stroke-width="3"/>

    <!-- Table Header Row -->
    <rect x="0" y="0" width="440" height="75" rx="16" fill="url(#tblHead)"/>
    <text x="50" y="38" font-family="'Montserrat', sans-serif" font-weight="900" font-size="18" fill="#1A382B">Plot</text>
    <text x="50" y="58" font-family="'Montserrat', sans-serif" font-weight="900" font-size="18" fill="#1A382B">No</text>

    <text x="180" y="38" font-family="'Montserrat', sans-serif" font-weight="900" font-size="18" fill="#1A382B">Area in</text>
    <text x="180" y="58" font-family="'Montserrat', sans-serif" font-weight="900" font-size="18" fill="#1A382B">Sq.Ft</text>

    <text x="330" y="48" font-family="'Montserrat', sans-serif" font-weight="900" font-size="19" fill="#1A382B">Facing</text>

    <!-- Table Grid Lines -->
    <line x1="120" y1="0" x2="120" y2="1420" stroke="#D1BE8C" stroke-width="2"/>
    <line x1="280" y1="0" x2="280" y2="1420" stroke="#D1BE8C" stroke-width="2"/>

    <!-- 19 Plot Rows -->
    ${plotsDataPage3.map((p, idx) => {
      const rowY = 75 + idx * 70.5;
      const isNorth = p.facing === 'N';
      const rowBg = isNorth ? "#F0FDF4" : "#FFFBEB";
      return `
        <rect x="0" y="${rowY}" width="440" height="70.5" fill="${rowBg}"/>
        <line x1="0" y1="${rowY}" x2="440" y2="${rowY}" stroke="#E5D9BD" stroke-width="1.5"/>

        <!-- Plot No -->
        <text x="60" y="${rowY + 44}" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="800" font-size="24" fill="#1F2937">${p.no}</text>

        <!-- Area in Sq.Ft -->
        <text x="200" y="${rowY + 44}" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="800" font-size="24" fill="#0A3622">${p.sqft}</text>

        <!-- Facing -->
        <text x="360" y="${rowY + 44}" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="24" fill="${isNorth ? '#166534' : '#9A3412'}">${p.facing}</text>
      `;
    }).join('')}
  </g>
</svg>
`;

// PAGE 4: BACK COVER & CORPORATE DOSSIER
const page4Svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgP4" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FCFBF7"/>
      <stop offset="40%" stop-color="#FDFBF7"/>
      <stop offset="80%" stop-color="#EAF3EE"/>
      <stop offset="100%" stop-color="#D9ECE0"/>
    </linearGradient>
    <linearGradient id="gold4" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#C59B27"/>
      <stop offset="35%" stop-color="#F3E5AB"/>
      <stop offset="50%" stop-color="#E2B93B"/>
      <stop offset="85%" stop-color="#996E14"/>
      <stop offset="100%" stop-color="#DFBC42"/>
    </linearGradient>
    <linearGradient id="emerald4" x1="0" y1="0" x2="1" y2="0.3">
      <stop offset="0%" stop-color="#052417"/>
      <stop offset="50%" stop-color="#0A3622"/>
      <stop offset="100%" stop-color="#062215"/>
    </linearGradient>
    <filter id="p4Shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bgP4)"/>

  <!-- Top Foliage Canopy -->
  <path d="M0,0 L${W},0 L${W},180 C1100,140 1000,220 850,150 C700,80 600,190 450,120 C300,50 150,160 0,110 Z" fill="#1C381E" opacity="0.85"/>
  <path d="M0,0 L${W},0 L${W},130 C1050,100 950,160 820,110 C690,60 580,140 430,90 C280,40 120,110 0,70 Z" fill="#2E582C" opacity="0.75"/>

  <!-- Golden Brand Crest (Top Center) -->
  <g transform="translate(620, 290)" text-anchor="middle" filter="url(#p4Shadow)">
    <path d="M-80,-45 C-120,-80 -40,-130 0,-140 C40,-130 120,-80 80,-45 C120,-10 100,40 0,65 C-100,40 -120,-10 -80,-45 Z" fill="url(#gold4)"/>
    <path d="M-65,-40 C-95,-70 -30,-110 0,-120 C30,-110 95,-70 65,-40 C95,-10 80,30 0,50 C-80,30 -95,-10 -65,-40 Z" fill="#0A3622"/>
    <rect x="-24" y="-85" width="12" height="42" fill="url(#gold4)" rx="2"/>
    <rect x="-6" y="-105" width="12" height="62" fill="url(#gold4)" rx="2"/>
    <rect x="12" y="-85" width="12" height="42" fill="url(#gold4)" rx="2"/>
    <polygon points="0,-120 -15,-100 15,-100" fill="url(#gold4)"/>
    <text y="14" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-weight="900" font-size="52" fill="url(#gold4)" letter-spacing="4">AURUM</text>
    <text y="46" font-family="'Montserrat', sans-serif" font-weight="700" font-size="16" fill="#EAD598" letter-spacing="8">PROPERTIES</text>
  </g>

  <!-- Corporate Contact Information Card -->
  <g transform="translate(620, 490)" text-anchor="middle" filter="url(#p4Shadow)">
    <rect x="-420" y="0" width="840" height="340" rx="24" fill="#FFFFFF" stroke="url(#gold4)" stroke-width="2.5"/>

    <!-- Email -->
    <text x="0" y="60" font-family="'Montserrat', sans-serif" font-weight="700" font-size="28" fill="#1F2937">aurum.mythili786@gmail.com</text>

    <!-- Website -->
    <text x="0" y="115" font-family="'Montserrat', sans-serif" font-weight="800" font-size="28" fill="#0A3622">aurumproperties.in</text>

    <!-- Address -->
    <text x="0" y="175" font-family="'Montserrat', sans-serif" font-weight="600" font-size="24" fill="#374151">No.626 MKN Road, Alandhur,</text>
    <text x="0" y="215" font-family="'Montserrat', sans-serif" font-weight="600" font-size="24" fill="#374151">Guindy, Chennai - 600 032.</text>

    <!-- Phone Number (Prominent Highlight) -->
    <rect x="-320" y="250" width="640" height="70" rx="16" fill="#0A3622"/>
    <text x="0" y="298" font-family="'Montserrat', sans-serif" font-weight="900" font-size="38" fill="url(#gold4)" letter-spacing="3">+91 739 739 5529</text>
  </g>

  <!-- QR Code Section -->
  <g transform="translate(620, 930)" text-anchor="middle" filter="url(#p4Shadow)">
    <rect x="-110" y="-110" width="220" height="220" rx="18" fill="#FFFFFF" stroke="#0A3622" stroke-width="3"/>

    <!-- Simulated QR Code Grid (Clean, crisp pattern) -->
    <g fill="#0A3622">
      <!-- Top-left finder -->
      <rect x="-85" y="-85" width="45" height="45"/>
      <rect x="-75" y="-75" width="25" height="25" fill="#FFFFFF"/>
      <rect x="-67" y="-67" width="9" height="9"/>
      <!-- Top-right finder -->
      <rect x="40" y="-85" width="45" height="45"/>
      <rect x="50" y="-75" width="25" height="25" fill="#FFFFFF"/>
      <rect x="58" y="-67" width="9" height="9"/>
      <!-- Bottom-left finder -->
      <rect x="-85" y="40" width="45" height="45"/>
      <rect x="-75" y="50" width="25" height="25" fill="#FFFFFF"/>
      <rect x="-67" y="58" width="9" height="9"/>
      <!-- QR Payload Data Modules -->
      <rect x="-25" y="-85" width="10" height="20"/>
      <rect x="-5" y="-85" width="15" height="10"/>
      <rect x="18" y="-85" width="12" height="15"/>
      <rect x="-25" y="-55" width="15" height="15"/>
      <rect x="0" y="-60" width="20" height="20"/>
      <rect x="-25" y="-20" width="20" height="10"/>
      <rect x="5" y="-25" width="10" height="15"/>
      <rect x="25" y="-30" width="20" height="20"/>
      <rect x="-25" y="10" width="15" height="15"/>
      <rect x="0" y="5" width="25" height="20"/>
      <rect x="35" y="0" width="15" height="25"/>
      <rect x="-25" y="40" width="20" height="20"/>
      <rect x="5" y="35" width="20" height="15"/>
      <rect x="35" y="40" width="30" height="20"/>
      <rect x="-25" y="70" width="45" height="15"/>
      <rect x="30" y="70" width="35" height="15"/>
    </g>

    <text y="145" font-family="'Montserrat', sans-serif" font-weight="800" font-size="20" fill="#0A3622" letter-spacing="2">SCAN FOR LOCATION</text>
  </g>

  <!-- Bottom Perspective Avenue Image -->
  ${heroImgBase64 ? `<image href="${heroImgBase64}" x="0" y="1180" width="${W}" height="574" preserveAspectRatio="xMidYMid slice" opacity="0.95"/>` : ''}

  <!-- Bottom Emerald & Gold Ribbon overlay -->
  <path d="M0,1620 C350,1570 850,1660 1240,1600 L1240,1754 L0,1754 Z" fill="url(#gold4)"/>
  <path d="M0,1635 C350,1585 850,1675 1240,1615 L1240,1754 L0,1754 Z" fill="url(#emerald4)"/>
</svg>
`;

async function main() {
  console.log('Rendering 4 High-Resolution Brochure Pages...');

  // Convert SVG pages into crisp, universally compatible JPEG images with solid background
  const p1Buf = await sharp(Buffer.from(page1Svg)).flatten({ background: '#FFFFFF' }).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toBuffer();
  const p2Buf = await sharp(Buffer.from(page2Svg)).flatten({ background: '#FFFFFF' }).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toBuffer();
  const p3Buf = await sharp(Buffer.from(page3Svg)).flatten({ background: '#FFFFFF' }).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toBuffer();
  const p4Buf = await sharp(Buffer.from(page4Svg)).flatten({ background: '#FFFFFF' }).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toBuffer();

  // Save Page 3 Map Layout as web asset for interactive preview in ProjectDetail
  const mapLayoutImgPath = path.resolve('src/assets/images/sre_nagar_layout_map.png');
  fs.writeFileSync(mapLayoutImgPath, await sharp(Buffer.from(page3Svg)).png().toBuffer());
  console.log('Saved layout map image to:', mapLayoutImgPath);

  // Build standard PDF with jsPDF (A4 Portrait, 210 x 297 mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  doc.setProperties({
    title: 'SRE NAGAR EXTENSION - Official Project Brochure',
    subject: '19 Demarcated Villa Plots in Muthampalayam, Erode',
    author: 'Aurum Properties',
    keywords: 'Aurum Properties, SRE Nagar Extension, Erode, DTCP, RERA, Villa Plots, Muthampalayam',
    creator: 'Aurum Properties Real Estate Dossier Engine'
  });

  const pw = 210;
  const ph = 297;

  // Page 1: Luxury Cover
  doc.addImage(p1Buf, 'JPEG', 0, 0, pw, ph, undefined, 'FAST');

  // Page 2: Prime Connectivity (<5 KM)
  doc.addPage();
  doc.addImage(p2Buf, 'JPEG', 0, 0, pw, ph, undefined, 'FAST');

  // Page 3: Master Site Layout & 19 Plots Schedule
  doc.addPage();
  doc.addImage(p3Buf, 'JPEG', 0, 0, pw, ph, undefined, 'FAST');

  // Page 4: Corporate Contact & Location QR Dossier
  doc.addPage();
  doc.addImage(p4Buf, 'JPEG', 0, 0, pw, ph, undefined, 'FAST');

  const finalPdfPath = path.resolve('public/Aurum-Sre-Nagar-Extension-Brochure.pdf');
  const distPdfPath = path.resolve('dist/Aurum-Sre-Nagar-Extension-Brochure.pdf');

  const pdfArrayBuffer = doc.output('arraybuffer');
  const pdfBuffer = Buffer.from(pdfArrayBuffer);

  fs.writeFileSync(finalPdfPath, pdfBuffer);

  if (fs.existsSync('dist')) {
    fs.writeFileSync(distPdfPath, pdfBuffer);
  }

  const stat = fs.statSync(finalPdfPath);
  console.log(`Official 4-Page Brochure successfully generated at: ${finalPdfPath} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch(err => {
  console.error('Error generating official brochure:', err);
  process.exit(1);
});
