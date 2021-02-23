// joefallon.net/2018/09/typescript-try-catch-finally-and-custom-errors/

export class InvalidSubjectCodeError extends Error {
  constructor(message?: string) {
    super(message);
    // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    // restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
    // stack traces display correctly now
    this.name = InvalidSubjectCodeError.name;
  }
}
