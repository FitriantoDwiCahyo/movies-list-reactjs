import React, { useState, useEffect } from "react";
import {
    Form,
    Input,
    Button,
    message,
    Rate,
    Col,
    Checkbox,
    Row,
    InputNumber,
} from "antd";
import APISanber from "../../api/API";
import TextArea from "antd/lib/input/TextArea";
import { Redirect } from "react-router-dom";

export default function MovieEdit(props) {
    const [movie, setMovie] = useState({});
    const [form] = Form.useForm();
    const genres = [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Romance",
        "Sci-fi",
    ];

    useEffect(() => {
        if (props.match.params) {
            APISanber.get(`/data-movie/${props.match.params.id}`)
                .then((res) => {
                    setMovie(res.data);
                    form.setFieldsValue({
                        ...res.data,
                        rating: res.data.rating / 2,
                        genre: res.data.genre
                            .split(",")
                            .map((item) => item.trim()),
                    });
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }, []);

    const onFinish = (values) => {
        APISanber.put(`/data-movie/${movie.id}`, {
            ...values,
            rating: values.rating * 2,
            genre: values.genre.join(", "),
        })
            .then((res) => {
                message.success("Data updated successfully!");
                setMovie(null);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const generateCheckboxGenre = () => {
        const checkboxGenre = genres.map((value, index) => {
            return (
                <Col key={index}>
                    <Checkbox value={value} style={{ lineHeight: "32px" }}>
                        {value}
                    </Checkbox>
                </Col>
            );
        });
        return <Row>{checkboxGenre}</Row>;
    };

    if (movie === null) {
        return <Redirect to={"/movie-menu"} />;
    }

    return (
        <div>
            <center>
                <h1 className={"title-medium"}>EDIT MOVIE DATA</h1>
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
                            movie?.image_url
                                ? movie.image_url
                                : "https://images.pexels.com/photos/2672097/pexels-photo-2672097.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
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
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Title!",
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Year"
                            name="year"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp("^[0-9]*$"),
                                    message: "Please input valid Year!",
                                },
                            ]}
                        >
                            <InputNumber type={"number"} min={1} size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Duration"
                            name="duration"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp("^[0-9]*$"),
                                    message: "Please input valid Duration!",
                                },
                            ]}
                        >
                            <InputNumber type={"number"} min={1} size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Rating!",
                                },
                            ]}
                        >
                            <Rate />
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
                            <Checkbox.Group>
                                {generateCheckboxGenre()}
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
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Description!",
                                },
                            ]}
                        >
                            <TextArea size="large" autoSize={{ minRows: 3 }} />
                        </Form.Item>
                        <Form.Item label="Review" name="review">
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
