import { Hospital } from '../types';

export const hospitals: Hospital[] = [
  {
    slug: "texas-health-resources",
    name: "Texas Health Resources",
    city: "Arlington",
    state: "TX",
    fpl_cutoff: 400,
    policy_summary: "Texas Health Resources offers 100% charity care for patients earning up to 200% of the Federal Poverty Level (FPL). Patients earning between 200% and 400% FPL are eligible for discounted care (partial write-offs).",
    financial_aid_url: "https://www.texashealth.org/Financial-Assistance"
  },
  {
    slug: "cleveland-clinic",
    name: "Cleveland Clinic",
    city: "Cleveland",
    state: "OH",
    fpl_cutoff: 400,
    policy_summary: "One of the most generous policies in the US. Cleveland Clinic provides free care for families earning up to 250% of the federal poverty guidelines and discounted care up to 400%.",
    financial_aid_url: "https://my.clevelandclinic.org/patients/billing-finance/financial-assistance"
  },
  {
    slug: "kaiser-permanente",
    name: "Kaiser Permanente",
    city: "Oakland",
    state: "CA",
    fpl_cutoff: 350,
    policy_summary: "Kaiser Permanente's MFA (Medical Financial Assistance) program covers low-income patients with incomes up to 350% FPL in most regions, offering subsidized premiums and lower copays.",
    financial_aid_url: "https://about.kaiserpermanente.org/commitments-and-impact/healthy-communities/medical-financial-assistance-program"
  }
];
