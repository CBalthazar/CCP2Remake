import UserRepository from "../repositories/user.repository.js";
import argon2 from "argon2";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(firstname, name, mail, password, role) {
    try {
      const hash = await argon2.hash(password);
      return await this.userRepository.registerUser(
        firstname,
        name,
        mail,
        hash,
        role
      );
    } catch (err) {
      console.error("service createUser ");
    }
  }

  async loginUser(mail, password) {
    try {
      const user = await this.getUserByMail(mail);
      console.log(password);
      if (!(await argon2.verify(user.password, password))) {
        throw new Error("login wrong");
      }
      return user;
    } catch (err) {
      console.log("service loginUser");
      console.error(err);
    }
  }

  async getUserByMail(mail) {
    return await this.userRepository.getUserByMail(mail);
  }

  async getUserById(id) {
    return await this.userRepository.getUserById(id);
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async updateUser(id, firstname, name, mail, password) {
    try {
      const hash = await argon2.hash(password);
      return await this.userRepository.updateUser(
        id,
        firstname,
        name,
        mail,
        hash
      );
    } catch (err) {
      console.log("service update user");
      console.error(err);
    }
  }

  async deleteUser(id) {
    return await this.userRepository.deleteUser(id);
  }
}
export default UserService;
