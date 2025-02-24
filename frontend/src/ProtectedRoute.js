import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem("role"); 

  if (userRole !== "teacherId") {
    alert("Access Denied: Admins only.", userRole);
    return <Navigate to="/" />; 
  }

  return children; 
};

export default ProtectedRoute;