#!/bin/bash

DB="banner.db"

# create sqlite3 table
sqlite3 "$DB" << EOF
drop table if exists sections;
create table sections  (
    id integer primary key,
    term text,
    termDesc text,
    courseReferenceNumber text,
    partOfTerm text,
    courseNumber text,
    subject text,
    subjectDescription text,
    sequenceNumber text,
    campusDescription text,
    scheduleTypeDescription text,
    courseTitle text,
    creditHours text,
    maximumEnrollment text,
    enrollment text,
    seatsAvailable text,
    waitCapacity text,
    waitCount text,
    waitAvailable text,
    crossList text,
    crossListCapacity text,
    crossListCount text,
    crossListAvailable text,
    creditHourHigh text,
    creditHourLow text,
    creditHourIndicator text,
    openSection text,
    linkIdentifier text,
    isSectionLinked text,
    subjectCourse text,
    reservedSeatSummary text,
    sectionAttributes text,
    instructionalMethod text,
    instructionalMethodDescription text
);

drop table if exists meetingsFaculty;
create table meetingsFaculty (
    id integer,
    term text,
    beginTime text,
    building text,
    buildingDescription text,
    campus text,
    campusDescription text,
    category text,
    class text,
    courseReferenceNumber text,
    creditHourSession float,
    endDate text,
    endTime text,
    hoursWeek integer,
    meetingScheduleType text,
    meetingType text,
    meetingTypeDescription text,
    room text,
    startDate text,
    monday boolean,
    tuesday boolean,
    wednesday boolean,
    thursday boolean,
    friday boolean,
    saturday boolean
);

drop table if exists faculty;
create table faculty (
    id integer,
    category text,
    class text,
    courseReferenceNumber text,
    displayName text,
    emailAddress text,
    primaryIndicator boolean,
    term text
);
EOF


jq -c ".[]" $1 | spyql -Otable=sections "
SELECT 
    json->termDesc,
    json->id,
    json->term,
    json->courseReferenceNumber,
    json->partOfTerm,
    json->courseNumber,
    json->subject,
    json->subjectDescription,
    json->sequenceNumber,
    json->campusDescription,
    json->scheduleTypeDescription,
    json->courseTitle,
    json->creditHours,
    json->maximumEnrollment,
    json->enrollment,
    json->seatsAvailable,
    json->waitCapacity,
    json->waitCount,
    json->waitAvailable,
    json->crossList,
    json->crossListCapacity,
    json->crossListCount,
    json->crossListAvailable,
    json->creditHourHigh,
    json->creditHourLow,
    json->creditHourIndicator,
    json->openSection,
    json->linkIdentifier,
    json->isSectionLinked,
    json->subjectCourse,
    json->reservedSeatSummary,
    json->sectionAttributes,
    json->instructionalMethod,
    json->instructionalMethodDescription
FROM json TO sql
" | sqlite3 "$DB"

jq -c '.[] | .meetingsFaculty[]+{id} | .meetingTime+{category,class,id}' $1 | spyql -Otable=meetingsFaculty "
SELECT 
    json->id,
    json->category,
    json->class,
    json->courseReferenceNumber,
    json->term,
    json->beginTime,
    json->building,
    json->buildingDescription,
    json->campus,
    json->campusDescription,
    json->class,
    json->courseReferenceNumber,
    json->creditHourSession,
    json->endDate,
    json->endTime,
    json->meetingScheduleType,
    json->meetingType,
    json->meetingTypeDescription,
    json->room,
    json->hoursWeek,
    json->startDate,
    json->monday,
    json->tuesday,
    json->wednesday,
    json->thursday,
    json->friday,
    json->saturday
FROM json TO sql
" | sqlite3 "$DB"

jq -c '.[] | .faculty[]+{id}' $1 | spyql -Otable=faculty "
SELECT
    json->id,
    json->category,
    json->class,
    json->courseReferenceNumber,
    json->displayName,
    json->emailAddress,
    json->primaryIndicator,
    json->term
FROM json TO sql
" | sqlite3 "$DB"
