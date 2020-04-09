import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AdminPage } from "./pages/AdminPage";
import { IndexPage } from "./pages/IndexPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DeteilPage";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes = (isAutentificated) => {
    if (isAutentificated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <IndexPage />
                </Route>
                <Route path="/admin" exact>
                    <AdminPage />
                </Route>
                <Route path="/admin/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/admin/product-deteil:id">
                    <DetailPage />
                </Route>
                <Redirect to="/admin" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact>
                <IndexPage />
            </Route>
            <Route path="/login" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};
