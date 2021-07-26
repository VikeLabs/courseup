import { KualiSubject } from './fetchers';

export interface KualiSubjectInSession extends KualiSubject {
  inSession?: boolean;
}
export type kualiInSessionSubject = KualiSubjectInSession;
