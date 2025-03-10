import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";

async function authToken(req, res, next) {
  try {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log("auth middleware token verification");
        next(err);
      }
      const userService = new UserService();
      try {
        const user = await userService.getUserById(decoded.id);
        req.userId = user.id;
        next();
      } catch (err) {
        console.log("auth middleware fetch user");
        console.error(err);
      }
    });
  } catch (err) {
    console.log("auth middleware");
    console.error(err);
  }
}

export default authToken;
