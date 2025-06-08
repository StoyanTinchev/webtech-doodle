import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const {isAuthenticated, loading} = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    // If not logged in, redirect to /login *and* remember current location
    return isAuthenticated
        ? <>{children}</>
        : <Navigate
            to="/login"
            replace
            state={{from: location}}
        />;
};

export default PrivateRoute;
