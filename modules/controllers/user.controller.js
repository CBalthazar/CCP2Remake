import jwt from "jsonwebtoken";
import userService from "../../instanciation.js";
class UserController {
  constructor() {
    this.userService = userService;
  }

  async registerUser(req, res, next) {
    try {
      const { firstname, name, mail, password, role } = req.body;
      const user = await this.userService.registerUser(
        firstname,
        name,
        mail,
        password,
        role
      );

      delete user.password;

      res.status(201).json(user);
    } catch (err) {
      console.log("controller CreateUser");
    }
  }

  async loginUser(req, res, next) {
    try {
      const { mail, password } = req.body;
      const user = await this.userService.loginUser(mail, password);

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      res.cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
      });

      delete user.mail;
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      console.log("controller login User");
      console.error(err);
    }
  }

  async logoutUser(req, res, next) {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out" });
  }

  async getUserById(req, res, next) {
    try {
      const user = await this.userService.getUserById(req.userId);

      delete user.mail;
      delete user.password;

      res.status(200).json(user);
    } catch (err) {
      console.log("controller get user by id");
      console.error(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await this.userService.getAllUsers();
      //mail and password don't leave the DB in this route
      res.status(200).json(users);
    } catch (err) {
      console.log("controller get all users");
      console.error(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { firstname, name, mail, password } = req.body;
      const updated = await this.userService.updateUser(
        req.userId,
        firstname,
        name,
        mail,
        password
      );

      delete updated.mail;
      delete updated.password;

      res.status(200).json(updated);
    } catch (err) {
      console.log("controller update user");
      console.error(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await this.userService.deleteUser(req.userId);
      res.status(200).json({ message: "user deleted" });
    } catch (err) {
      console.log("controller delete user");
      console.error(err);
    }
  }
}
export default UserController;
