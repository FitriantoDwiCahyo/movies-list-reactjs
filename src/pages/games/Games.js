import React, { useEffect, useState } from "react";
import APISanber from "../../api/API";
import { Divider,Card } from "antd";
import { Link } from "react-router-dom";
import handleImageError, {
    dummyImageUrl,
} from "../../error/HandleImageEmpty";
import Search from "antd/lib/input/Search";

export default function Games() {
    const [game, setGame] = useState([]);
    const [gameTemp, setGameTemp] = useState(null);

    useEffect(() => {
        APISanber.get("/data-game")
            .then((res) => {
                setGame(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    const onSearch = (keyword) => {
        if (!keyword) {
            setGame(gameTemp ? gameTemp : game);
            setGameTemp(null);
            return;
        }

        setGameTemp(gameTemp ? gameTemp : game);
        const tmp = (gameTemp ? gameTemp : game).filter((value) => {
            return value?.name
                .toString()
                .toLowerCase()
                .includes(keyword.toLowerCase());
        });
        setGame(tmp);
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
            <Divider orientation='left'>Games Popular</Divider>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {game.map((value) => {
                    return (
                        <Link className={"App-card"} to={`/game/${value.id}`}>
                            <Card
                                key={value.id}
                                hoverable
                                cover={
                                    <img
                                        onError={handleImageError}
                                        alt="game poster"
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
                                        height: "8em",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    <h3
                                        style={{
                                            maxHeight: "3em",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {value.name}
                                    </h3>
                                    <p
                                        className={"title-small"}
                                        style={{
                                            maxHeight: "1.5em",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {value.genre}
                                    </p>
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
