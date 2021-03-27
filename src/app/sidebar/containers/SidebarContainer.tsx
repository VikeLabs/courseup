import { Center, Flex, Spinner } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';

import '../styles/styles.css';
import '../styles/example.css';

import { SelectedCourse } from '../../../App';
import { Term, useGetCourses, useSubjects } from '../../../fetchers';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../Sidebar';

export interface SidebarContainerProps {
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  term: Term;
  selectedCourse?: SelectedCourse;
  setSelectedCourse: Dispatch<SetStateAction<SelectedCourse | undefined>>;
}

export function SidebarContainer({
  term,
  selectedCourse,
  setSelectedCourse,
}: SidebarContainerProps): JSX.Element | null {
  const [filter, setFilter] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>();

  const { data: subjects, loading: subjectsLoading } = useSubjects({ term: term });
  const { data: courses, loading: coursesLoading } = useGetCourses({ term: term, queryParams: { in_session: filter } });

  const handleSubjectChange = () => {
    setSelectedSubject(undefined);
  };

  const handleFilter = (s: boolean) => {
    setFilter(s);
  };

  return (
    <Flex bg="#E4E4E4" minW="20%" flexDirection="column">
      <TopBar selectedSubject={selectedSubject} handleTopBarBackClick={handleSubjectChange} onFilter={handleFilter} />

      {subjectsLoading || coursesLoading || subjects === null || courses === null ? (
        <Center height="100%">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Sidebar
          subjects={subjects}
          courses={courses}
          selectedCourse={selectedCourse}
          selectedSubject={selectedSubject}
          setSelectedCourse={setSelectedCourse}
          setSelectedSubject={setSelectedSubject}
        />
      )}
    </Flex>
  );
}
