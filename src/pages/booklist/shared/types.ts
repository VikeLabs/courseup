export type Textbook = {
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
  amazonUrl?: string;
};
