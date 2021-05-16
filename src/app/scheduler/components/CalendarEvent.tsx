import { MeetingTimes } from '../../../shared/fetchers';

export interface CalendarEvent {
  subject: String;
  code: String;
  meetingTime: MeetingTimes;
  sectionCode: String;
  color: String;
  textColor?: String;
}
