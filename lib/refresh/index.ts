import { Task } from '@prisma/client';

import { upsertCourses } from '../courses';
import { createTask } from '../task';

// check if number is between max and min (inclusive) and a threshold value
export const isBetween = (num: number, min: number, max: number, threshold = 0): boolean => {
  return num >= min - threshold && num <= max + threshold;
};
