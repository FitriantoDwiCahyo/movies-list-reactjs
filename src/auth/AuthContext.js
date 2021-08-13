import React, { createContext, useState, useEffect } from "react";
import { setClientToken } from "../api/API";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState(
        localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : { name: null, email: null, token: null }
    );

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
        if (auth?.token) {
            setClientToken(auth.token);
        }
        // console.log('auth', auth)
    }, [auth]);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    );
};
