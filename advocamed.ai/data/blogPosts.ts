import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: "how-to-dispute-medical-bill-errors",
    title: "How to Dispute Medical Bills in 5 Easy Steps (and Win)",
    excerpt: "Learn how to dispute medical bills and catch common medical bill errors. This step-by-step guide covers requesting an itemized bill, writing an appeal, and escalating to the CFPB.",
    date: "2026-01-15",
    readingTime: "7 min read",
    category: "Actionable Guides",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-700">
        Finding an error on your medical bill is frustrating, but it is extremely common. Estimates suggest up to <strong>80% of medical bills contain errors</strong>. The good news is that you have a legal right to dispute them.
      </p>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">Step 1: Don't Pay (Yet)</h2>
      <p class="mb-4 text-gray-700">
        As soon as you spot an error, pause. Do not pay the bill, as it is much harder to get a refund than to fix an unpaid bill. Call the billing department and tell them:
      </p>
      <blockquote class="border-l-4 border-primary pl-4 italic text-gray-800 text-lg my-6">
        "I am disputing specific charges on account #12345. Please place a hold on my account so it does not go to collections while we resolve this."
      </blockquote>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">Step 2: Gather Your Evidence</h2>
      <p class="mb-4 text-gray-700">
        You cannot win a dispute with feelings; you need facts. Collect these documents:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-8">
        <li><strong>The Itemized Bill:</strong> The detailed list of services (ask for this immediately).</li>
        <li><strong>Medical Records:</strong> Request the doctor's notes for that date of service. If the notes say "30 minutes" but the bill says "60 minutes," you win.</li>
        <li><strong>Explanation of Benefits (EOB):</strong> Ensure your insurance actually denied the claim before you pay.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">Step 3: Send a Written Dispute</h2>
      <p class="mb-4 text-gray-700">
        Phone calls are good, but paper trails are better. Send a certified letter to the billing department. Include copies (not originals) of your evidence.
      </p>
      
      <div class="bg-blue-50 p-6 rounded-xl my-8 border border-blue-100">
        <h3 class="font-bold text-blue-900 mb-2">Need a Template?</h3>
        <p class="text-sm text-blue-800 mb-4">AdvocaMed's AI can write a professional dispute letter for you in seconds based on your specific bill.</p>
        <button data-action="scan" class="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition-colors">Generate Dispute Letter</button>
      </div>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">Step 4: Escalate to Insurance</h2>
      <p class="mb-4 text-gray-700">
        If the hospital refuses to correct the error, call your insurance company's "Member Services" number. Tell them: "My provider is billing me for services that were not performed. This may be billing fraud." Insurance companies hate overpaying as much as you do.
      </p>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">Step 5: File a Consumer Complaint (CFPB)</h2>
      <p class="mb-4 text-gray-700">
        If all else fails, file a complaint with the <strong>Consumer Financial Protection Bureau (CFPB)</strong> or your state's Attorney General. This often forces hospitals to respond quickly to avoid regulatory scrutiny.
      </p>
    `
  },
  {
    id: "explanation-of-benefits-guide",
    title: "What is an Explanation of Benefits (EOB)? It's Not a Bill.",
    excerpt: "The EOB is the most confusing document in healthcare. Learn how to read it, spot 'Patient Responsibility', and why it doesn't match your final bill.",
    date: "2026-01-10",
    readingTime: "5 min read",
    category: "Insurance Basics",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-700">
        You open your mail and see a document that looks exactly like a bill. It lists thousands of dollars in charges. But in big bold letters, it says: <strong>"THIS IS NOT A BILL."</strong>
      </p>
      <p class="mb-6 text-gray-700">
        This is your Explanation of Benefits (EOB). Understanding it is the key to stopping overcharges before they happen.
      </p>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">Decoding the Grid</h2>
      <p class="mb-4 text-gray-700">
        Every EOB has a grid of numbers. Here is what they actually mean:
      </p>

      <div class="overflow-x-auto mb-8">
        <table class="min-w-full bg-white border border-gray-200 text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-3 text-left">Term</th>
              <th class="py-2 px-3 text-left">Translation</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr>
              <td class="py-2 px-3 font-bold text-gray-900">Billed Amount</td>
              <td class="py-2 px-3">The "fantasy price" the doctor charged. Nobody pays this.</td>
            </tr>
            <tr>
              <td class="py-2 px-3 font-bold text-gray-900">Allowed Amount</td>
              <td class="py-2 px-3">The negotiated rate your insurance agreed to pay. <span class="text-green-600 font-bold">This is the real price.</span></td>
            </tr>
            <tr>
              <td class="py-2 px-3 font-bold text-gray-900">Not Covered</td>
              <td class="py-2 px-3">Amounts your insurance refused to pay. Watch out for this!</td>
            </tr>
            <tr>
              <td class="py-2 px-3 font-bold text-primary">Patient Responsibility</td>
              <td class="py-2 px-3">The amount you actually owe (Deductible + Co-pay).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">The "Denial Code" Secret</h2>
      <p class="mb-4 text-gray-700">
        If the "Not Covered" column isn't zero, look for a tiny code at the bottom of the page (e.g., CO-45, PR-96). These are denial codes.
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-8">
        <li><strong>Timely Filing Limit:</strong> The doctor sent the bill too late. You do NOT owe this.</li>
        <li><strong>Medical Necessity:</strong> The insurance thinks the treatment wasn't needed. Your doctor needs to appeal this, not you.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">EOB vs. The Bill</h2>
      <p class="mb-4 text-gray-700">
        Compare your EOB to the bill you get from the hospital.
      </p>
      <div class="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
        <p class="font-bold text-red-900">Golden Rule:</p>
        <p class="text-red-800">If the hospital bill is HIGHER than the "Patient Responsibility" on your EOB, the hospital is wrong. Pay only what the EOB says.</p>
      </div>
    `
  },
  {
    id: "medical-bill-negotiation-scripts",
    title: "Medical Bill Negotiation Scripts: Exactly What to Say to Save Money",
    excerpt: "Don't know what to say to the billing department? Use these 3 proven scripts to negotiate discounts, set up payment plans, and remove hidden fees.",
    date: "2026-01-02",
    readingTime: "6 min read",
    category: "Actionable Guides",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-700">
        Talking to a hospital billing department is intimidating. But remember: <strong>medical bills are negotiable</strong>. Hospitals would rather get paid <em>something</em> now than sell your debt to a collector for pennies later.
      </p>

      <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mb-8">
        <strong>Pro Tip:</strong> Always be polite but firm. Write down the name of the person you speak with and the "Call Reference Number".
      </div>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">Script 1: The "Lump Sum" Offer</h2>
      <p class="mb-4 text-gray-700">
        Use this if you have some savings and want the bill gone immediately. Hospitals often accept 20-40% less for cash upfront.
      </p>
      <div class="bg-gray-100 p-6 rounded-xl font-mono text-sm text-gray-800 border border-gray-300 shadow-inner">
        <p><strong>You:</strong> "Hi, I'm looking at my bill for account #12345. The total is $2,000."</p>
        <p class="mt-2"><strong>You:</strong> "I want to pay this off, but I can't afford the full amount. However, I can pay <strong>$1,400 right now</strong> over the phone if we can consider the debt settled in full."</p>
        <p class="mt-2"><strong>Agent:</strong> "We can't do that."</p>
        <p class="mt-2"><strong>You:</strong> "I understand. Is there a supervisor who has the authority to approve a lump-sum settlement? Otherwise, I'll have to set up a very long-term payment plan."</p>
      </div>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">Script 2: The "Cash Price" Check</h2>
      <p class="mb-4 text-gray-700">
        Often, the "insured" rate is higher than the cash price. This script exposes that discrepancy.
      </p>
      <div class="bg-gray-100 p-6 rounded-xl font-mono text-sm text-gray-800 border border-gray-300 shadow-inner">
        <p><strong>You:</strong> "I noticed I was charged $500 for this X-ray. I checked your price transparency file online, and the cash price for CPT code 74018 is only $150."</p>
        <p class="mt-2"><strong>You:</strong> "Why am I being penalized for using insurance? I would like my bill adjusted to match the fair cash price."</p>
      </div>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">Script 3: Requesting an Audit</h2>
      <p class="mb-4 text-gray-700">
        Use this when the bill looks vague (e.g., "Pharmacy - $5,000").
      </p>
      <div class="bg-gray-100 p-6 rounded-xl font-mono text-sm text-gray-800 border border-gray-300 shadow-inner">
        <p><strong>You:</strong> "I've received a summary bill, but I cannot verify the charges. I am formally requesting a full <strong>Itemized Statement (UB-04 form)</strong> with all CPT codes."</p>
        <p class="mt-2"><strong>You:</strong> "Please place a hold on my account so it does not go to collections while I review these charges for accuracy."</p>
      </div>

      <div class="mt-12 bg-blue-600 text-white p-8 rounded-2xl text-center">
        <h3 class="text-xl font-bold mb-2">Ready to take action?</h3>
        <p class="mb-6">Analyze your bill now to find specific discrepancies for negotiation.</p>
        <button data-action="scan" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
          Start Free Analysis
        </button>
      </div>
    `
  },
  {
    id: "how-to-apply-charity-care-2025",
    title: "How to Apply for Hospital Charity Care in 2025: The Ultimate Guide",
    excerpt: "Don't pay that bill yet. Nonprofit hospitals are required by law to forgive bills for eligible patients. See the 2025 income limits and apply today.",
    date: "2025-12-27",
    readingTime: "5 min read",
    category: "Financial Aid",
    content: `
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <p class="font-bold text-blue-900">Key Takeaway</p>
        <p class="text-blue-800 text-sm">Under the Affordable Care Act, nonprofit hospitals must provide free or discounted care. If you make less than $30,000 (individual) or $60,000 (family of 4), you likely qualify.</p>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-gray-700">
        Medical debt is a crisis in the United States, but many patients are unaware of a powerful tool called <strong>Charity Care</strong> (or Financial Assistance). Here is exactly how to navigate the process in 2025.
      </p>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">1. Do You Qualify? (2025 Income Limits)</h2>
      <p class="mb-4 text-gray-700">
        Most hospitals base eligibility on the <strong>Federal Poverty Level (FPL)</strong>. Use the table below to see where you stand.
      </p>

      <div class="overflow-x-auto mb-8">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-3 px-4 text-left font-semibold text-gray-600">Family Size</th>
              <th class="py-3 px-4 text-left font-semibold text-gray-600">100% FPL (Free Care)</th>
              <th class="py-3 px-4 text-left font-semibold text-gray-600">200% FPL (Discount)</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="border-b">
              <td class="py-3 px-4">1 Person</td>
              <td class="py-3 px-4">$15,060</td>
              <td class="py-3 px-4">$30,120</td>
            </tr>
            <tr class="border-b bg-gray-50">
              <td class="py-3 px-4">2 People</td>
              <td class="py-3 px-4">$20,440</td>
              <td class="py-3 px-4">$40,880</td>
            </tr>
            <tr class="border-b">
              <td class="py-3 px-4">3 People</td>
              <td class="py-3 px-4">$25,820</td>
              <td class="py-3 px-4">$51,640</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="py-3 px-4">4 People</td>
              <td class="py-3 px-4">$31,200</td>
              <td class="py-3 px-4">$62,400</td>
            </tr>
          </tbody>
        </table>
        <p class="text-xs text-gray-500 mt-2">*Estimated 2025 figures based on inflation trends.</p>
      </div>

      <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">2. The "Hidden" Application Rule</h2>
      <p class="mb-4 text-gray-700">
        Hospitals often bury these applications deep on their websites. You need to look for the "501(r) Financial Assistance Policy".
      </p>
      
      <div class="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl my-8 border border-indigo-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div class="flex-1">
          <h3 class="font-bold text-indigo-900 text-lg mb-1">Stop searching manually</h3>
          <p class="text-sm text-indigo-800">AdvocaMed's AI scanner instantly checks your bill against thousands of hospital policies.</p>
        </div>
        <button data-action="scan" class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md whitespace-nowrap">
          Scan Bill Now
        </button>
      </div>
    `
  }
];
