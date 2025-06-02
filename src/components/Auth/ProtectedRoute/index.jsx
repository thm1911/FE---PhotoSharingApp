import { getAuthToken } from "../../../common/functions";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = getAuthToken();
    if (token == null) return <Navigate to="/" replace />;
    return children;
}

export default ProtectedRoute;