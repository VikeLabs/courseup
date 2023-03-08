// quicktype --just-types banner.json -o interface.ts

export interface Section {
  id: number;
  term: string;
  termDesc: string;
  courseReferenceNumber: string;
  partOfTerm: null | string;
  courseNumber: string;
  subject: string;
  subjectDescription: string;
  sequenceNumber: string;
  campusDescription: string;
  scheduleTypeDescription: string;
  courseTitle: string;
  creditHours: number | null;
  maximumEnrollment: number;
  enrollment: number;
  seatsAvailable: number;
  waitCapacity: number | null;
  waitCount: number;
  waitAvailable: number | null;
  crossList: null | string;
  crossListCapacity: number | null;
  crossListCount: number | null;
  crossListAvailable: number | null;
  creditHourHigh: number | null;
  creditHourLow: number;
  creditHourIndicator: string | null;
  openSection: boolean;
  linkIdentifier: string | null;
  isSectionLinked: boolean;
  subjectCourse: string;
  faculty: Faculty[];
  meetingsFaculty: MeetingsFaculty[];
  reservedSeatSummary: null;
  sectionAttributes: null;
  instructionalMethod: string | null;
  instructionalMethodDescription: string | null;
}

export interface Faculty {
  bannerId: string;
  category: null;
  //   class: FacultyClass;
  courseReferenceNumber: string;
  displayName: string;
  emailAddress: null | string;
  primaryIndicator: boolean;
  term: string;
}

export interface MeetingsFaculty {
  category: string;
  //   class: MeetingsFacultyClass;
  courseReferenceNumber: string;
  faculty: any[];
  meetingTime: MeetingTime;
  term: string;
}

export interface MeetingTime {
  beginTime: null | string;
  building: null | string;
  buildingDescription: string | null;
  campus: string | null;
  campusDescription: string | null;
  category: string;
  //   class: MeetingTimeClass;
  courseReferenceNumber: string;
  creditHourSession: number | null;
  endDate: string;
  endTime: null | string;
  friday: boolean;
  hoursWeek: number | null;
  meetingScheduleType: string;
  meetingType: string;
  meetingTypeDescription: string;
  monday: boolean;
  room: null | string;
  saturday: boolean;
  startDate: string;
  sunday: boolean;
  term: string;
  thursday: boolean;
  tuesday: boolean;
  wednesday: boolean;
}

export enum Subject {
  AE = 'AE',
  Acan = 'ACAN',
  Admn = 'ADMN',
  Agei = 'AGEI',
  Ahvs = 'AHVS',
  Anth = 'ANTH',
  Art = 'ART',
  Asl = 'ASL',
  Astr = 'ASTR',
  Atwp = 'ATWP',
  Bcmb = 'BCMB',
  Bioc = 'BIOC',
  Biol = 'BIOL',
  Bme = 'BME',
  Bus = 'BUS',
  CD = 'CD',
  COM = 'COM',
  CS = 'CS',
  Ceng = 'CENG',
  Ch = 'CH',
  Chem = 'CHEM',
  Chin = 'CHIN',
  Cive = 'CIVE',
  Csc = 'CSC',
  Cspt = 'CSPT',
  Cw = 'CW',
  Cyc = 'CYC',
  Cyci = 'CYCI',
  DR = 'DR',
  Dhum = 'DHUM',
  Dsst = 'DSST',
  EOS = 'EOS',
  Ece = 'ECE',
  Econ = 'ECON',
  EdD = 'ED-D',
  EdP = 'ED-P',
  Edci = 'EDCI',
  Educ = 'EDUC',
  Elec = 'ELEC',
  Engl = 'ENGL',
  Engr = 'ENGR',
  Ent = 'ENT',
  Entc = 'ENTC',
  Entd = 'ENTD',
  Ephe = 'EPHE',
  Er = 'ER',
  Es = 'ES',
  Eus = 'EUS',
  Fa = 'FA',
  Forb = 'FORB',
  Fran = 'FRAN',
  Fren = 'FREN',
  Gds = 'GDS',
  Geog = 'GEOG',
  Ger = 'GER',
  Gers = 'GERS',
  Gmst = 'GMST',
  Gndr = 'GNDR',
  Gree = 'GREE',
  Grs = 'GRS',
  Gs = 'GS',
  HSM = 'HSM',
  Ha = 'HA',
  Hdcc = 'HDCC',
  Hinf = 'HINF',
  Hist = 'HIST',
  Hlth = 'HLTH',
  Hs = 'HS',
  Hsd = 'HSD',
  Hstr = 'HSTR',
  Huma = 'HUMA',
  ISP = 'ISP',
  Ib = 'IB',
  Icdg = 'ICDG',
  Ied = 'IED',
  Iet = 'IET',
  Igov = 'IGOV',
  In = 'IN',
  Ingh = 'INGH',
  Intd = 'INTD',
  Ints = 'INTS',
  Is = 'IS',
  Ital = 'ITAL',
  Japa = 'JAPA',
  Las = 'LAS',
  Lati = 'LATI',
  Law = 'LAW',
  Ling = 'LING',
  MICR = 'MICR',
  Math = 'MATH',
  Mba = 'MBA',
  Me = 'ME',
  Mech = 'MECH',
  Medi = 'MEDI',
  Meds = 'MEDS',
  Mest = 'MEST',
  Mgb = 'MGB',
  Mm = 'MM',
  Mrne = 'MRNE',
  Mus = 'MUS',
  Nrsc = 'NRSC',
  Nued = 'NUED',
  Nuhi = 'NUHI',
  Nunp = 'NUNP',
  Nura = 'NURA',
  Nurp = 'NURP',
  Nurs = 'NURS',
  Paas = 'PAAS',
  Paci = 'PACI',
  Padr = 'PADR',
  Phil = 'PHIL',
  Phsp = 'PHSP',
  Phys = 'PHYS',
  Poli = 'POLI',
  Psyc = 'PSYC',
  RCS = 'RCS',
  Rhed = 'RHED',
  Rs = 'RS',
  Russ = 'RUSS',
  SDH = 'SDH',
  Scie = 'SCIE',
  Sea = 'SEA',
  Seng = 'SENG',
  Sjs = 'SJS',
  Slav = 'SLAV',
  Slst = 'SLST',
  Smgt = 'SMGT',
  Soci = 'SOCI',
  Socw = 'SOCW',
  Sosc = 'SOSC',
  Span = 'SPAN',
  Spp = 'SPP',
  Stat = 'STAT',
  Thea = 'THEA',
  Ts = 'TS',
  Ukr = 'UKR',
  Wkex = 'WKEX',
  Writ = 'WRIT',
  Ws = 'WS',
}

