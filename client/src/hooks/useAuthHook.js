import { useCallback, useState, useEffect } from "react";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userID, setUserID] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserID(id);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userID: id,
                token: jwtToken,
            })
        );
    }, []);

    const logOut = useCallback(() => {
        setToken(null);
        setUserID(null);

        localStorage.removeItem("userData");
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData"));

        if (data && data.token) {
            login(data.token, data.userID);
        }
    }, [login]);

    return { login, logOut, token, userID };
};
