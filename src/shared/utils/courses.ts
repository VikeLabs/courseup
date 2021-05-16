import { Section } from '../fetchers';

type sectionType = 'lecture' | 'lab' | 'tutorial';

export const getFirstSectionType = (sections: Section[], type: sectionType): number => {
  let i = 0;
  for (const section of sections) {
    if (section.sectionType === type) {
      return i;
    }
    i++;
  }

  return -1;
};

export const hasSectionType = (sections: Section[], type: sectionType): boolean => {
  for (const section of sections) {
    if (section.sectionType === type) {
      return true;
    }
  }

  return false;
};
