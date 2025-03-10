import "dotenv/config";
import mariadb from "mariadb";

const pool = mariadb.createPool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  multipleStatements: true,
});

const seed = async () => {
  try {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      await conn.query(`
        DROP TABLE IF EXISTS Candidatures;
        DROP TABLE IF EXISTS Missions;
        DROP TABLE IF EXISTS Associations;
        DROP TABLE IF EXISTS Users;`);

      await conn.query(`
        CREATE TABLE Users(
        id UUID PRIMARY KEY,
        firstname VARCHAR(64) NOT NULL,
        name VARCHAR(64) NOT NULL,
        mail VARCHAR(64) NOT NULL,
        password VARCHAR(128) NOT NULL,
        role ENUM('benevole', 'association') DEFAULT "benevole"
        );`);

      await conn.query(`
        CREATE TABLE Associations(
        id UUID PRIMARY KEY,
        name VARCHAR(64) NOT NULL
        );`);

      await conn.query(`
        CREATE TABLE Missions(
        id UUID PRIMARY KEY,
        title VARCHAR(64) NOT NULL,
        description TEXT,
        idAssociation UUID,
        FOREIGN KEY (idAssociation) REFERENCES Users(id)
        );`);

      await conn.query(`
        CREATE TABLE Candidatures(
        id UUID PRIMARY KEY,
        idUser UUID,
        idMission UUID,
        state BOOL DEFAULT NULL,
        FOREIGN KEY (idUser) REFERENCES Users(id),
        FOREIGN KEY (idMission) REFERENCES Missions(id) 
        );`);
      await conn.commit();
      console.log("DB seeded");
    } catch (err) {
      await conn.rollback();
      throw err;
    }
  } catch (err) {
    console.log(err);
  }
};

seed().then(() => {
  pool.end();
});
