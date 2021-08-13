import React, { useState, useEffect } from "react";
import { Tag,Divider, Card } from "antd";
import APISanber from "../../api/API";
import handleImageError, {
    dummyImageUrl,
} from "../../error/HandleImageEmpty";
import { Link } from "react-router-dom";

const contentStyle = {
    height: "320px",
    width: "100%",
    lineHeight: "160px",
    textAlign: "center",
    objectFit: "cover",
    borderRadius: "8px",
};

const titleStyle = {
    color: "#fff",
    width: "100%",
    textAlign: "center",
    padding: "8px",
};

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        APISanber.get("/data-movie")
            .then((res) => {
                setMovies(res.data);
            })
            .catch((err) => {
                alert(err);
            });

        APISanber.get("/data-game")
            .then((res) => {
                setGames(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);


    return (
        <div>
            <Divider orientation='left'>Now Playing</Divider>
            <div
                style={{
                    overflow: "scroll",
                    whiteSpace: "nowrap",
                    marginBottom: 32,
                }}
            >
                {movies.map((value) => {
                    return (
                        <Link to={`/movie/${value.id}`}>
                            <Card
                                key={value.id}
                                hoverable
                                style={{
                                    width: 240,
                                    margin: 8,
                                    overflow: "hidden",
                                    display: "inline-block",
                                    whiteSpace: "normal",
                                }}
                                cover={
                                    <img
                                        onError={handleImageError}
                                        alt="movie poster"
                                        src={
                                            value.image_url
                                                ? value.image_url
                                                : dummyImageUrl
                                        }
                                        style={{
                                            height: 320,
                                            objectFit: "cover",
                                        }}
                                    />
                                }
                            >
                                <div
                                    style={{
                                        height: 120,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    <h3>{value.title}</h3>
                                    <p>{value.description}</p>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>
            <Divider orientation='left'>Games Popular</Divider>
            <div style={{ overflow: "scroll", whiteSpace: "nowrap" }}>
                {games.map((value) => {
                    return (
                        <Link to={`/game/${value.id}`}>
                            <Card
                                key={value.id}
                                hoverable
                                style={{
                                    width: 240,
                                    margin: 8,
                                    overflow: "hidden",
                                    display: "inline-block",
                                    whiteSpace: "normal",
                                }}
                                cover={
                                    <img
                                        onError={handleImageError}
                                        alt="movie poster"
                                        src={
                                            value.image_url
                                                ? value.image_url
                                                : dummyImageUrl
                                        }
                                        style={{
                                            height: 320,
                                            objectFit: "cover",
                                        }}
                                    />
                                }
                            >
                                <div
                                    style={{
                                        height: 120,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    <h3>{value.name}</h3>
                                    <p>{value.platform}</p>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
