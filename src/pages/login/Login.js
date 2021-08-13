import React from "react";
import { Card, Tabs } from "antd";
import {Link} from "react-router-dom";
import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <div
            className="card-container"
            style={{ maxWidth: 500, margin: "0 auto" }}
        >
            <h2 style={{textAlign: "center"}}>Login</h2>  
            <Card>
                <LoginForm />
            </Card>  
            <Link to="/register" style={{textDecoration:"none"}}>
                  Don't have an account? Sign Up
            </Link>  
        </div>
    );
}
