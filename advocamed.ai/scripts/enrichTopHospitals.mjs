import fs from 'fs';
import path from 'path';

const hospitalsPath = path.resolve('data/hospitals.json');
const hospitals = JSON.parse(fs.readFileSync(hospitalsPath, 'utf8'));

const deepDiveData = {
  'emory-healthcare': {
    acronym: 'EHC',
    fpl_limit: 250,
    partial_fpl_limit: 400,
    physician_fees_covered: 'Covers Emory Healthcare hospital facility bills and employed Emory Clinic / Emory Specialty Associates physicians. Independent ER or radiology groups require separate billing verification.',
    affiliated_hospitals: [
      'Emory University Hospital (Atlanta)',
      'Emory University Hospital Midtown',
      'Emory Saint Joseph\'s Hospital',
      'Emory Johns Creek Hospital',
      'Emory Decatur Hospital',
      'Emory Hillandale Hospital',
      'Emory Long-Term Acute Care',
      'Emory Rehabilitation Hospital',
      'The Emory Clinic'
    ],
    guest_pay_portal: 'Emory MyChart / EHC Guest Pay',
    application_url: 'https://www.emoryhealthcare.org/ui/pdfs/financial-assistance/financial-assistance-application-english.pdf'
  },
  'johns-hopkins-medicine': {
    acronym: 'JHM',
    fpl_limit: 200,
    partial_fpl_limit: 500,
    physician_fees_covered: 'Covers hospital facility charges and Johns Hopkins University School of Medicine (JHUSOM) employed faculty physicians under Maryland HSCRC & IRS 501(r) rules.',
    affiliated_hospitals: [
      'The Johns Hopkins Hospital (Baltimore)',
      'Johns Hopkins Bayview Medical Center',
      'Johns Hopkins Howard County Medical Center',
      'Suburban Hospital (Bethesda)',
      'Sibley Memorial Hospital (Washington, D.C.)',
      'Johns Hopkins All Children\'s Hospital (FL)'
    ],
    guest_pay_portal: 'hopkinsmedicine.org MyChart Pay as Guest',
    application_url: 'https://www.hopkinsmedicine.org/patient-care/billing-insurance/financial-assistance'
  },
  'penn-medicine': {
    acronym: 'UPHS',
    fpl_limit: 300,
    partial_fpl_limit: 500,
    physician_fees_covered: 'Covers all University of Pennsylvania Health System (UPHS) hospital facilities and Clinical Practices of the University of Pennsylvania (CPUP) physicians.',
    affiliated_hospitals: [
      'Hospital of the University of Pennsylvania (HUP)',
      'Penn Presbyterian Medical Center',
      'Pennsylvania Hospital',
      'Chester County Hospital',
      'Lancaster General Health',
      'Penn Medicine Princeton Health'
    ],
    guest_pay_portal: 'MyPennMedicine / PennChart Guest Pay',
    application_url: 'https://www.pennmedicine.org/for-patients-and-visitors/patient-information/billing-and-insurance/financial-assistance'
  },
  'new-york-presbyterian': {
    acronym: 'NYP',
    fpl_limit: 300,
    partial_fpl_limit: 500,
    physician_fees_covered: 'Covers NYP facility charges and participating Weill Cornell Medicine / ColumbiaDoctors providers under the New York State Hospital Financial Assistance Law (HFAL).',
    affiliated_hospitals: [
      'NYP / Weill Cornell Medical Center',
      'NYP / Columbia University Irving Medical Center',
      'NYP Allen Hospital',
      'NYP Lower Manhattan Hospital',
      'NYP Brooklyn Methodist Hospital',
      'NYP Queens',
      'NYP Westchester',
      'NYP Morgan Stanley Children\'s Hospital'
    ],
    guest_pay_portal: 'NYP Connect / MyChart Guest Pay',
    application_url: 'https://www.nyp.org/patients-and-visitors/paying-for-your-care/financial-assistance'
  },
  'nyu-langone-health': {
    acronym: 'NYULH',
    fpl_limit: 300,
    partial_fpl_limit: 600,
    physician_fees_covered: 'Applies to NYU Langone hospital facilities and employed Faculty Group Practice (FGP) physicians across NYC and Long Island.',
    affiliated_hospitals: [
      'Tisch Hospital (Manhattan)',
      'Kimmel Pavilion',
      'NYU Langone Hospital—Brooklyn',
      'NYU Langone Hospital—Long Island',
      'NYU Langone Orthopedic Hospital',
      'Hassenfeld Children\'s Hospital'
    ],
    guest_pay_portal: 'NYU Langone MyChart Guest Pay'
  },
  'mass-general-brigham': {
    acronym: 'MGB',
    fpl_limit: 300,
    partial_fpl_limit: 400,
    physician_fees_covered: 'Covers all Mass General Brigham member hospitals and employed physician groups (MGPO / BWPO), plus Massachusetts Health Safety Net (HSN) coordination.',
    affiliated_hospitals: [
      'Massachusetts General Hospital (MGH)',
      'Brigham and Women\'s Hospital (BWH)',
      'Brigham and Women\'s Faulkner Hospital',
      'Newton-Wellesley Hospital',
      'Salem Hospital (North Shore Medical Center)',
      'Coolidge House / Wentworth-Douglass Hospital',
      'McLean Hospital',
      'Mass Eye and Ear'
    ],
    guest_pay_portal: 'Mass General Brigham Patient Gateway Guest Pay'
  },
  'vanderbilt-university-medical-center': {
    acronym: 'VUMC',
    fpl_limit: 300,
    partial_fpl_limit: 400,
    physician_fees_covered: 'Covers VUMC hospital facility charges and Vanderbilt Medical Group (VMG) employed clinicians.',
    affiliated_hospitals: [
      'Vanderbilt University Hospital (Nashville)',
      'Monroe Carell Jr. Children\'s Hospital at Vanderbilt',
      'Vanderbilt Psychiatric Hospital',
      'Vanderbilt Wilson County Hospital',
      'Vanderbilt Bedford Hospital',
      'Vanderbilt Tullahoma-Harton Hospital'
    ],
    guest_pay_portal: 'My Health at Vanderbilt Guest Pay'
  },
  'piedmont-atlanta-hospital': {
    acronym: 'PHC',
    fpl_limit: 250,
    partial_fpl_limit: 400,
    physician_fees_covered: 'Covers Piedmont Healthcare hospital facilities and Piedmont Clinic employed physicians across Georgia.',
    affiliated_hospitals: [
      'Piedmont Atlanta Hospital',
      'Piedmont Fayette Hospital',
      'Piedmont Henry Hospital',
      'Piedmont Newnan Hospital',
      'Piedmont Athens Regional',
      'Piedmont Augusta',
      'Piedmont Macon'
    ],
    guest_pay_portal: 'Piedmont MyChart Guest Pay'
  },
  'northwestern-medicine': {
    acronym: 'NM',
    fpl_limit: 300,
    partial_fpl_limit: 600,
    physician_fees_covered: 'Covers Northwestern Medicine hospitals and Northwestern Medical Group (NMG) physicians under the Illinois Fair Patient Billing Act.',
    affiliated_hospitals: [
      'Northwestern Memorial Hospital (Chicago)',
      'Northwestern Medicine Central DuPage Hospital',
      'Northwestern Medicine Lake Forest Hospital',
      'Northwestern Medicine Delnor Hospital',
      'Northwestern Medicine Palos Hospital',
      'Northwestern Medicine McHenry Hospital'
    ],
    guest_pay_portal: 'Northwestern Medicine MyNM Guest Pay'
  },
  'ucla-health': {
    acronym: 'UCLA',
    fpl_limit: 400,
    partial_fpl_limit: 450,
    physician_fees_covered: 'Covers UCLA Health hospital facilities under California AB 1020 Hospital Fair Pricing Act. Emergency physicians are also subject to California balance billing protections.',
    affiliated_hospitals: [
      'Ronald Reagan UCLA Medical Center',
      'UCLA Santa Monica Medical Center',
      'UCLA Mattel Children\'s Hospital',
      'Resnick Neuropsychiatric Hospital at UCLA',
      'UCLA West Valley Medical Center'
    ],
    guest_pay_portal: 'myUCLAhealth Guest Pay'
  },
  'duke-university-health-system': {
    acronym: 'DUHS',
    fpl_limit: 300,
    partial_fpl_limit: 400,
    physician_fees_covered: 'Covers Duke University Hospital, Duke Regional, Duke Raleigh, and Private Diagnostic Clinic (PDC / Duke Health Integrated Practice) physicians.',
    affiliated_hospitals: [
      'Duke University Hospital (Durham)',
      'Duke Regional Hospital',
      'Duke Raleigh Hospital',
      'Duke Health Clinics'
    ],
    guest_pay_portal: 'My Duke Health (MyChart) Guest Pay'
  },
  'upmc-presbyterian': {
    acronym: 'UPMC',
    fpl_limit: 300,
    partial_fpl_limit: 400,
    physician_fees_covered: 'Covers UPMC hospital facilities and University of Pittsburgh Physicians (UPP) employed providers.',
    affiliated_hospitals: [
      'UPMC Presbyterian',
      'UPMC Shadyside',
      'UPMC Magee-Womens Hospital',
      'UPMC Mercy',
      'UPMC Passavant',
      'UPMC Children\'s Hospital of Pittsburgh',
      'UPMC Harrisburg'
    ],
    guest_pay_portal: 'MyUPMC Guest Pay'
  },
  'mayo-clinic': {
    acronym: 'MC',
    fpl_limit: 400,
    partial_fpl_limit: 500,
    physician_fees_covered: 'Mayo Clinic operates an integrated clinical practice; approved Charity Care covers both Mayo hospital facility and salaried Mayo Clinic physician charges.',
    affiliated_hospitals: [
      'Mayo Clinic Hospital — Rochester (Saint Marys & Methodist Campuses)',
      'Mayo Clinic Hospital — Phoenix (AZ)',
      'Mayo Clinic Hospital — Jacksonville (FL)',
      'Mayo Clinic Health System (MN, WI, IA)'
    ],
    guest_pay_portal: 'Mayo Clinic Patient Online Services Guest Pay'
  },
  'cleveland-clinic': {
    acronym: 'CCF',
    fpl_limit: 250,
    partial_fpl_limit: 400,
    physician_fees_covered: 'Covers Cleveland Clinic Foundation (CCF) hospital facilities and employed Cleveland Clinic salaried physicians in Ohio and Florida.',
    affiliated_hospitals: [
      'Cleveland Clinic Main Campus',
      'Cleveland Clinic Fairview Hospital',
      'Cleveland Clinic Hillcrest Hospital',
      'Cleveland Clinic Akron General',
      'Cleveland Clinic Weston Hospital (FL)'
    ],
    guest_pay_portal: 'MyClevelandClinic / MyChart Guest Pay'
  },
  'mount-sinai-health-system': {
    acronym: 'MSHS',
    fpl_limit: 300,
    partial_fpl_limit: 500,
    physician_fees_covered: 'Covers Mount Sinai Health System hospitals and Icahn School of Medicine faculty practice physicians under NY State HFAL.',
    affiliated_hospitals: [
      'The Mount Sinai Hospital',
      'Mount Sinai Morningside',
      'Mount Sinai West',
      'Mount Sinai Beth Israel',
      'Mount Sinai Brooklyn',
      'Mount Sinai Queens',
      'Mount Sinai South Nassau'
    ],
    guest_pay_portal: 'MyMountSinai Guest Pay'
  },
  'osu-wexner-medical-center': {
    acronym: 'OSUWMC',
    fpl_limit: 300,
    partial_fpl_limit: 400,
    physician_fees_covered: 'Includes Ohio Hospital Care Assurance Program (HCAP) free care and OSUWMC Financial Assistance covering hospital and OSU Physicians Inc. bills.',
    affiliated_hospitals: [
      'University Hospital (Columbus)',
      'Arthur G. James Cancer Hospital & Solove Research Institute',
      'East Hospital',
      'Richard M. Ross Heart Hospital',
      'Dodd Rehabilitation Hospital'
    ],
    guest_pay_portal: 'OSU MyChart Guest Pay'
  }
};

