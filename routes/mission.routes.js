import express from "express";
import MissionController from "../controllers/mission.controller.js";
import authToken from "../middlewares/auth.middleware.js";
import isRole from "../middlewares/role.middleware.js";
import isAuthor from "../middlewares/author.middleware.js";
import validate from "../validate.js";
import missionSchema from "../validator.js";

const missionController = new MissionController();
const router = express.Router();

router.post(
  "/",
  validate(missionSchema),
  authToken,
  isRole("association"),
  (req, res, next) => {
    missionController.createMission(req, res, next);
  }
);

router.get("/all", authToken, (req, res, next) => {
  missionController.getAllMissions(req, res, next);
});

router.get("/:id", authToken, (req, res, next) => {
  missionController.getMissionById(req, res, next);
});

router.put(
  "/:id",
  validate(missionSchema),
  authToken,
  isAuthor,
  (req, res, next) => {
    missionController.updateMission(req, res, next);
  }
);

router.delete("/:id", authToken, isAuthor, (req, res, next) => {
  missionController.deleteMission(req, res, next);
});

export default router;
