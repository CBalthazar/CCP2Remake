import UserService from "../services/user.service.js";

function isRole(role) {
  return async (req, res, next) => {
    try {
      const userService = new UserService();
      const user = await userService.getUserById(req.userId);
      if (user.role != role) throw new Error(`you are not ${role}`);
      next();
    } catch (err) {
      console.log("middleware isRole");
      console.error(err);
    }
  };
}
export default isRole;
