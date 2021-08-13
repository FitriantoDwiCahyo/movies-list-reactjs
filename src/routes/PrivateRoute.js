import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
    const [auth] = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth?.token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
