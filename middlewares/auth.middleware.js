import jwt from "jsonwebtoken";
import userService from "../instanciation.js";
import { DataNotFound } from "../errors/server.exceptions.js";

async function authToken(req, res, next) {
  try {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log("auth middleware token verification");
        next(err);
      }
      try {
        const user = await userService.getUserById(decoded.id);
        req.userId = user.id;
        next();
      } catch (err) {
        console.log("auth middleware fetch user");
        next(new DataNotFound("User"));
      }
    });
  } catch (err) {
    console.log("auth middleware");
    console.error(err);
  }
}

export default authToken;
