import { NotRoleException } from "../errors/server.exceptions.js";
import userService from "../instanciation.js";

function isRole(role) {
  return async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.userId);
      if (user.role != role) throw new NotRoleException(role);
      next();
    } catch (err) {
      console.log("middleware isRole");
      next(err);
    }
  };
}
export default isRole;
