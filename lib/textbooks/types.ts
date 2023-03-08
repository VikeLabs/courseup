export type BaseTextbook = {
  bookstoreUrl?: string;
  imageUrl?: string;
  title: string;
  authors?: string[];
  required: boolean;
  price: {
    newCad?: string;
    usedCad?: string;
    digitalAccessCad?: string;
    newAndDigitalAccessCad?: string;
  };
  isbn?: string;
  instructor?: string;
};

export type Textbook = BaseTextbook & {
  isbn10?: string;
  amazonUrl?: string;
};

export type CourseTextbookList<T> = {
  subject: string;
  code: string;
  section?: string;
  additionalInfo?: string[];
  instructor?: string;
  textbooks: T[];
};
