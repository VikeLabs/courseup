import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card } from './components/Card';
import { CardDropDown } from './components/CardDropDown';
import { Course, Term, useGetCourses, useSubjects } from '../../fetchers'

// import StyledHeader from './Header.styles';


export interface SidebarProps {
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  term: Term;
}

export function Sidebar({ term }: SidebarProps): JSX.Element {

  const { data: subjects, loading: loadingSubjects, error: errorSubjects } = useSubjects({ term: term });
  const { data: courses, loading: loadingCourses, error: errorCourses } = useGetCourses({ term: term });

  const parsedCourses = courses?.reduce((dict, course) => {
    const subject = course.subject;
    if (!(subject in dict)) {
      dict[subject] = [];
    }
    dict[subject].push(course);
    return dict;
  }, {} as { [subject: string]: Course[] }) ?? {};

  return (
    <Flex
      id="scrollableFlex"
      maxH="100vh"
      bg="#E4E4E4"
      p="4"
      overflow="auto"
    >
      <InfiniteScroll
        dataLength={subjects?.length ?? 0}
        next={
          () => { }
        }
        hasMore={false}
        loader={
          <Heading size="sm">Loading...</Heading>
        }
        scrollableTarget="scrollableFlex"
        endMessage={<div />}
      >
        {subjects?.map((subject, index) => (
          <CardDropDown key={index} subject={subject.subject} title={subject.title}>
            {parsedCourses[subject.subject]?.map((course, index) => (
              <Card key={index} title={course.title} code={course.code} subject={course.subject} />
            ))}
          </CardDropDown>
        ))}
      </InfiniteScroll>
    </Flex>
  );
}