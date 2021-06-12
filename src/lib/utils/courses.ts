import { Section, SectionType } from '../fetchers';

export const getFirstSectionType = (sections: Section[], type: SectionType): number => {
  return sections.findIndex((section) => section.sectionType === type);
};

export const hasSectionType = (sections: Section[], type: SectionType): boolean => {
  return sections.some((section) => section.sectionType === type);
};
