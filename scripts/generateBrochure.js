import { execSync } from 'child_process';
import path from 'path';

console.log('Running official brochure generator...');
execSync('node ' + path.resolve('scripts/buildOfficialBrochure.js'), { stdio: 'inherit' });


const pageWidth = 210;
const pageHeight = 297;
const margin = 14;
const contentWidth = pageWidth - margin * 2;

// Colors
const brandGreen = [10, 54, 34]; // #0A3622
const brandGold = [212, 175, 55]; // #D4AF37
const darkGold = [140, 109, 50];
const textDark = [30, 41, 59];
const textMuted = [100, 116, 139];
const cardBg = [248, 250, 252];
const emeraldBg = [236, 253, 245];
const amberBg = [254, 243, 199];

// Helper Header
function drawHeader(pageTitle) {
  doc.setFillColor(...brandGreen);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFillColor(...brandGold);
  doc.rect(0, 28, pageWidth, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('AURUM PROPERTIES', margin, 12);

  doc.setFontSize(9);
  doc.setTextColor(...brandGold);
  doc.text('PREMIUM LAND DEVELOPMENT • TAMIL NADU', margin, 19);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(pageTitle, pageWidth - margin, 18, { align: 'right' });
}

function drawFooter(pageNum, totalPages) {
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...textMuted);
  doc.text('Aurum Properties • info.aurumproperties@gmail.com • +91 7397395529 • www.aurumproperties.in', margin, pageHeight - 8);
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
}

// ================= PAGE 1 =================
drawHeader('PROJECT BROCHURE');

let y = 38;

// Project Title Block
doc.setFont('helvetica', 'bold');
doc.setFontSize(22);
doc.setTextColor(...brandGreen);
doc.text('SRE NAGAR EXTENSION', margin, y);

y += 7;
doc.setFontSize(12);
doc.setTextColor(...darkGold);
doc.text('MUTHAMPALAYAM, ERODE', margin, y);

y += 8;
// Badge Badges
doc.setFillColor(...emeraldBg);
doc.setDrawColor(167, 243, 208);
doc.roundedRect(margin, y, 48, 7, 2, 2, 'FD');
doc.setFontSize(8);
doc.setFont('helvetica', 'bold');
doc.setTextColor(6, 95, 70);
doc.text('DTCP APPROVED LAYOUT', margin + 24, y + 4.8, { align: 'center' });

doc.setFillColor(...amberBg);
doc.setDrawColor(253, 230, 138);
doc.roundedRect(margin + 52, y, 62, 7, 2, 2, 'FD');
doc.setTextColor(146, 64, 14);
doc.text('RERA NO: TN/10/LAYOUT/2024', margin + 52 + 31, y + 4.8, { align: 'center' });

doc.setFillColor(239, 246, 255);
doc.setDrawColor(191, 219, 254);
doc.roundedRect(margin + 118, y, 64, 7, 2, 2, 'FD');
doc.setTextColor(30, 64, 175);
doc.text('BANK LOAN SANCTION: 80% - 90%', margin + 118 + 32, y + 4.8, { align: 'center' });

y += 13;

// Pricing & Plot Specs Banner (NO CENTS, PURE SQ.FT)
doc.setFillColor(...brandGreen);
doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'F');

doc.setTextColor(...brandGold);
doc.setFontSize(10);
doc.setFont('helvetica', 'bold');
doc.text('EXCLUSIVE RESIDENTIAL PLOT RATES (BY SQ.FT)', margin + 8, y + 8);

doc.setTextColor(255, 255, 255);
doc.setFontSize(9);
doc.setFont('helvetica', 'normal');
doc.text('Total Layout: 19 Premium Demarcated Plots', margin + 8, y + 15);
doc.text('Road Infrastructure: 40 Feet Main Boulevard & 30 Feet Cross Roads', margin + 8, y + 21);
doc.text('Plot Sizes: Available from 1,200 Sq.Ft to 2,400 Sq.Ft', margin + 8, y + 27);

