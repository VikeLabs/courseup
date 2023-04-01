import { Term } from '..';

describe('class Term', () => {
  describe('constructor without args', () => {
    it('should work', () => {
      const term = new Term();
      expect(term.toString()).toEqual('202301');
    });
  });

  describe('constructor with args', () => {
    it('should work', () => {
      const term = new Term(2008, 9);
      expect(term.toString()).toEqual('200809');
    });
  });

  describe('constructor with invalid args', () => {
    it('should throw', () => {
      expect(() => new Term(2008, 13)).toThrow();
    });
  });

  describe('fromString', () => {
    it('should work for 200801', () => {
      const term = Term.fromString('200801');
      expect(term.year).toEqual(2008);
      expect(term.month).toEqual(1);
    });

    it('should work for 200805', () => {
      const term = Term.fromString('200805');
      expect(term.year).toEqual(2008);
      expect(term.month).toEqual(5);
    });

    it('should work for 200809', () => {
      const term = Term.fromString('200809');
      expect(term.year).toEqual(2008);
      expect(term.month).toEqual(9);
    });

    it('should work for 2008-01', () => {
      const term = Term.fromString('2008-01');
      expect(term.year).toEqual(2008);
      expect(term.month).toEqual(1);
    });

    it('should work for 2008_01', () => {
      const term = Term.fromString('2008_01');
      expect(term.year).toEqual(2008);
      expect(term.month).toEqual(1);
    });

    it('should work for 2008 01', () => {
      const term = Term.fromString('2008 01');
      expect(term.year).toEqual(2008);
      expect(term.month).toEqual(1);
    });
  });

  describe('toString', () => {
    it('should work', () => {
      const term = new Term(2008, 9);
      expect(term.toString()).toEqual('200809');
    });

    it('should work for 200801', () => {
      const term = Term.fromString('200801');
      expect(`${term}`).toEqual('200801');
    });
  });

  describe('toFullString', () => {
    it('should work', () => {
      const term = new Term(2008, 9);
      expect(term.toFullString()).toEqual('Fall 2008');
    });
  });

  describe('toSessionString', () => {
    it('should work for 01', () => {
      const term = new Term(2008, 1);
      expect(term.toSessionString()).toEqual('Winter 2007-2008');
    });

    it('should work for 05', () => {
      const term = new Term(2008, 5);
      expect(term.toSessionString()).toEqual('Summer 2008');
    });

    it('should work for 09', () => {
      const term = new Term(2008, 9);
      expect(term.toSessionString()).toEqual('Winter 2008-2009');
    });
  });

  describe('next', () => {
    it('should increment to 200901', () => {
      const term = new Term(2008, 9);
      expect(term.next().toString()).toEqual('200901');
    });

    it('should increment to 200905', () => {
      const term = new Term(2009, 1);
      expect(term.next().toString()).toEqual('200905');
    });
  });
  describe('previous', () => {
    it('should decrement to 200805', () => {
      const term = new Term(2008, 9);
      expect(term.previous().toString()).toEqual('200805');
    });

    it('should decrement to 200809', () => {
      const term = new Term(2009, 1);
      expect(term.previous().toString()).toEqual('200809');
    });
  });
});
