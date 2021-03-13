import { collection as FirestoreCollection } from 'typesaurus';
import { CourseMapping } from '../sections/Section.model';

const courseMappings = FirestoreCollection<CourseMapping>('section_mappings');

export const collection = { courseMappings };
