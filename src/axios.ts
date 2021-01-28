import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as jwt from "jsonwebtoken";

const ONE_HOUR_IN_SECONDS:number = 3600;

const useMockedBackend: boolean = process.env.NEXT_PUBLIC_USE_MOCKED_BACKEND === "TRUE" ? true : false;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20000,
  headers: {},
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      alert("You are not authorized (401)");
    }
    if (response.status === 403) {
      alert("You are not authorized for this action (403)");
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);
/* Mock REST API customized responses sections starts below (only used is NEXT_PUBLIC_USE_MOCKED_BACKEND is set to TRUE) */
if ( useMockedBackend ) {
  var mockHelper = new MockAdapter(axiosInstance);

  var mockJWTToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iLCJST0xFX01FTUJFUiIsIlJPTEVfVVNFUiJdLCJpYXQiOjE2MTA0Mzk4MTEsImV4cCI6MTYxMDQ0MzQxMX0.LHo2UIlZt3aD-mQ4uQ7xsmD_2sqCzS3zzcxj7GUnY-4";
  var decodedJWTToken = jwt.decode(mockJWTToken, { complete: true }) as any;
  //TODO: maybe deep copy the damn payload...
  var newTOken = jwt.sign({
    payload: {...decodedJWTToken.payload},
    exp: Math.floor(Date.now() / 1000 + ONE_HOUR_IN_SECONDS)
  },'secret');
  
  
  mockHelper.onPost("/auth").reply(200,
    {
      "username":"admin",
      "token": mockJWTToken,
      "date": decodedJWTToken.payload.exp
    }
  );
  
  mockHelper.onGet("/get",{ params: { function: "META_readMetaDef" } }).reply(200,
    {
      "productNameToAttributesMap": {
        "milk": [
            "Quality"
        ],
        "delivery": [
            "barcode",
            "lotid",
            "bestbeforedate",
            "state"
        ],
        "fresh_milk": [
            "barcode",
            "lotid",
            "bestbeforedate",
            "state"
        ],
        "cheese": [
            "Quality",
            "barcode",
            "lotid",
            "bestbeforedate",
            "state"
        ]
    },
    "unitList": [
        "Liter",
        "Package"
    ],
    "attributeToDataTypeMap": {
        "light": "String",
        "Quality": "Integer",
        "cows": "Integer",
        "bestbeforedate": "String",
        "lotid": "Integer",
        "state": "String",
        "barcode": "String",
        "Protein": "Integer"
    }
    }
  );
}


export default axiosInstance;