// North & South Rate Highlights Box on right
doc.setFillColor(255, 255, 255);
doc.roundedRect(margin + contentWidth - 78, y + 5, 72, 24, 2, 2, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(...brandGreen);
doc.text('NORTH FACING (7 PLOTS)', margin + contentWidth - 74, y + 11);
doc.setTextColor(180, 83, 9);
doc.setFontSize(11);
doc.text('Rs. 3,299 / Sq.Ft', margin + contentWidth - 74, y + 16);

doc.setFontSize(8);
doc.setTextColor(...brandGreen);
doc.text('SOUTH FACING (12 PLOTS)', margin + contentWidth - 74, y + 22);
doc.setTextColor(5, 150, 105);
doc.setFontSize(11);
doc.text('Rs. 2,999 / Sq.Ft', margin + contentWidth - 74, y + 27);

y += 40;

// Embed Project Image if available
const imagePath = path.resolve('src/assets/images/sre_nagar_erode_1791374287268.jpg');
if (fs.existsSync(imagePath)) {
  const imgData = fs.readFileSync(imagePath);
  const base64Img = 'data:image/jpeg;base64,' + imgData.toString('base64');
  try {
    doc.addImage(base64Img, 'JPEG', margin, y, contentWidth, 75);
    doc.setDrawColor(...brandGold);
    doc.rect(margin, y, contentWidth, 75);
    y += 80;
  } catch (e) {
    y += 5;
  }
} else {
  y += 5;
}

// Project Overview Narrative
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.setTextColor(...brandGreen);
doc.text('PROJECT OVERVIEW', margin, y);
y += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...textDark);
const overviewText = "SRE NAGAR EXTENSION is an esteemed DTCP-approved and RERA-registered plotted residential layout situated in the flourishing urban enclave of Muthampalayam, Erode. Planned exclusively for premium villa homes, this boutique community contains exactly 19 demarcated plots with transparent pricing purely by square feet: 7 North-facing plots at Rs. 3,299/Sq.Ft and 12 South-facing plots at Rs. 2,999/Sq.Ft. Connected by wide 40ft and 30ft tar roadways, copious sweet potable groundwater, underground storm drainage, and pre-approved 80%-90% bank loan sanctions from leading nationalized and private banks, this community delivers peaceful residential living with all major urban infrastructure within 5 KM.";
const splitOverview = doc.splitTextToSize(overviewText, contentWidth);
doc.text(splitOverview, margin, y);
y += splitOverview.length * 4.2 + 6;

// Key Amenities Grid
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...brandGreen);
doc.text('LAYOUT AMENITIES & INFRASTRUCTURE', margin, y);
y += 6;

const amenities = [
  "DTCP Approved & RERA Registered Layout",
  "80% - 90% Bank Loan Approved (SBI, HDFC, ICICI)",
  "Heavy-duty 40ft Main & 30ft Cross Blacktop Roads",
  "Copious Sweet Natural Groundwater at Shallow Depth",
  "Underground Storm Drainage Network",
  "Energy-Efficient Solar LED Street Lighting",
  "Compounded Gated Community with Grand Entrance",
  "100% Clear Legal Title & Instant Patta Transfer"
];

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...textDark);
amenities.forEach((item, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const itemX = margin + col * (contentWidth / 2);
  const itemY = y + row * 6;
  doc.setFillColor(...brandGold);
  doc.circle(itemX + 1.5, itemY - 1, 1, 'F');
  doc.text(item, itemX + 4.5, itemY);
});

drawFooter(1, 2);

// ================= PAGE 2 =================
doc.addPage();
drawHeader('CONNECTIVITY & PLOT SCHEDULE');

y = 38;

// Easy Access & Prime Connectivity (<5 KM)
doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...brandGreen);
doc.text('EASY ACCESS & PRIME CONNECTIVITY (WITHIN 5 KM RADIUS)', margin, y);
y += 6;

