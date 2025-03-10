import CandidatureService from "../services/candidature.service";

class CandidatureController {
  constructor() {
    this.candidatureService = new CandidatureService();
  }

  async createCandidature(req, res, next) {
    try {
      const { idMission } = req.body;
      const candidature = await this.candidatureService.createCandidature(
        req.userId,
        idMission
      );

      res.status(201).json(candidature);
    } catch (err) {
      console.log("controller create candidature");
      console.error(err);
    }
  }

  async getCandidatureById(req, res, next) {
    try {
      const id = req.params.id;
      const candidature = await this.candidatureService.getCandidatureById(id);
      res.status(200).json(candidature);
    } catch (err) {
      console.log("controller get candid by id");
      console.error(err);
    }
  }

  async getAllCandidatures(req, res, next) {
    try {
      const candidatures = await this.candidatureService.getAllCandidatures();
      res.status(200).json(candidatures);
    } catch (err) {
      console.log("controller get all candid");
      console.error(err);
    }
  }

  async updateState(req, res, next) {
    try {
      const id = req.params.id;
      const { state } = req.body;
      const candidature = await this.candidatureService.updateState(id, state);
      res.status(200).json(candidature);
    } catch (err) {
      console.log("controller update candid");
      console.error(err);
    }
  }

  async deleteCandidature(req, res, next) {
    try {
      const id = req.params.id;
      await this.candidatureService.deleteCandidature(id);
      res.status(200).json({ message: "candidature supprimée" });
    } catch (err) {
      console.log("controller delete candid");
      console.error(err);
    }
  }
}

export default CandidatureController;
