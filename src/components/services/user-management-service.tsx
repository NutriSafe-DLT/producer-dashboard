import instance from "../../axios";
import authHeader from "./auth-header";

class UserManagementService {
  // CREATE, UPDATE, DELETE
  // Users:
  createUser(username: string, password: string) {
    return instance.post(
      "/submit?function=createUser",
      { username, password },
      {
        headers: authHeader(),
      }
    );
  }

  deleteUser(username: string) {
    return instance.post(
      "/submit?function=deleteUser",
      { username },
      {
        headers: authHeader(),
      }
    );
  }

  linkUserToWhitelist({ whitelist, username }) {
    return instance.post(
      "/submit?function=linkUserToWhitelist",
      { whitelist, username },
      {
        headers: authHeader(),
      }
    );
  }

  unlinkUserFromWhitelist({ whitelist, username }) {
    return instance.post(
      "/submit?function=unlinkUserFromWhitelist",
      { whitelist, username },
      {
        headers: authHeader(),
      }
    );
  }

  // Whitelists
  createWhitelist(whitelist: string) {
    return instance.post(
      "/submit?function=createWhitelist",
      { whitelist },
      {
        headers: authHeader(),
      }
    );
  }
  deleteWhitelist(whitelist: string) {
    return instance.post(
      "/submit?function=deleteWhitelist",
      { whitelist },
      {
        headers: authHeader(),
      }
    );
  }

  // function is a keyword in Typescript, so func is used
  linkFunctionToWhitelist(whitelist: string, func: string) {
    return instance.post(
      "/submit?function=linkFunctionToWhitelist",
      { whitelist, function: func },
      {
        headers: authHeader(),
      }
    );
  }

  unlinkFunctionFromWhitelist(whitelist: string, func: string) {
    return instance.post(
      "/submit?function=unlinkFunctionFromWhitelist",
      { whitelist, function: func },
      {
        headers: authHeader(),
      }
    );
  }

  // READ
  getAllUsers() {
    return instance.get("/get?function=getAllUsers", {
      headers: authHeader(),
    });
  }

  getWhitelists() {
    return instance.get("/get?function=getWhitelists", {
      headers: authHeader(),
    });
  }

  getCurrentUserInfo() {
    return instance.get("/get?function=getUserInfo", {
      headers: authHeader(),
    });
  }

  getUserInfo(username: string) {
    return instance.get("/get?function=getUserInfoOfUser&args=" + username, {
      headers: authHeader(),
    });
  }
}

export default new UserManagementService();
