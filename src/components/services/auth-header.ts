export default function authHeader() {
  if (typeof window !== "undefined") {
    //only execute on client side
    const JWT = localStorage.getItem("JWT");

    if (JWT) {
      return { Authorization: "Bearer " + JWT };
    } else {
      return {};
    }
  }
}
