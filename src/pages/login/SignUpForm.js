import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import APISanber from "../../api/API";
import { AuthContext } from "../../auth/AuthContext";

export default function SignUpForm() {
    const [, setAuth] = useContext(AuthContext);

    const onFinish = (values) => {
        APISanber.post("/register", {
            name: values.name,
            email: values.email,
            password: values.password,
        })
            .then((res) => {
                var user = res.data.user;
                var token = res.data.token;
                var currentUser = { name: user.name, email: user.email, token };
                setAuth(currentUser);
                alert("Register Success! Please try to login.");
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <Form
            layout={"vertical"}
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please input your Name!",
                    },
                ]}
            >
                <Input size={"large"} />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!",
                    },
                ]}
            >
                <Input size={"large"} />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                    {
                        min: 6,
                        message: "Password must be minimum 6 characters.",
                    },
                ]}
                hasFeedback
            >
                <Input.Password size={"large"} />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(
                                "The two passwords that you entered do not match!"
                            );
                        },
                    }),
                ]}
            >
                <Input.Password size={"large"} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}
