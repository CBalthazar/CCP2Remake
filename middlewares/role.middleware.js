import { NotRoleException } from "../errors/server.exceptions.js";
import UserService from "../services/user.service.js";

function isRole(role) {
  return async (req, res, next) => {
    try {
      const userService = new UserService();
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
