import instance from "../../axios";
import authHeader from "./auth-header";

class UserManagementService {
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

  linkUserToWhitelist({ whitelistName, username }) {
    return instance.post(
      "/submit?function=linkUserToWhitelist",
      { whitelist: whitelistName, username },
      {
        headers: authHeader(),
      }
    );
  }

  unlinkUserFromWhitelist({ whitelistName, username }) {
    return instance.post(
      "/submit?function=unlinkUserFromWhitelist",
      { whitelist: whitelistName, username },
      {
        headers: authHeader(),
      }
    );
  }

  // Whitelists
  createWhitelist(whitelistName: string) {
    return instance.post(
      "/submit?function=createWhitelist",
      { whitelist: whitelistName },
      {
        headers: authHeader(),
      }
    );
  }
  deleteWhitelist(whitelistName: string) {
    return instance.post(
      "/submit?function=deleteWhitelist",
      { whitelist: whitelistName },
      {
        headers: authHeader(),
      }
    );
  }

  // function is a keyword in Typescript, so func is used
  linkFunctionToWhitelist({ whitelistName, functionName }) {
    return instance.post(
      "/submit?function=linkFunctionToWhitelist",
      { whitelist: whitelistName, function: functionName },
      {
        headers: authHeader(),
      }
    );
  }

  unlinkFunctionFromWhitelist({ whitelistName, functionName }) {
    return instance.post(
      "/submit?function=unlinkFunctionFromWhitelist",
      { whitelist: whitelistName, function: functionName },
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
