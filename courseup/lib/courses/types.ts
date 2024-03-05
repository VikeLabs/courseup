export type KualiCourse = {
  subject: string;
  code: string;
  pid?: string;
};

export type NestedPreCoRequisites = {
  quantity?: number | 'ALL';
  coreq?: boolean;
  units?: boolean;
  grade?: string;
  gpa?: string;
  unparsed?: string;
  reqList?: Array<NestedPreCoRequisites | KualiCourse | string>;
};

export type CourseDetails = {
  pid: string;
  title: string;
  description: string;
  dateStart: string;
  credits: {
    credits: {
      min: string;
      max: string;
    };
    value:
      | string
      | {
          min: string;
          max: string;
        };
    chosen: string;
  };
  hoursCatalog?: {
    lecture: string;
    tutorial: string;
    lab: string;
  }[];
  preAndCorequisites?: Array<string | NestedPreCoRequisites | KualiCourse>;
  preOrCorequisites?: Array<string | NestedPreCoRequisites | KualiCourse>;
  /**
   * Abbriviation of the subject of the course.
   * @example "ECE"
   */
  subject: string;
  /**
   * The code portion of the course.
   * @example "260"
   */
  code: string;
  /**
   * If a course was named something else previously.
   * @example "ELEC260"
   */
  formally?: string;
};
