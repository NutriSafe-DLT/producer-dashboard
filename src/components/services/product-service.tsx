import instance from "../../axios";
import authHeader from "./auth-header";
import Product from "../../model/product";

class ProductService {
  private companyName: string = "DeoniMSP"; // change to env variable at some point

  createProduct(product: Product) {
    return instance.post("/submit?function=createObject", product, {
      headers: authHeader(),
    });
  }

  productsInbox() {
    return instance.post(
      "/select?function=selectChaincode",
      {
        selector: {
          receiver: this.companyName,
        },
      },
      {
        headers: authHeader(),
      }
    );
  }

  productsOutbox() {
    return instance.post(
      "/select?function=selectChaincode",
      {
        selector: {
          actualOwner: this.companyName,
          receiver: {
            $ne: "",
          },
        },
      },
      {
        headers: authHeader(),
      }
    );
  }

  productStock() {
    return instance.post(
      "/select?function=selectChaincode",
      {
        selector: {
          actualOwner: this.companyName,
          receiver: {
            $eq: "",
          },
        },
      },
      {
        headers: authHeader(),
      }
    );
  }

  acceptProductFromInbox(id: string) {
    return instance.post(
      "/submit?function=changeOwner",
      { id },
      {
        headers: authHeader(),
      }
    );
  }

  sendProductToOutboxForReceiver(id: string, receiver: string) {
    return instance.post(
      "/submit?function=setReceiver",
      { id, receiver },
      {
        headers: authHeader(),
      }
    );
  }

  withdrawProductFromOutbox(id: string) {
    return this.sendProductToOutboxForReceiver(id, "");
  }

  activateAlarmForProduct(id: string) {
    return instance.post(
      "/submit?function=activateAlarm",
      { id },
      {
        headers: authHeader(),
      }
    );
  }

  deleteProduct(id: string) {
    return instance.post(
      "/submit?function=deleteObject",
      { id },
      {
        headers: authHeader(),
      }
    );
  }
}

export default new ProductService();
