import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  console.log("====================================");
  console.log(token);
  console.log("====================================");
  if (!token) {
    return <Navigate to="/Login" replace />; // no token → redirect to login
  }
  return <>{children}</>; // has token → show the page
};

export default ProtectedRoute;
