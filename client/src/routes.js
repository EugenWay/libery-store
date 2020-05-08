import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AdminPage } from "./pages/AdminPage";
import { IndexPage } from "./pages/IndexPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DeteilPage";
import { AuthPage } from "./pages/AuthPage";
import { Navbar } from "./components/Navbar";

const Wrapper = (props) => {
    if (props.withNavbar) {
        return (
            <div>
                <Navbar />
                <div className="container">{props.cildrenComponent}</div>
            </div>
        );
    }

    return <div className="container">{props.cildrenComponent}</div>;
};

export const useRoutes = (isAutentificated) => {
    if (isAutentificated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <Wrapper cildrenComponent={<IndexPage />} />
                </Route>
                <Route path="/admin" exact>
                    <Wrapper
                        cildrenComponent={<AdminPage />}
                        withNavbar={true}
                    />
                </Route>
                <Route path="/admin/create" exact>
                    <Wrapper
                        cildrenComponent={<CreatePage />}
                        withNavbar={true}
                    />
                </Route>
                <Route path="/admin/product-deteil:id">
                    <Wrapper
                        cildrenComponent={<DetailPage />}
                        withNavbar={true}
                    />
                </Route>
                <Redirect to="/admin" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact>
                <Wrapper cildrenComponent={<IndexPage />} />
            </Route>
            <Route path="/login" exact>
                <Wrapper cildrenComponent={<AuthPage />} />
            </Route>
            <Redirect to="/login" />
        </Switch>
    );
};
