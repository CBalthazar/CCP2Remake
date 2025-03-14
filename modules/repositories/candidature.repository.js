import pool from "../../config/db.js";
import { v4 } from "uuid";
import { DataNotFound } from "../../errors/server.exceptions.js";

class CandidatureRepository {
  async createCandidature(idUser, idMission) {
    let conn;
    try {
      const id = v4();
      conn = await pool.connect();
      const [candidature] = await conn.query(
        "INSERT INTO Candidatures VALUES (?,?,?,DEFAULT) RETURNING *",
        [id, idUser, idMission]
      );
      return candidature;
    } catch (err) {
      console.log("repo create candidature");
      console.error(err);
    }
  }

  async getCandidatureById(id) {
    let conn;
    try {
      conn = await pool.connect();
      const [candidature] = await conn.query(
        "SELECT * FROM Candidatures WHERE id=?",
        [id]
      );
      if (!candidature) throw new DataNotFound("candidature");
      return candidature;
    } catch (err) {
      console.log("repo get candidature by id");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async getAllCandidatures() {
    let conn;
    try {
      conn = await pool.connect();
      const candidatures = await conn.query("SELECT * FROM Candidatures");
      return candidatures;
    } catch (err) {
      console.log("repo get all candidature");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async updateState(id, state) {
    let conn;
    try {
      conn = await pool.connect();
      await conn.query("UPDATE Candidatures SET state=? WHERE id=?", [
        state,
        id,
      ]);
      return await this.getCandidatureById(id);
    } catch (err) {
      console.log("repo update state");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async deleteCandidature(id) {
    let conn;
    try {
      conn = await pool.connect();
      await conn.query("DELETE FROM Candidatures WHERE id=?", [id]);
    } catch (err) {
      console.log("repo delete candidature");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }
}

export default CandidatureRepository;
