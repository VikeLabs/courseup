-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Undergraduate', 'Graduate');

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "pid" TEXT NOT NULL,
    "level" "Level" NOT NULL DEFAULT 'Undergraduate',
    "subject" TEXT NOT NULL,
    "subjectDescription" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateStart" TEXT NOT NULL,
    "credits" JSONB NOT NULL,
    "hoursCatalog" JSONB,
    "preAndCorequisites" JSONB,
    "preOrCorequisites" JSONB,
    "formally" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "courseReferenceNumber" TEXT NOT NULL,
    "partOfTerm" TEXT,
    "sequenceNumber" TEXT NOT NULL,
    "campusDescription" TEXT NOT NULL,
    "additionalInformation" TEXT,
    "scheduleTypeDescription" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "crossList" TEXT,
    "crossListCapacity" INTEGER,
    "crossListAvailable" INTEGER,
    "creditHours" TEXT,
    "creditHourHigh" TEXT,
    "creditHourLow" TEXT,
    "creditHourIndicator" TEXT,
    "openSection" BOOLEAN NOT NULL,
    "linkIdentifier" TEXT,
    "isSectionLinked" BOOLEAN NOT NULL,
    "instructionalMethod" TEXT,
    "instructionalMethodDescription" TEXT,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionCapacity" (
    "id" TEXT NOT NULL,
    "enrollment" INTEGER NOT NULL,
    "seatsAvailable" INTEGER NOT NULL,
    "maximumEnrollment" INTEGER NOT NULL,
    "waitCapacity" INTEGER,
    "waitCount" INTEGER NOT NULL,
    "waitAvailable" INTEGER,
    "sectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SectionCapacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingTime" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "startTime" TIME,
    "endDate" DATE NOT NULL,
    "endTime" TIME,
    "startDateTime" TIMESTAMP(3),
    "endDateTime" TIMESTAMP(3),
    "building" TEXT,
    "buildingDescription" TEXT,
    "campus" TEXT,
    "campusDescription" TEXT,
    "category" TEXT,
    "courseReferenceNumber" TEXT NOT NULL,
    "creditHourSession" TEXT,
    "hoursWeek" TEXT,
    "meetingScheduleType" TEXT NOT NULL,
    "meetingType" TEXT NOT NULL,
    "meetingTypeDescription" TEXT NOT NULL,
    "room" TEXT,
    "monday" BOOLEAN NOT NULL,
    "tuesday" BOOLEAN NOT NULL,
    "wednesday" BOOLEAN NOT NULL,
    "thursday" BOOLEAN NOT NULL,
    "friday" BOOLEAN NOT NULL,
    "saturday" BOOLEAN NOT NULL,
    "sunday" BOOLEAN NOT NULL,
    "sectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeetingTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacultiesOnSection" (
    "primary" BOOLEAN NOT NULL DEFAULT false,
    "facultyId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacultiesOnSection_pkey" PRIMARY KEY ("facultyId","sectionId")
);

-- CreateTable
CREATE TABLE "Timetable" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timetable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimetablesOnCourses" (
    "timetableId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimetablesOnCourses_pkey" PRIMARY KEY ("timetableId","sectionId")
);

-- CreateTable
CREATE TABLE "TimetableTemplate" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimetableTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimetableTemplateCourse" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "TimetableTemplateCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Textbook" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT[],
    "isbn" TEXT,
    "isbn10" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Textbook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextbookSource" (
    "id" TEXT NOT NULL,
    "textbookId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "org" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER,
    "condition" TEXT,
    "format" TEXT,

    CONSTRAINT "TextbookSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextbookList" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "addtionalInformation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TextbookList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextbooksOnTextbookLists" (
    "required" BOOLEAN NOT NULL DEFAULT false,
    "additionalInformation" TEXT,
    "textbookId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,

    CONSTRAINT "TextbooksOnTextbookLists_pkey" PRIMARY KEY ("textbookId","listId")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "metadata" JSONB,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "user" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Course_term_subject_code_idx" ON "Course"("term", "subject", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Course_term_subject_code_key" ON "Course"("term", "subject", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Section_courseId_courseReferenceNumber_key" ON "Section"("courseId", "courseReferenceNumber");

-- CreateIndex
CREATE INDEX "SectionCapacity_sectionId_createdAt_idx" ON "SectionCapacity"("sectionId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_email_key" ON "Faculty"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Timetable_ref_key" ON "Timetable"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "Timetable_hash_key" ON "Timetable"("hash");

-- CreateIndex
CREATE INDEX "Timetable_ref_idx" ON "Timetable"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "TimetableTemplate_ref_key" ON "TimetableTemplate"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "Textbook_isbn_key" ON "Textbook"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "Textbook_isbn10_key" ON "Textbook"("isbn10");

-- CreateIndex
CREATE UNIQUE INDEX "TextbookList_sectionId_key" ON "TextbookList"("sectionId");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionCapacity" ADD CONSTRAINT "SectionCapacity_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingTime" ADD CONSTRAINT "MeetingTime_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultiesOnSection" ADD CONSTRAINT "FacultiesOnSection_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultiesOnSection" ADD CONSTRAINT "FacultiesOnSection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimetablesOnCourses" ADD CONSTRAINT "TimetablesOnCourses_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "Timetable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimetablesOnCourses" ADD CONSTRAINT "TimetablesOnCourses_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimetableTemplateCourse" ADD CONSTRAINT "TimetableTemplateCourse_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "TimetableTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextbookSource" ADD CONSTRAINT "TextbookSource_textbookId_fkey" FOREIGN KEY ("textbookId") REFERENCES "Textbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextbookList" ADD CONSTRAINT "TextbookList_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextbooksOnTextbookLists" ADD CONSTRAINT "TextbooksOnTextbookLists_textbookId_fkey" FOREIGN KEY ("textbookId") REFERENCES "Textbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextbooksOnTextbookLists" ADD CONSTRAINT "TextbooksOnTextbookLists_listId_fkey" FOREIGN KEY ("listId") REFERENCES "TextbookList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
