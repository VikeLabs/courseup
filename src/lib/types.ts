import { KualiSubject } from './fetchers';

export interface KualiSubjectInSession {
  inSession?: boolean;
}
export type InSessionSubject = KualiSubject & KualiSubjectInSession;
