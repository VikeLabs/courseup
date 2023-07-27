import { SectionType } from 'lib/fetchers';

export const SECTION_TYPES: {
  sectionName: SectionType;
  sectionType: 'lecture' | 'lab' | 'tutorial';
}[] = [
  { sectionName: 'lecture', sectionType: 'lecture' },
  { sectionName: 'lecture topic', sectionType: 'lecture' },
  { sectionName: 'lab', sectionType: 'lab' },
  { sectionName: 'gradable lab', sectionType: 'lab' },
  { sectionName: 'tutorial', sectionType: 'tutorial' },
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
  'Sŋ&eacute;qə ʔ&eacute;ʔləŋ | Sngequ House': 'Sngequ House',
  'Čeqʷəŋín ʔéʔləŋ | Cheko’nien House': 'Cheko’nien House',
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

export const fuzzySearchCache: { [key: string]: string } = {};

export function fuzzySearchBuilding(building: string, fuzzySearchCache: { [key: string]: string }) {
  console.log('Called for ' + building);
  if (fuzzySearchCache[building]) {
    return fuzzySearchCache[building];
  } else {
    const regex = new RegExp(building, 'i');

    const buildingsArray = Array.from(Buildings);

    for (const [buildingName, abbreviation] of buildingsArray) {
      if (regex.test(buildingName)) {
        console.log('Inserting ' + building);
        fuzzySearchCache[building] = abbreviation;
        return abbreviation;
      }
    }

    // If there is no abbreviation, display the whole thing (Cut off room #)
    fuzzySearchCache[building] = building.split(' ').slice(0, -1).join(' ');
    return fuzzySearchCache[building];
  }
}
