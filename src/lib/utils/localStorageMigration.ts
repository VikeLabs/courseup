import { logEvent, OldCourse } from 'index';

export function migrateLocalStorage() {
  // insert cat cry emoji here
  // this migrates the localStorage format to a new one.
  try {
    const item = window.localStorage.getItem('user:saved_courses');
    if (item) {
      const parsedItem = JSON.parse(item) as OldCourse[];
      if (parsedItem.some((c) => c.sections.length > 0)) {
        logEvent('local_storage_migration', { coursesLength: parsedItem.length });
        localStorage.setItem(
          'user:saved_courses',
          JSON.stringify(
            parsedItem.map(({ subject, pid, code, term, selected, lecture, lab, tutorial, color }) => ({
              subject,
              pid,
              code,
              term,
              selected,
              lecture: lecture?.sectionCode,
              lab: lab?.sectionCode,
              tutorial: tutorial?.sectionCode,
              color,
            }))
          )
        );
      }
    }
  } catch (error) {
    console.warn(`Error reading localStorage key “user:saved_courses”:`, error);
    console.warn('Likely the format is fine.');
  }
}
