// enum as const
export const enum SESSION {
  WINTER = 'WINTER',
  SUMMER = 'SUMMER',
}

export class Term {
  public readonly year: number;
  public readonly month: number;

  public readonly active: boolean;
  // public readonly session: SESSION = Term.getSession(this);

  /**
   * Returns the current term if year and month are not provided.
   * @param year The year of the term.
   * @param month The month of the term.
   */
  constructor(year = Term.getYear(), month: number = Term.getMonth()) {
    this.year = year;
    this.month = Term.getMonthTerm(month);
    this.active = false;
  }

  public static fromString(term: string) {
    const t = term.replace(/[^0-9]/g, '');
    if (t.length !== 6) {
      throw new Error(`Invalid term: ${term}`);
    }

    const month = parseInt(t.slice(4, 6), 10);
    const year = parseInt(t.slice(0, 4), 10);

    // validate year
    if (year < 2000 || year > 2100) {
      throw new Error(`Invalid year: ${year}`);
    }
    // validate month
    if (month !== 1 && month !== 5 && month !== 9) {
      throw new Error(`Invalid month: ${month}`);
    }
    return new Term(year, month);
  }

  public next(): Term {
    return this.month === 9 ? new Term(this.year + 1, 1) : new Term(this.year, this.month + 4);
  }

  public previous(): Term {
    return this.month === 1 ? new Term(this.year - 1, 9) : new Term(this.year, this.month - 4);
  }

  public toString(): string {
    // ex. 202209
    return `${this.year}${this.month.toString().padStart(2, '0')}`;
  }

  public toFullString(): string {
    // ex. Fall 2022
    return `${Term.getMonthName(this.month)} ${this.year}`;
  }

  public sessionTerms(): Term[] {
    const session = Term.getSession(this);
    if (session === SESSION.WINTER && this.month === 1) {
      return [this, this.next()];
    } else if (session === SESSION.SUMMER && this.month === 5) {
      return [this];
    } else if (session === SESSION.WINTER && this.month === 9) {
      return [this, this.next()];
    }
    throw new Error(`Invalid session: ${session}`);
  }

  public toSessionString(): string {
    // ex. Winter 2022-2023 or Summer 2022
    switch (this.month) {
      case 1:
        return `Winter ${this.year - 1}-${this.year}`;
      case 5:
        return `Summer ${this.year}`;
      case 9:
        return `Winter ${this.year}-${this.year + 1}`;
      default:
        throw new Error(`Invalid month: ${this.month}`);
    }
  }

  public static getMonth(): number {
    return new Date().getMonth();
  }

  public static getMonthTerm(month: number): number {
    if (month >= 0 && month <= 4) {
      return 1;
    }
    if (month >= 5 && month <= 7) {
      return 5;
    }
    if (month >= 8 && month <= 11) {
      return 9;
    }
    throw new Error(`Invalid month: ${month}`);
  }

  public static getYear(): number {
    return new Date().getFullYear();
  }

  public static getMonthName(month: number): string {
    switch (month) {
      case 1:
        return 'Spring';
      case 5:
        return 'Summer';
      case 9:
        return 'Fall';
      default:
        throw new Error(`Invalid month: ${month}`);
    }
  }

  /**
   * Returns the session for the given term.
   * @param Term
   * @returns
   */
  public static getSession(Term: Term): SESSION {
    if (Term.month === 1 || Term.month === 9) {
      return SESSION.WINTER;
    }
    if (Term.month === 5) {
      return SESSION.SUMMER;
    }
    throw new Error(`Invalid month: ${Term.month}`);
  }

  public static active(term: Term, d = new Date()): boolean {
    const month = d.getMonth();
    const year = d.getFullYear();
    const active = year === term.year && month >= term.month - 1 && month <= term.month + 2;
    return active;
  }
}
