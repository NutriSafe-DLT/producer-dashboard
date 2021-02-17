import instance from "../../axios";
import authHeader from "./auth-header";
import Product from "../../model/product";
import { AxiosResponse } from "axios";

class ProductService {
  private companyName: string = process.env.NEXT_PUBLIC_COMPANY_NAME;

  createProduct(product: Product) {
    return instance.post("/submit?function=createObject", product, {
      headers: authHeader(),
    });
  }

  // should be changed by the backend at some point
  // to return JSON, not String
  productsInbox(): Promise<AxiosResponse<string>> {
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

  productsOutbox(): Promise<AxiosResponse<string>> {
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

  productStock(): Promise<AxiosResponse<string>> {
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

  acceptProductFromInbox(productId: string) {
    return instance.post(
      "/submit?function=changeOwner",
      { id: productId },
      {
        headers: authHeader(),
      }
    );
  }

  sendProductToOutboxForReceiver(productId: string, receiver: string) {
    return instance.post(
      "/submit?function=setReceiver",
      { id: productId, receiver },
      {
        headers: authHeader(),
      }
    );
  }

  withdrawProductFromOutbox(productId: string) {
    return this.sendProductToOutboxForReceiver(productId, "");
  }

  activateAlarmForProduct(productId: string) {
    return instance.post(
      "/submit?function=activateAlarm",
      { id: productId },
      {
        headers: authHeader(),
      }
    );
  }

  deleteProduct(productId: string) {
    return instance.post(
      "/submit?function=deleteObject",
      { id: productId },
      {
        headers: authHeader(),
      }
    );
  }
}

export default new ProductService();
