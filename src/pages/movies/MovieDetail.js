import React, { useState, useEffect } from "react";
import APISanber from "../../api/API";
import { ClockCircleOutlined, MessageOutlined } from "@ant-design/icons";
import handleImageError, {
    dummyImageUrl,
} from "../../error/HandleImageEmpty";
import { Rate, Comment } from "antd";
import Avatar from "antd/lib/avatar/avatar";

export default function MovieDetail(props) {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        if (props.match.params) {
            APISanber.get(`/data-movie/${props.match.params.id}`)
                .then((res) => {
                    setMovie(res.data);
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }, []);

    return (
        <div>
            <h1 className={"title-big"}>Detail</h1>
            <div
                style={{ display: "flex", flexWrap: "wrap", marginBottom: 16 }}
            >
                <img
                    style={{
                        height: 480,
                        borderRadius: 8,
                        objectFit: "cover",
                    }}
                    onError={handleImageError}
                    alt={"Poster"}
                    src={movie?.image_url ? movie.image_url : dummyImageUrl}
                ></img>
                <div className={"App-spacer"}></div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "1.5em",
                    }}
                >
                    <h1 className={"title-medium"}>{movie.title}</h1>
                    <h1 className={"title-small"}>{`(${movie.year})`}</h1>
                    <p>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <b style={{ color: "#f16739", marginRight: 16 }}>
                                {`(${movie.rating})`}
                            </b>
                            <Rate disabled value={movie.rating / 2} />
                        </div>
                        <b>Genre : </b>
                        {movie.genre}
                        <br />
                        <ClockCircleOutlined style={{ marginRight: 16 }} />
                        {Math.floor(movie.duration / 60)} jam{" "}
                        {movie.duration % 60} menit
                        <br />
                    </p>
                </div>
            </div>
            <h1 className={"title-medium"}>Description</h1>
            <p>{movie.description}</p>
            <h1
                style={{ marginTop: 32, marginBottom: 0 }}
                className={"title-medium"}
            >
                Reviews
            </h1>
            {movie?.review ? (
                <Comment
                    author={<p>Someone</p>}
                    avatar={<Avatar size="large" icon={<MessageOutlined />} />}
                    content={<p>{movie?.review}</p>}
                />
            ) : (
                <p>No reviews</p>
            )}
        </div>
    );
}
