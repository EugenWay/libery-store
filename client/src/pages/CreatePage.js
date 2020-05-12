import React, { useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { useMessage } from "../hooks/messageHook";
import { Result } from "../components/Result";

export const CreatePage = () => {
    const { error, request, clearError } = useHttp();
    const message = useMessage();

    const [loaded, setLoaded] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        genere: "",
        price: null,
        image: "",
    });

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });

        console.log(form);
    };

    const imageHandler = (event) => {
        setForm({
            ...form,
            image: event.target.value,
        });

        console.log(form);
    };

    const addHandler = async () => {
        try {
            const data = await request("/api/product", "POST", {
                ...form,
                price: Number(form.price),
            });
            message(data.message);
            setLoaded(true);
            console.log("DATA", data);
        } catch (err) {}
    };

    if (loaded) {
        return <Result title={form.title} />;
    }

    return (
        <div className="row">
            <div className="auth-w col s12 m12">
                <div className="card grey lighten-4">
                    <div className="card-content dark-text">
                        <span className="card-title">Create new Book</span>
                        <div>
                            <div className="input-field">
                                <i className="material-icons prefix">person</i>
                                <input
                                    type="text"
                                    id="title"
                                    className="add-title"
                                    name="title"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="input-field">
                                <i className="material-icons prefix">vpn_key</i>
                                <textarea
                                    id="description"
                                    className="materialize-textarea"
                                    name="description"
                                    data-length="120"
                                    onChange={changeHandler}
                                />

                                <label htmlFor="description">Desription</label>
                            </div>
                            <div className="input-field">
                                <select
                                    onChange={changeHandler}
                                    id="genere"
                                    className="browser-default"
                                    name="genere"
                                >
                                    <option value="Fiction">Fiction</option>
                                    <option value="Navela">Novela</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Horror">Horror</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="input-field col s3 m3">
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        onChange={changeHandler}
                                    />

                                    <label htmlFor="price">Price</label>
                                </div>
                            </div>
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>File</span>
                                    <input
                                        type="file"
                                        onChange={imageHandler}
                                        name="image"
                                    />
                                </div>
                                <div className="file-path-wrapper">
                                    <input
                                        className="file-path validate"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-action valign-wrapper">
                        <button
                            className="btn waves-effect waves-light"
                            style={{ marginRight: 20 }}
                            onClick={addHandler}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
