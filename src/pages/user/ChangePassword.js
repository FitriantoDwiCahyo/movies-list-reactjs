import React from "react";
import { Form, Input, Button, message, Card } from "antd";
import APISanber from "../../api/API";

export default function ChangePassword() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        APISanber.post("/change-password", {
            current_password: values.current_password,
            new_password: values.new_password,
            new_confirm_password: values.new_confirm_password,
        })
            .then((res) => {
                message.success("Password changed successfully!");
                form.resetFields();
            })
            .catch((err) => {
                const data = JSON.parse(err.response.data);
                for (const [, value] of Object.entries(data)) {
                    value.forEach((element) => {
                        message.error(element);
                    });
                }
            });
    };

    return (
        <Card style={{ maxWidth: 500, margin: "0 auto" }}>
            <Form
                form={form}
                layout={"vertical"}
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="current_password"
                    label="Current Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password size={"large"} />
                </Form.Item>

                <Form.Item
                    name="new_password"
                    label="New Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your new password!",
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
                    name="new_confirm_password"
                    label="Confirm New Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your new password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (
                                    !value ||
                                    getFieldValue("new_password") === value
                                ) {
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
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
