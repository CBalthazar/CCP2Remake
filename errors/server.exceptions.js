class NotAuthorException extends Error {
  constructor() {
    super("This action is Forbidden, you cannot modify someone else content");
    this.status = 403;
  }
}

class NotRoleException extends Error {
  constructor(role) {
    super(`This Action is forbidden, you must be ${role}`);
    this.status = 403;
  }
}

class DataNotFound extends Error {
  constructor(data) {
    super(`${data} could not be found`);
    this.status = 404;
  }
}

class LoginFailed extends Error {
  constructor() {
    super("Email or Password is wrong. Are you sure you have an account ?");
    this.status(400);
  }
}
export { NotAuthorException, NotRoleException, DataNotFound, LoginFailed };
