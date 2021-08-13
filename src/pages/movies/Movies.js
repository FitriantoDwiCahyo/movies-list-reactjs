import React, { useEffect, useState } from "react";
import APISanber from "../../api/API";
import {Divider,Card } from "antd";
import { Link } from "react-router-dom";
import handleImageError, {
    dummyImageUrl,
} from "../../error/HandleImageEmpty";
import Search from "antd/lib/input/Search";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [moviesTemp, setMoviesTemp] = useState(null);

    useEffect(() => {
        APISanber.get("/data-movie")
            .then((res) => {
                setMovies(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    const onSearch = (keyword) => {
        if (!keyword) {
            setMovies(moviesTemp ? moviesTemp : movies);
            setMoviesTemp(null);
            return;
        }

        setMoviesTemp(moviesTemp ? moviesTemp : movies);
        const tmp = (moviesTemp ? moviesTemp : movies).filter((value) => {
            return value?.title
                .toString()
                .toLowerCase()
                .includes(keyword.toLowerCase());
        });
        setMovies(tmp);
    };

    const bigTitle = {
        fontSize: "2.5em",
        color: "#f16739",
        fontWeight: "bold",
    };

    return (
        <div>
            <center>
                <Search
                    style={{ maxWidth: 480 }}
                    size={"large"}
                    placeholder="input search text"
                    onSearch={onSearch}
                    enterButton
                />
            </center>
            <Divider orientation='left'>Now Playing</Divider>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {movies.map((value) => {
                    return (
                        <Link className={"App-card"} to={`/movie/${value.id}`}>
                            <Card
                                key={value.id}
                                hoverable
                                cover={
                                    <img
                                        onError={handleImageError}
                                        alt="movie poster"
                                        src={
                                            value.image_url
                                                ? value.image_url
                                                : dummyImageUrl
                                        }
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
        </div>
    );
}
