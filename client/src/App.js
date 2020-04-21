import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/useAuthHook";
import "materialize-css";
import { AuthContext } from "./context/authContext";

function App() {
    const { login, logout, token, userID } = useAuth();
    const isAuthenticated = !!token;
    console.log(AuthContext);
    const routes = useRoutes(isAuthenticated);
    return (
        <AuthContext.Provider
            value={{
                token,
                userID,
                login,
                logout,
                isAuthenticated,
            }}
        >
            <Router>
                <div className="container">{routes}</div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
