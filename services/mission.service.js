import MissionRepository from "../repositories/mission.repository.js";

class MissionService {
  constructor() {
    this.missionRepository = new MissionRepository();
  }

  async createMission(title, description, idAssociation) {
    return await this.missionRepository.createMission(
      title,
      description,
      idAssociation
    );
  }

  async getMissionById(id) {
    return await this.missionRepository.getMissionById(id);
  }

  async getAllMissions() {
    return await this.missionRepository.getAllMissions();
  }

  async updateMission(id, title, description, idAssociation) {
    return await this.missionRepository.updateMission(
      id,
      title,
      description,
      idAssociation
    );
  }

  async deleteMission(id) {
    return await this.missionRepository.deleteMission(id);
  }
}

export default MissionService;
