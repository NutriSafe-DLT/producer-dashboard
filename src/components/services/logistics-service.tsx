import instance from "../../axios";
import authHeader from "./auth-header";

class LogisticsService {

// READ operations
  getShipment(ID: number, privateDataCollectionName: string) {
    return instance.get("/get?function=readShipment", {
      headers: authHeader(),
      params: {
          args: [ID, privateDataCollectionName]
      }
    });
  }
}

export default new LogisticsService();