export enum SubjectDescription {
  AcademicAndTechnicalWriting = 'Academic and Technical Writing',
  Ageing = 'Ageing',
  AmericanSignLanguage = 'American Sign Language',
  Anthropology = 'Anthropology',
  Art = 'Art',
  ArtEducation = 'Art Education',
  ArtHistoryAmpVisualStudies = 'Art History &amp; Visual Studies',
  ArtsOfCanada = 'Arts of Canada',
  Astronomy = 'Astronomy',
  Biochemistry = 'Biochemistry',
  BiochemistryAndMicrobiology = 'Biochemistry and Microbiology',
  Biology = 'Biology',
  BiomedicalEngineering = 'Biomedical Engineering',
  Business = 'Business',
  CanadianStudies = 'Canadian Studies',
  Chemistry = 'Chemistry',
  ChildAmpYouthCareInternatnl = 'Child &amp; Youth Care Internatnl',
  ChildAndYouthCare = 'Child and Youth Care',
  Chinese = 'Chinese',
  CivilEngineering = 'Civil Engineering',
  Commerce = 'Commerce',
  CommunityDevelopment = 'Community Development',
  ComputerEngineering = 'Computer Engineering',
  ComputerScience = 'Computer Science',
  CreativeWriting = 'Creative Writing',
  CulturalHeritage = 'Cultural Heritage',
  CulturalSocialAmpPoliticalT = 'Cultural, Social &amp; Political T',
  CurriculumAndInstruction = 'Curriculum and Instruction',
  DigitalHumanities = 'Digital Humanities',
  DisabilityStudies = 'Disability Studies',
  DisputeResolution = 'Dispute Resolution',
  EarthAndOceanSciences = 'Earth and Ocean Sciences',
  Economics = 'Economics',
  EdPsycAndLeadershipStudies = 'Ed Psyc and Leadership Studies',
  Education = 'Education',
  ElectricalAmpComputerEngineer = 'Electrical &amp; Computer Engineer',
  ElectricalEngineering = 'Electrical Engineering',
  Engineering = 'Engineering',
  English = 'English',
  EntrepreneurshipAndSmallBus = 'Entrepreneurship and Small Bus',
  EntrepreneurshipCertificate = 'Entrepreneurship Certificate',
  EntrepreneurshipDiploma = 'Entrepreneurship Diploma',
  EnvironmentalRestoration = 'Environmental Restoration',
  EnvironmentalStudies = 'Environmental Studies',
  EuropeanStudies = 'European Studies',
  ExerciseScPhysAmpHealthEd = 'Exercise Sc, Phys &amp; Health Ed',
  FineArts = 'Fine Arts',
  ForestBiology = 'Forest Biology',
  FrenchFRAN = 'French (FRAN)',
  FrenchFREN = 'French (FREN)',
  GenderStudies = 'Gender Studies',
  Geography = 'Geography',
  German = 'German',
  GermanicStudies = 'Germanic Studies',
  GlobalDevelopmentStudies = 'Global Development Studies',
  GraduateStudies = 'Graduate Studies',
  Greek = 'Greek',
  GreekAndRomanStudies = 'Greek and Roman Studies',
  HealthAndCommunityServices = 'Health and Community Services',
  HealthAndSociety = 'Health and Society',
  HealthInformationScience = 'Health Information Science',
  History = 'History',
  HistoryInArt = 'History in Art',
  HospitalityAndServicesMgmt = 'Hospitality and Services Mgmt',
  HumanAndSocialDevelopment = 'Human and Social Development',
  HumanDimensionsClimateChg = 'Human Dimensions - Climate Chg',
  Humanities = 'Humanities',
  IndigenousCOMDevGovernance = 'Indigenous Com Dev Governance',
  IndigenousEducation = 'Indigenous Education',
  IndigenousGovernance = 'Indigenous Governance',
  IndigenousNationhood = 'Indigenous Nationhood',
  IndigenousPeoplesHealth = 'Indigenous Peoples Health',
  IndigenousStudies = 'Indigenous Studies',
  InterculturalEducationAndTr = 'Intercultural Education and Tr',
  InterculturalStudiesAndPrac = 'Intercultural Studies and Prac',
  Interdisciplinary = 'Interdisciplinary',
  InternationalBusiness = 'International Business',
  InternationalHealthStudies = 'International Health Studies',
  Italian = 'Italian',
  Japanese = 'Japanese',
  Latin = 'Latin',
  LatinAmericanStudies = 'Latin American Studies',
  Law = 'Law',
  Linguistics = 'Linguistics',
  MarineScience = 'Marine Science',
  MasterInManagement = 'Master in Management',
  MastersBusinessAdministratio = 'Masters-Business Administratio',
  MastersOfGlobalBusiness = 'Masters of Global Business',
  Math = 'Math',
  MechanicalEngineering = 'Mechanical Engineering',
  MedicalSciences = 'Medical Sciences',
  MedievalStudies = 'Medieval Studies',
  MediterraneanStudies = 'Mediterranean Studies',
  Microbiology = 'Microbiology',
  Music = 'Music',
  MusicEducation = 'Music Education',
  Neuroscience = 'Neuroscience',
  NurseEducator = 'Nurse Educator',
  Nursing = 'Nursing',
  NursingAdvancedPractice = 'Nursing Advanced Practice',
  NursingHealthInfoScience = 'Nursing/Health Info Science',
  NursingPolicyAndPractice = 'Nursing Policy and Practice',
  NursingPractitioners = 'Nursing Practitioners',
  PacificAndAsianStudies = 'Pacific and Asian Studies',
  PacificStudies = 'Pacific Studies',
  Philosophy = 'Philosophy',
  Physics = 'Physics',
  PoliticalScience = 'Political Science',
  Psychology = 'Psychology',
  PublicAdministration = 'Public Administration',
  PublicAdmnAmpDisputeResolutn = 'Public Admn &amp; Dispute Resolutn',
  PublicHealthAmpSocialPolicy = 'Public Health &amp; Social Policy',
  RecreationAndHealth = 'Recreation and Health',
  ReligionCultureAndSociety = 'Religion, Culture and Society',
  ReligiousStudies = 'Religious Studies',
  Russian = 'Russian',
  Science = 'Science',
  ServiceManagement = 'Service Management',
  SlavicStudies = 'Slavic Studies',
  Slavonics = 'Slavonics',
  SocialDimensionsOfHealth = 'Social Dimensions of Health',
  SocialJusticeStudies = 'Social Justice Studies',
  SocialSciences = 'Social Sciences',
  SocialWork = 'Social Work',
  Sociology = 'Sociology',
  SoftwareEngineering = 'Software Engineering',
  SoutheastAsia = 'Southeast Asia',
  Spanish = 'Spanish',
  Statistics = 'Statistics',
  StudyInPolicyAndPractice = 'Study in Policy and Practice',
  TeacherEdSeminarAmpPract = 'Teacher Ed: Seminar &amp; Pract.',
  TechnologyAndSociety = 'Technology and Society',
  Theatre = 'Theatre',
  Ukrainian = 'Ukrainian',
  WomensStudies = 'Womens Studies',
  WorkExperience = 'Work Experience',
  Writing = 'Writing',
}
