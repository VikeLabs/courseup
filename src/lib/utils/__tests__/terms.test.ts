import { getReadableTerm, getCurrentTerm } from '../terms';

describe('term utils', () => {
  describe('getReadableTerm', () => {
    describe('summer terms', () => {
      it('should return `Summer 2021`', () => {
        expect(getReadableTerm('202105')).toStrictEqual('Summer 2021');
      });
      it('should return `Summer 1999`', () => {
        expect(getReadableTerm('199905')).toStrictEqual('Summer 1999');
      });
    });

    describe('winter terms', () => {
      it('should return `Winter 2021`', () => {
        expect(getReadableTerm('202101')).toStrictEqual('Winter 2021');
      });
      it('should return `Winter 3001`', () => {
        expect(getReadableTerm('300101')).toStrictEqual('Winter 3001');
      });
    });

    describe('fall terms', () => {
      it('should return `Fall 2021`', () => {
        expect(getReadableTerm('202109')).toStrictEqual('Fall 2021');
      });
      it('should return `Fall 1234`', () => {
        expect(getReadableTerm('123409')).toStrictEqual('Fall 1234');
      });
    });
  });

  describe('getCurrentTerm', () => {
    describe('when the date is given', () => {
      it('should return the current term', () => {
        expect(getCurrentTerm(new Date('August 16, 1923'))).toStrictEqual('192305');
      });
    });

    describe('during the fall', () => {
      it('should return 202109', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date('October 31, 2021').getTime());
        expect(getCurrentTerm()).toStrictEqual('202109');
      });
    });

    describe('during the winter', () => {
      it('should return 202101', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date('March 16, 2021').getTime());
        expect(getCurrentTerm()).toStrictEqual('202101');
      });
    });

    describe('during the summer', () => {
      it('should return 202105', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date('May 1, 2021').getTime());
        expect(getCurrentTerm()).toStrictEqual('202105');
      });
    });
  });
});
