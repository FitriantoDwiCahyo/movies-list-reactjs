import React, { useContext } from "react";
import { Form, Input, Button, message, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import APISanber from "../../api/API";
import { AuthContext } from "../../auth/AuthContext";

export default function LoginForm() {
    const [, setAuth] = useContext(AuthContext);

    const onFinish = (values) => {
        APISanber.post("/user-login", {
            email: values.email,
            password: values.password,
        })
            .then((res) => {
                var user = res.data.user;
                var token = res.data.token;
                var currentUser = { name: user.name, email: user.email, token };
                setAuth(currentUser);
                notification.open({
                    message: `Halo ${user.name}!`,
                    description: "Selamat datang... :)",
                });
            })
            .catch((err) => {
                message.error(err.response.data.error);
            });
    };

    return (
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Please input your Email!",
                    },
                ]}
            >
                <Input
                    size={"large"}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!",
                    },
                ]}
            >
                <Input.Password
                    size={"large"}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
}