const connectivityData = [
  { dest: "Muthampalayam Housing Unit / Perundurai Road Corridor", dist: "1.5 KM", time: "3 Mins", type: "Corridor" },
  { dest: "Erode Ring Road Bypass", dist: "2.0 KM", time: "4 Mins", type: "Highway" },
  { dest: "The Indian Public School (TIPS) & CS Academy", dist: "3.2 KM", time: "6 Mins", type: "Education" },
  { dest: "Lotus Hospital & Erode Trust Multi-Speciality Hospital", dist: "3.5 KM", time: "7 Mins", type: "Healthcare" },
  { dest: "Sudha Hospital & Care 24 Multi-speciality Hospital", dist: "4.2 KM", time: "8 Mins", type: "Healthcare" },
  { dest: "Kongu Arts & Science / Kongu Engineering Route", dist: "4.5 KM", time: "8 Mins", type: "Education" },
  { dest: "Erode Central Bus Stand & Erode Junction Railway Station", dist: "4.8 KM", time: "10 Mins", type: "Transit" },
  { dest: "Texvalley Mega Textile Mall & Commercial Hub", dist: "5.0 KM", time: "10 Mins", type: "Shopping" },
  { dest: "Local Markets, SBI / Canara / HDFC Banks & ATMs", dist: "800 M", time: "2 Mins", type: "Essentials" }
];

doc.setFillColor(...cardBg);
doc.setDrawColor(226, 232, 240);
doc.roundedRect(margin, y, contentWidth, 48, 2, 2, 'FD');

doc.setFontSize(7.5);
connectivityData.forEach((item, idx) => {
  const col = idx % 2;
  const row = Math.floor(idx / 2);
  const cx = margin + 4 + col * (contentWidth / 2);
  const cy = y + 5 + row * 9;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...brandGreen);
  doc.text(`[${item.type}]`, cx, cy);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textDark);
  doc.text(`${item.dest.slice(0, 36)}...`, cx + 18, cy);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkGold);
  doc.text(`${item.dist} (${item.time})`, cx + (contentWidth / 2) - 10, cy, { align: 'right' });
});

y += 54;

// Table of 19 Plots (PURELY IN SQ.FT, NO CENTS)
doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...brandGreen);
doc.text('TABLE OF 19 DEMARCATED PLOTS (PURE SQ.FT PRICING)', margin, y);
y += 6;

// Table Header
const colWidths = [18, 55, 30, 32, 25, 22];
const headers = ['Plot #', 'Orientation / Facing', 'Area (Sq.Ft)', 'Rate / Sq.Ft', 'Plot Price', 'Status'];

doc.setFillColor(...brandGreen);
doc.rect(margin, y, contentWidth, 7, 'F');
doc.setTextColor(255, 255, 255);
doc.setFont('helvetica', 'bold');
doc.setFontSize(7.5);

let curX = margin + 2;
headers.forEach((h, i) => {
  doc.text(h, curX, y + 4.8);
  curX += colWidths[i];
});

y += 7;

