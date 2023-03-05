// Used for validation of input
export type Term =
  | '202001'
  | '202005'
  | '202009'
  | '202101'
  | '202105'
  | '202109'
  | '202201'
  | '202205'
  | '202209'
  | '202301'
  | '202305';

// make const array of terms from above
export const terms: Term[] = [
  '202001',
  '202005',
  '202009',
  '202101',
  '202105',
  '202109',
  '202201',
  '202205',
  '202209',
  '202301',
  '202305'
];

// add some code?
const buildings: { [key: string]: string } = {
  'Alice Ravenhill Hall': 'RRA',
  'Arthur Currie': 'RAC',
  'Bamfield Marine Sciences Centre': 'BMSC',
  'Bev Glover Greenhouse Facility': 'GGF',
  'Bob Wright Centre': 'BWC',
  'Business & Economics Building': 'BEC',
  'Campus Security Building': 'SEC',
  'Campus Services': 'CSR',
  Carroll: 'RCA',
  'Centennial Stadium': 'STA',
  'Centre for Athletics, Recreation and Special Abilities': 'CARSA',
  'Child Care Complex': 'CCC',
  'Clearihue Building': 'CLE',
  Cluster: 'R51-R61',
  'Continuing Studies': 'CST',
  'Cornett Building': 'COR',
  'Craigdarroch Office': 'CRA',
  'Cunningham Building': 'CUN',
  'David Strong Building': 'DSB',
  'David Thompson': 'RDT',
  'David Turpin Building': 'DTB',
  'Elliott Building': 'ELL',
  'Engineering Comp Science Bldg': 'ECS',
  'Engineering Lab Wing': 'ELW',
  'Engineering Office Wing': 'EOW',
  'Enterprise Data Centre': 'EDC',
  'Fine Arts Building': 'FIA',
  "First People's House": 'FPH',
  'Fraser Building': 'FRA',
  'Halpern Centre for Graduate Students': 'GSC',
  'Health and Wellness': 'HWB',
  Helmcken: 'RHE',
  'Hickman Building': 'HHB',
  Hodges: 'RHO',
  'Hugh Stephen': 'RHS',
  'Human & Social Development': 'HSD',
  'Ian Stewart Complex': 'ISC',
  'Jamie Cassels Centre': 'JCC',
  'Joseph Cunliffe': 'RJC',
  'Lam Family Student Housing Complex': 'R01-39',
  'Lansdowne Residence #1': 'RL1',
  'Lou-Poy Child Care Centre': 'HLP',
  'MacLaurin Building': 'MAC',
  'Marine Technology Centre': 'MTC',
  'McKinnon Building': 'MCK',
  'McPherson Library': 'LIB',
  'Mearns Centre for Learning': 'MCL',
  'Medical Sciences': 'MSB',
  'Michael Williams': 'MWB',
  'Modular Dining Facility': 'MOD',
  'Outdoor Aquatic Unit': 'OAU',
  Park: 'R42',
  'Petch Building': 'PCH',
  'Phoenix Theatre': 'PNX',
  'Poole House': 'RPH',
  'R. Haig Brown': 'RHB',
  'Richard Wilson': 'RRW',
  'Ring Road': 'R40',
  'Robert Wallace Hall': 'RWA',
  Sanderson: 'RSA',
  Saunders: 'SAU',
  'Saunders Annex': 'SAA',
  Sedgewick: 'SED',
  'Shirley Baker': 'RSB',
  'South Tower': 'R43',
  'Student Union Building': 'SUB',
  Tower: 'R41',
  'University Club': 'UCL',
  'University House 1': 'UH1',
  'University House 2': 'UH2',
  'University House 3': 'UH3',
  'University House 4': 'UH4',
  'University House 5': 'UH5',
  'Visual Arts Building': 'VIA',
};

export const Buildings = new Map(Object.entries(buildings));
