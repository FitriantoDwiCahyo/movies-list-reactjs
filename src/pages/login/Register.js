import React from "react";
import { Card, Tabs } from "antd";
import {Link} from "react-router-dom";
import SignUpForm from "./SignUpForm";

export default function Login() {
    return (
        <div
            className="card-container"
            style={{ maxWidth: 500, margin: "0 auto" }}
        >   
            <h2 style={{textAlign: "center" }}>Register</h2>
            <Card>
                <SignUpForm />
            </Card>
            <Link to="/login" style={{textDecoration:"none"}}>
                Already have an account? Sign in
            </Link>
        </div>
    );
}