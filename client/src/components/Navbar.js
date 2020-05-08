import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push("/login");
    };

    return (
        <nav>
            <div
                className="nav-wrapper blue darken-1"
                style={{ padding: "0 2rem" }}
            >
                <span className="brand-logo">LiberyStore</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/admin/create">Create</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin">All products</NavLink>
                    </li>
                    <li>
                        <a href="/" onClick={logoutHandler}>
                            LogOut
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
