import MissionService from "../services/mission.service.js";

class MissionController {
  constructor() {
    this.missionService = new MissionService();
  }

  async createMission(req, res, next) {
    try {
      const { title, description, idAssociation } = req.body;
      const mission = await this.missionService.createMission(
        title,
        description,
        idAssociation
      );

      delete mission.password;

      res.status(201).json(mission);
    } catch (err) {
      console.log("controller create mission");
      console.error(err);
    }
  }

  async getMissionById(req, res, next) {
    try {
      const id = req.params.id;
      const mission = await this.missionService.getMissionById(id);

      res.status(200).json(mission);
    } catch (err) {
      console.log("controller get mission by id");
      console.error(err);
    }
  }

  async getAllMissions(req, res, next) {
    try {
      const missions = await this.missionService.getAllMissions();
      res.status(200).json(missions);
    } catch (err) {
      console.log("controller get all missions");
      console.error(err);
    }
  }

  async updateMission(req, res, next) {
    try {
      const { title, description } = req.body;
      const id = req.params.id;
      const updated = await this.missionService.updateMission(
        id,
        title,
        description
      );

      res.status(200).json(updated);
    } catch (err) {
      console.log("controller update mission");
      console.error(err);
    }
  }

  async deleteMission(req, res, next) {
    try {
      const id = req.params.id;
      await this.missionService.deleteMission(id);
      res.status(200).json({ message: "mission deleted" });
    } catch (err) {
      console.log("controller delete mission");
      console.error(err);
    }
  }
}

export default MissionController;
