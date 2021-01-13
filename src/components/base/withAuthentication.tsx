import * as React from "react";
import AuthService from "../services/user-service";

const WithAuthentication = ({ Component, requiredRole }) => {
  if (AuthService.hasRole(requiredRole)) return <Component />;
  else
    return (
      <h3>You are not authorized to access this part of the application</h3>
    );
};

export default WithAuthentication;
