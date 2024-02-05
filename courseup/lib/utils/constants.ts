import { SectionType } from './fetchers';

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
