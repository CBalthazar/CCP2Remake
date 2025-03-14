import pool from "../../config/db.js";
import { v4 } from "uuid";
import { DataNotFound } from "../../errors/server.exceptions.js";
import { SqlError } from "mariadb";
import { MissingParameter } from "../../errors/database.exception.js";

class UserRepository {
  async registerUser(firstname, name, mail, hash, role) {
    const id = v4();
    let conn;
    try {
      conn = await pool.connect();
      const [user] = await conn.query(
        "INSERT INTO Users VALUES (?,?,?,?,?,?) RETURNING *",
        [id, firstname, name, mail, hash, role]
      );
      return user;
    } catch (err) {
      console.log("repo create user");
      if (err instanceof SqlError) {
        switch (err.no) {
          case 1018:
            throw new MissingParameter();
          default:
            throw new Error("unexpected");
        }
      }
    } finally {
      if (conn) conn.release();
    }
  }

  async getUserByMail(mail) {
    let conn;
    try {
      conn = await pool.connect();
      const [user] = await conn.query("SELECT * FROM Users WHERE mail=?", [
        mail,
      ]);
      if (!user) throw new DataNotFound("User");
      return user;
    } catch (err) {
      console.log("repo get user by id");
      throw new Error(err);
    } finally {
      if (conn) conn.release();
    }
  }
  async getUserById(id) {
    let conn;
    try {
      conn = await pool.connect();
      const [user] = await conn.query("SELECT * FROM Users WHERE id=?", [id]);
      if (!user) throw new DataNotFound("User");
      return user;
    } catch (err) {
      console.log("repo get user by id");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async getAllUsers() {
    let conn;
    try {
      conn = await pool.connect();
      let users = conn.query("SELECT id, firstname, name FROM Users");
      return users;
    } catch (err) {
      console.log("repo get all users");
    } finally {
      if (conn) conn.release();
    }
  }

  async updateUser(id, firstname, name, mail, hash) {
    let conn;
    try {
      conn = await pool.connect();
      await conn.query(
        "UPDATE Users SET firstname=?, name=?, mail=?, password=? WHERE id=?",
        [firstname, name, mail, hash, id]
      );
      return await this.getUserById(id);
    } catch (err) {
      console.log("repo update user");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async deleteUser(id) {
    let conn;
    try {
      conn = await pool.connect();
      await conn.query("DELETE FROM Users WHERE id=?", [id]);
    } catch (err) {
      console.log("repo delete user");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }
}

export default UserRepository;
