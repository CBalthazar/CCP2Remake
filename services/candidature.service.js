import CandidatureRepository from "../repositories/candidature.repository.js";

class CandidatureService {
  constructor() {
    this.candidatureRepository = new CandidatureRepository();
  }

  async createCandidature(idUser, idMission) {
    return await this.candidatureRepository.createCandidature(
      idUser,
      idMission
    );
  }

  async getCandidatureById(id) {
    return await this.candidatureRepository.getCandidatureById(id);
  }

  async getAllCandidatures() {
    return await this.candidatureRepository.getAllCandidatures();
  }

  async updateState(id, state) {
    return await this.candidatureRepository.updateState(id, state);
  }

  async deleteCandidature(id) {
    return await this.candidatureRepository.deleteCandidature(id);
  }
}

export default CandidatureService;
