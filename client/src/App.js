import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/useAuthHook";
import { AuthContext } from "./context/authContext";
import { Navbar } from "./components/Navbar";
// import { Loader } from "./components/Loader";
import "materialize-css";

function App() {
    const { token, login, logout, userID } = useAuth();
    const isAuthenticated = !!token;
    console.log("isAuth", isAuthenticated);
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                userID,
                isAuthenticated,
            }}
        >
            <Router>
                {isAuthenticated && <Navbar />}
                <div className="container">{routes}</div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