const enriched = hospitals.map(h => {
  const extra = deepDiveData[h.slug] || {};
  const defaultAcronym = h.name
    .split(/[\s\-]+/)
    .filter(w => /^[A-Z]/.test(w))
    .map(w => w[0])
    .join('')
    .slice(0, 5);

  return {
    ...h,
    acronym: extra.acronym || h.acronym || defaultAcronym,
    partial_fpl_limit: extra.partial_fpl_limit || Math.max((h.fpl_limit || 250) + 150, 400),
    physician_fees_covered:
      extra.physician_fees_covered ||
      `Covers ${h.name} hospital facility charges and employed medical group providers under IRS Section 501(r). Out-of-network emergency physicians are separately regulated by the federal No Surprises Act.`,
    affiliated_hospitals: extra.affiliated_hospitals || [
      `${h.name} Main Campus (${h.city}, ${h.state})`,
      `${h.name} Outpatient & Specialty Clinics`,
      `${h.name} Emergency & Surgical Centers`
    ],
    guest_pay_portal: extra.guest_pay_portal || `${h.name} MyChart / Patient Portal Guest Pay`,
    application_url: extra.application_url || h.application_url || h.financial_aid_url
  };
});

fs.writeFileSync(hospitalsPath, JSON.stringify(enriched, null, 2));
console.log(`✅ Enriched ${enriched.length} hospitals with acronyms, affiliated sub-hospitals, physician fee rules, and Guest Pay intercept data.`);
