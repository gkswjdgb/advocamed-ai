import fs from 'fs';

let content = fs.readFileSync('data/blogPosts.ts', 'utf8');

const referenceHtml = `
    <div class="border-t border-blue-200/50 pt-4 mt-4">
      <h4 class="text-sm font-bold text-gray-900 mb-2">Authoritative References:</h4>
      <ul class="list-disc pl-5 text-sm text-gray-600 space-y-1">
        <li><a href="https://www.cms.gov/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Centers for Medicare & Medicaid Services (CMS)</a> - Official federal data.</li>
        <li><a href="https://www.irs.gov/charities-non-profits/charitable-organizations/requirements-for-501c3-hospitals-under-the-affordable-care-act-section-501r" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">IRS Section 501(r) Guidelines</a> - Hospital financial assistance mandates.</li>
      </ul>
    </div>
  </div>
`;

content = content.replace(/<\/p>\n\s*<\/div>\n\s*`/g, '</p>' + referenceHtml + '`');

fs.writeFileSync('data/blogPosts.ts', content);
console.log('Fixed References added!');
