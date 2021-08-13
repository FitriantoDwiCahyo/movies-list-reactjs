import React from "react";
import { Form, Input, Button, message, Col, Checkbox, Row } from "antd";
import APISanber from "../../api/API";
import TextArea from "antd/lib/input/TextArea";

export default function MovieCreate() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        APISanber.post("/data-game", {
            ...values,
            singlePlayer: values.play_mode.indexOf("singlePlayer") > -1,
            multiplayer: values.play_mode.indexOf("multiplayer") > -1,
        })
            .then((res) => {
                message.success("Data added successfully!");
                form.resetFields();
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div>
            <center>
                <h1 className={"title-medium"}>ADD A NEW GAME</h1>
            </center>
            <div
                style={{
                    display: "flex",
                    maxWidth: 900,
                    margin: "0 auto",
                    backgroundColor: "white",
                    borderRadius: 8,
                    overflow: "auto",
                }}
            >
                <div style={{ width: "100%" }}>
                    <img
                        alt={"poster"}
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                        }}
                        src={
                            "https://images.pexels.com/photos/2708981/pexels-photo-2708981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        }
                    />
                </div>
                <div style={{ width: "100%", minWidth: 300, padding: 24 }}>
                    <Form
                        form={form}
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
                                    message: "Please input Name!",
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Release"
                            name="release"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Year!",
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Genre"
                            name="genre"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Genre!",
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Play Mode"
                            name="play_mode"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Play Mode!",
                                },
                            ]}
                        >
                            <Checkbox.Group>
                                <Row>
                                    <Col>
                                        <Checkbox
                                            value={"singlePlayer"}
                                            style={{ lineHeight: "32px" }}
                                        >
                                            Single Player
                                        </Checkbox>
                                    </Col>
                                    <Col>
                                        <Checkbox
                                            value={"multiplayer"}
                                            style={{ lineHeight: "32px" }}
                                        >
                                            Multi Player
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item
                            label="Image Url"
                            name="image_url"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Image Url!",
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Platform"
                            name="platform"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Platform!",
                                },
                            ]}
                        >
                            <TextArea size="large" autoSize={{ minRows: 3 }} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                SUBMIT
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
