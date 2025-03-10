import pool from "../config/db";
import { v4 } from "uuid";

class MissionRepository {
  async createMission(title, description, idAssociation) {
    const id = v4();
    let conn;
    try {
      conn = await pool.getConnection();
      const [mission] = await conn.query(
        "INSERT INTO Missions VALUES (?,?,?,?)",
        [id, title, description, idAssociation]
      );
      return mission;
    } catch (err) {
      console.log("repo create mission");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async getMissionById(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const [mission] = await conn.query("SELECT * FROM Missions WHERE id=?", [
        id,
      ]);
      if (!mission) throw new Error("mission inexistante");
      return mission;
    } catch (err) {
      console.log("repo get mission by id");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async getAllMissions() {
    let conn;
    try {
      conn = await pool.getConnection();
      const missions = await conn.query("SELECT * FROM Missions");
      return missions;
    } catch (err) {
      console.log("repo get all missions");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async updateMission(id, title, description, idAssociation) {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(
        "UPDATE Missions SET id=?, title=?, description=?, idAssociation=?",
        [id, title, description, idAssociation]
      );
      return await this.getMissionById(id);
    } catch (err) {
      console.log("repo update mission");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async deleteMission(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query("DELETE Missions WHERE id=?", [id]);
    } catch (err) {
      console.log("repo delete mission");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }
}

export default MissionRepository;