// 19 Plots Data (7 North @ 3299, 12 South @ 2999 - Plots 05 to 11 North Facing, all Available)
const plotsTable = [
  { id: "Plot 01", facing: "South Facing • 40ft Main Road", sqft: 1500, rate: 2999, price: "Rs. 44.98 L", status: "Available" },
  { id: "Plot 02", facing: "South Facing • 40ft Main Road", sqft: 1200, rate: 2999, price: "Rs. 35.98 L", status: "Available" },
  { id: "Plot 03", facing: "South Facing • 40ft Main Road", sqft: 1200, rate: 2999, price: "Rs. 35.98 L", status: "Available" },
  { id: "Plot 04", facing: "South Facing • 30ft Avenue", sqft: 1200, rate: 2999, price: "Rs. 35.98 L", status: "Available" },
  { id: "Plot 05", facing: "North Facing • 30ft Avenue", sqft: 1200, rate: 3299, price: "Rs. 39.58 L", status: "Available" },
  { id: "Plot 06", facing: "North Facing • Park Facing", sqft: 1350, rate: 3299, price: "Rs. 44.53 L", status: "Available" },
  { id: "Plot 07", facing: "North Facing • Corner Avenue", sqft: 1800, rate: 3299, price: "Rs. 59.38 L", status: "Available" },
  { id: "Plot 08", facing: "North Facing • 30ft Avenue", sqft: 1200, rate: 3299, price: "Rs. 39.58 L", status: "Available" },
  { id: "Plot 09", facing: "North Facing • 30ft Avenue", sqft: 1200, rate: 3299, price: "Rs. 39.58 L", status: "Available" },
  { id: "Plot 10", facing: "North Facing • 30ft Avenue", sqft: 1200, rate: 3299, price: "Rs. 39.58 L", status: "Available" },
  { id: "Plot 11", facing: "North Facing • 30ft Avenue", sqft: 1200, rate: 3299, price: "Rs. 39.58 L", status: "Available" },
  { id: "Plot 12", facing: "South Facing • 30ft Avenue", sqft: 1200, rate: 2999, price: "Rs. 35.98 L", status: "Available" },
  { id: "Plot 13", facing: "South Facing • 30ft Avenue", sqft: 1500, rate: 2999, price: "Rs. 44.98 L", status: "Available" },
  { id: "Plot 14", facing: "South Facing • 30ft Avenue", sqft: 1500, rate: 2999, price: "Rs. 44.98 L", status: "Available" },
  { id: "Plot 15", facing: "South Facing • 30ft Avenue", sqft: 1500, rate: 2999, price: "Rs. 44.98 L", status: "Available" },
  { id: "Plot 16", facing: "South Facing • 40ft Main Road", sqft: 1800, rate: 2999, price: "Rs. 53.98 L", status: "Available" },
  { id: "Plot 17", facing: "South Facing • 40ft Main Road", sqft: 1800, rate: 2999, price: "Rs. 53.98 L", status: "Available" },
  { id: "Plot 18", facing: "South Facing • Prime Villa Plot", sqft: 2100, rate: 2999, price: "Rs. 62.97 L", status: "Available" },
  { id: "Plot 19", facing: "South Facing • Corner Villa Plot", sqft: 2400, rate: 2999, price: "Rs. 71.97 L", status: "Available" }
];

doc.setFont('helvetica', 'normal');
doc.setFontSize(7);

plotsTable.forEach((p, idx) => {
  const rowY = y + idx * 5.2;
  const isEven = idx % 2 === 0;

  doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
  doc.rect(margin, rowY, contentWidth, 5.2, 'F');
  doc.setDrawColor(241, 245, 249);
  doc.line(margin, rowY + 5.2, margin + contentWidth, rowY + 5.2);

  let px = margin + 2;

  // Plot #
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...brandGreen);
  doc.text(p.id, px, rowY + 3.8);
  px += colWidths[0];

  // Facing
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textDark);
  doc.text(p.facing, px, rowY + 3.8);
  px += colWidths[1];

  // Area Sq.Ft
  doc.text(`${p.sqft.toLocaleString()} Sq.Ft`, px, rowY + 3.8);
  px += colWidths[2];

  // Rate
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(p.rate === 3299 ? 180 : 5, p.rate === 3299 ? 83 : 150, p.rate === 3299 ? 9 : 105);
  doc.text(`Rs. ${p.rate}/Sq.Ft`, px, rowY + 3.8);
  px += colWidths[3];

  // Price
  doc.setTextColor(...textDark);
  doc.text(p.price, px, rowY + 3.8);
  px += colWidths[4];

  // Status
  if (p.status === 'Available') {
    doc.setTextColor(6, 95, 70);
  } else if (p.status === 'Reserved') {
    doc.setTextColor(180, 83, 9);
  } else {
    doc.setTextColor(156, 163, 175);
  }
  doc.text(p.status, px, rowY + 3.8);
});

y += plotsTable.length * 5.2 + 8;

// Approved Banking Partners Banner
doc.setFillColor(239, 246, 255);
doc.setDrawColor(191, 219, 254);
doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(30, 64, 175);
doc.text('APPROVED BANK LOAN PARTNERS (80% - 90% SANCTION):', margin + 4, y + 5);

doc.setFont('helvetica', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(...textDark);
doc.text('State Bank of India (SBI) • HDFC Bank • ICICI Bank • Canara Bank • Axis Bank • LIC Housing Finance', margin + 4, y + 10);

drawFooter(2, 2);

// Output to public folder
const outputPath = path.resolve('public/Aurum-Sre-Nagar-Extension-Brochure.pdf');
const pdfOutput = doc.output('arraybuffer');
fs.writeFileSync(outputPath, Buffer.from(pdfOutput));

console.log('PDF generated successfully at:', outputPath);
