import { NotAuthorException } from "../errors/server.exceptions.js";

async function isAuthor(req, res, next) {
  try {
    if (req.userId == req.params.id) throw new NotAuthorException();
    next();
  } catch (err) {
    console.log("middleware author");
    next(err);
  }
}

export default isAuthor;
