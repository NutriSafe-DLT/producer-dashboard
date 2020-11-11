import instance from "../../axios";

class AuthService {
  login(username, password) {
    return instance
      .post("auth", {
        username,
        password,
      })
      .then((response) => {
        console.log("Success service");
        if (response.data.token) {
          localStorage.setItem("JWT", response.data.token);
        }
      });
  }

  logout() {
    localStorage.removeItem("JWT");
  }

  getCurrentUser() {
    // Parse JWT
  }
}

export default new AuthService();
