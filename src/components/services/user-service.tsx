import instance from "../../axios";
import * as jwt from "jsonwebtoken";


class AuthService {
  login(username, password) {
    return instance
      .post("auth", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("JWT", response.data.token);
        }
      });
  }

  logout() {
    localStorage.removeItem("JWT");
  }

  getCurrentUser() {
    // const encodedJWT = localStorage.getItem("JWT");
    // const decodedJWT = jwt.decode(encodedJWT, { complete: true });
    // decodedJWT.payload.exp > Date.now();
  }

  isLoggedIn(): boolean {
    // only execute on client side
    if (typeof window === "object") {
      const encodedJWT = localStorage.getItem("JWT");
      if (!encodedJWT) return false;
      const decodedJWT = jwt.decode(encodedJWT, { complete: true });
      if (decodedJWT.payload.exp < Date.now() / 1000) return false;
      return true;
    }
  }

  isInOfflineMode(): boolean {
     return process.env.NEXT_PUBLIC_USE_MOCKED_BACKEND === "TRUE" ? true : false;
  }
  
  hasRole(role: string): boolean {
    if (typeof window === "object") {
      const encodedJWT = localStorage.getItem("JWT");
      if (!encodedJWT) return false;
      const decodedJWT = jwt.decode(encodedJWT, { complete: true });
      return decodedJWT.payload.authorities.includes(role);
    } else return false;
  }
}

export default new AuthService();
