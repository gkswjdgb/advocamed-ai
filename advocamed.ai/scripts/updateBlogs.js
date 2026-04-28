import fs from 'fs';

let content = fs.readFileSync('data/blogPosts.ts', 'utf8');

// Function to generate an engaging title
function makeEngagingTitle(title) {
    if (title.includes('Itemized Bill')) return "Top 5 Mistakes When Requesting an NYP Itemized Bill (2026 Strategy)";
    if (title.includes('Penn Medicine Charity Care')) return "Qualifying for a $0 Penn Medicine Bill: The 2026 Hidden Guidelines";
    if (title.includes('Emory Healthcare Financial Assistance')) return "Emory Healthcare Charity Care 2026: Bypass the Application Trap";
    if (title.includes('Houston Methodist Case Study')) return "Houston Methodist Medical Billing: How to Dispute a $5,000 Upcharge";
    if (title.includes('CMS 2026 Update: Why')) return "CMS Price Transparency 2026: Forcing Your Hospital to Share Actual Rates";
    if (title.includes('2026 Charity Care Guide: Do You')) return "The Middle-Class Guide to Charity Care (2026): Erasing Medical Debt";
    if (title.includes('Avoiding \'AI-Only Denials\'')) return "AI-Only Denials in 2026: Why Insurers Auto-Reject and How to Win";
    if (title.includes('5-Minute Medical Bill Dispute')) return "The 5-Minute Medical Dispute Template That Erased $3,400 in 2026";
    if (title.includes('Negotiating with Medical Debt Collectors')) return "Debt Collector Negotiation 2026: The 'Pay-for-Delete' Strategy";
    if (title.includes('Trump’s 2026 Healthcare Plan')) return "2026 Healthcare Price Transparency: Leveraging New Federal Mandates";
    return title;
}

// Function to generate engaging excerpt
function makeEngagingExcerpt(excerpt) {
    if (excerpt.includes('NYP')) return "Discover the specific 1-866 script that forces NYP to send an itemized CPT statement and stops collections instantly in 2026.";
    if (excerpt.includes('Penn Medicine')) return "Earning up to $165,000 as a family of four? You might qualify for Penn Medicine's expanded 2026 financial forgiveness pool. Learn how.";
    if (excerpt.includes('Emory')) return "Avoid the number one mistake patients make on the Emory application PDF that results in an automatic system denial.";
    if (excerpt.includes('Texas SB 490')) return "We analyze a real 2026 Houston Methodist billing dispute and how citing Texas SB 490 legally halted debt collection.";
    if (excerpt.includes('CMS')) return "Estimates are dead. Learn how to demand your 'Actual Allowed Amount' under 2026 CMS transparency rules.";
    return excerpt;
}

const insightTemplate = (title) => `
  <div class="mt-8 bg-blue-50/50 p-6 rounded-xl border border-blue-100">
    <h3 class="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary">person_check</span>
      Professional Insight from Dr. Chen
    </h3>
    <p class="text-gray-700 italic text-sm leading-relaxed mb-4">
      As a biotech architect, I constantly see the friction between clinical reality and hospital billing algorithms. Topics like "${title.substring(0, 30)}..." expose exactly why we need raw data transparency. By understanding the systemic codes beneath your specific bill, you can break through the automated barriers designed to maximize hospital yield at your expense.
    </p>
    <div class="border-t border-blue-200/50 pt-4 mt-4">
      <h4 class="text-sm font-bold text-gray-900 mb-2">Authoritative References:</h4>
      <ul class="list-disc pl-5 text-sm text-gray-600 space-y-1">
        <li><a href="https://www.cms.gov/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Centers for Medicare & Medicaid Services (CMS)</a> - Official federal data.</li>
        <li><a href="https://www.irs.gov/charities-non-profits/charitable-organizations/requirements-for-501c3-hospitals-under-the-affordable-care-act-section-501r" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">IRS Section 501(r) Guidelines</a> - Hospital financial assistance mandates.</li>
      </ul>
    </div>
  </div>
`;

// Simple regex to match each object in the array and replace it
let matches = 0;

content = content.replace(/title:\s*"([^"]+)",/g, (match, p1) => {
    return `title: "${makeEngagingTitle(p1)}",`;
});

content = content.replace(/excerpt:\s*"([^"]+)",/g, (match, p1) => {
    return `excerpt: "${makeEngagingExcerpt(p1)}",`;
});

// For content, find the last ` before the end of the object.
// A regex to find content: `...`
content = content.replace(/content:\s*\`([\s\S]*?)\`/g, (match, p1) => {
    const titleMatch = p1.substring(0, 100); // just grab some string to hash or just put generic
    return `content: \`${p1}${insightTemplate("this medical billing topic")}\``;
});

fs.writeFileSync('data/blogPosts.ts', content);
console.log('Done!');
