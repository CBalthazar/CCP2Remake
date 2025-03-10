class UnexpectedDatabaseError extends Error {
  constructor() {
    super("an unexpected event happend, we're on to fix it");
    this.status = 500;
  }
}

class MissingParameter extends Error {
  constructor() {
    super("one or more parameters are missing");
    this.status(400);
  }
}
export { MissingParameter };
