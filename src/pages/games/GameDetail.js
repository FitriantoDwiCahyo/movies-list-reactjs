import React, { useState, useEffect } from "react";
import APISanber from "../../api/API";
import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import handleImageError, {
    dummyImageUrl,
} from "../../error/HandleImageEmpty";

export default function GameDetail(props) {
    const [game, setGame] = useState({});

    useEffect(() => {
        if (props.match.params) {
            APISanber.get(`/data-game/${props.match.params.id}`)
                .then((res) => {
                    setGame(res.data);
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
                        width: 320,
                        height: 480,
                        borderRadius: 8,
                        objectFit: "cover",
                    }}
                    onError={handleImageError}
                    alt={"Poster"}
                    src={game?.image_url ? game.image_url : dummyImageUrl}
                ></img>
                <div className={"App-spacer"}></div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "1.5em",
                    }}
                >
                    <h1 className={"title-medium"}>{game.name}</h1>
                    <h1 className={"title-small"}>{`(${game.release})`}</h1>
                    <p>
                        <b>Genre : </b>
                        {game.genre}
                        {game.singlePlayer > 0 && (
                            <div>
                                <UserOutlined style={{ marginRight: 16 }} />
                                Single Player
                            </div>
                        )}
                        {game.multiplayer > 0 && (
                            <div>
                                <UsergroupAddOutlined
                                    style={{ marginRight: 16 }}
                                />
                                Multi Player
                            </div>
                        )}
                    </p>
                </div>
            </div>
            <h1 className={"title-medium"}>Platform</h1>
            <p>{game.platform}</p>
        </div>
    );
}
