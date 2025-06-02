import { getAuthToken } from "../../../common/functions";

const ProtectedRoute = ({ children }) => {
    const token = getAuthToken();
    if (token) return <Navigate to="/home" replace />;
    return children;
}

export default ProtectedRoute;