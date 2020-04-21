import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import { useMessage } from "../hooks/messageHook";
import { AuthContext } from "../context/authContext";
// import axios from "axios";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const { loading, error, request, clearError } = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        console.log("err", error);
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
            [event.target.name]: event.target.value,
        });

        console.log(form);
    };

    const loginHandler = async (event) => {
        event.preventDefault();

        try {
            console.log({ ...form });
            const data = await request("/api/auth/login", "POST", { ...form });
            message(data.message);
            auth.login(data.token, data.userId);
        } catch (err) {}
    };

    const registerHandler = async (event) => {
        event.preventDefault();

        try {
            console.log({ ...form });
            const data = await request("/api/auth/register", "POST", {
                ...form,
            });
            message(data.message);
            console.log("DATA", data);
        } catch (err) {}
    };

    return (
        <div className="row">
            <div className="auth-w col s12 m4 offset-m4">
                <div className="card grey lighten-4">
                    <div className="card-content dark-text">
                        <span className="card-title">Autorization</span>
                        <div>
                            <div className="input-field">
                                <i className="material-icons prefix">person</i>
                                <input
                                    type="text"
                                    id="email"
                                    className="auth-email"
                                    name="email"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">E-mail</label>
                            </div>
                            <div className="input-field">
                                <i className="material-icons prefix">vpn_key</i>
                                <input
                                    type="password"
                                    id="password"
                                    className="auth-password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action valign-wrapper">
                        <button
                            className="btn waves-effect waves-light"
                            style={{ marginRight: 20 }}
                            onClick={loginHandler}
                        >
                            Login
                        </button>
                        <Link
                            to="#"
                            className="right"
                            onClick={registerHandler}
                        >
                            Careate account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
