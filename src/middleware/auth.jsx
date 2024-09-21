import { Navigate } from "react-router-dom";

export const AuthUser = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  return children;
};

export const LogoutUser = () => {
  const removeToken = localStorage.removeItem("authToken") ? true : false;

  if (removeToken) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
};
