import express from "express";
import CandidatureController from "../controllers/candidature.controller.js";
import authToken from "../middlewares/auth.middleware.js";
import isRole from "../middlewares/role.middleware.js";
import isAuthor from "../middlewares/author.middleware.js";

const candidatureController = new CandidatureController();
const router = express.Router();

router.post("/", authToken, isRole("benevole"), (req, res, next) => {
  candidatureController.createCandidature(req, res, next);
});

router.get("/all", authToken, (req, res, next) => {
  candidatureController.getAllCandidatures(req, res, next);
});

router.get("/:id", authToken, (req, res, next) => {
  candidatureController.getCandidatureById(req, res, next);
});

router.put("/:id", authToken, isRole("association"), (req, res, next) => {
  candidatureController.updateState(req, res, next);
});

router.delete("/:id", authToken, isAuthor, (req, res, next) => {
  candidatureController.deleteCandidature(req, res, next);
});

export default router;
