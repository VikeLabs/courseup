import React from 'react';

import { Heading } from '@chakra-ui/react';

import { Shield } from 'pages/calendar/components/Shield';
import { CourseHours } from 'pages/calendar/shared/types';

export function HoursShield({ hours }: { hours: CourseHours[] }): JSX.Element {
  return (
    <Shield bg="green.200" title="Hours">
      {hours.map((h, index) => (
        <React.Fragment key={index}>
          <Heading as={'span'} size="sm" title="lecture hours per week">
            {h.lecture}
          </Heading>
          <Heading as={'span'} size="sm">
            {'-'}
          </Heading>
          <Heading as={'span'} size="sm" title="lab hours per week">
            {h.lab}
          </Heading>
          <Heading as={'span'} size="sm">
            {'-'}
          </Heading>
          <Heading as={'span'} size="sm" title="tutorial hours per week">
            {h.tutorial}
          </Heading>
          {index === hours.length - 1 ? null : (
            <Heading as={'span'} size="xs" px="1" textColor="gray.600">
              or
            </Heading>
          )}
        </React.Fragment>
      ))}
    </Shield>
  );
}
