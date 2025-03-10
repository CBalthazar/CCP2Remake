import express from "express";
import UserController from "../controllers/user.controller.js";
import authToken from "../middlewares/auth.middleware.js";

const userController = new UserController();
const router = express.Router();

router.post("/register", (req, res, next) => {
  userController.registerUser(req, res, next);
});

router.post("/login", (req, res, next) => {
  userController.loginUser(req, res, next);
});

router.post("/logout", (req, res, next) => {
  userController.logoutUser(req, res, next);
});

router.get("/", authToken, (req, res, next) => {
  userController.getUserById(req, res, next);
});

router.get("/all", authToken, (req, res, next) => {
  userController.getAllUsers(req, res, next);
});

router.put("/", authToken, (req, res, next) => {
  userController.updateUser(req, res, next);
});

router.delete("/", authToken, (req, res, next) => {
  userController.deleteUser(req, res, next);
});

export default router;
