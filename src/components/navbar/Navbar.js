import React, { useContext, useState, useEffect } from "react";
import { Layout, Menu, Button, Drawer,Image } from "antd";
import { BarsOutlined,MenuOutlined } from "@ant-design/icons";


import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { SideBarBody } from "../sidebar/Sidebar";

const { Header } = Layout;

function RightMenu() {
    const [auth] = useContext(AuthContext);
    const { pathname } = useLocation();

    return (
        <Menu theme="light" mode="horizontal" selectedKeys={[pathname]}>
            <Menu.Item key="/">
                <Link to={"/"}>Home</Link>
            </Menu.Item>
            <Menu.Item key="/movie">
                <Link to={"/movie"}>Movies</Link>
            </Menu.Item>
            <Menu.Item key="/game">
                <Link to={"/game"}>Games</Link>
            </Menu.Item>
            {!auth?.token && (
                <Menu.Item key="/login">
                    <Link to={"/login"}>Login</Link>
                </Menu.Item>
            )}
        </Menu>
    );
}

export default function NavBar() {
    const [auth] = useContext(AuthContext);
    const [visible, setVisible] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const unlistenHistory = history.listen(() => {
            setVisible(false);
        });

        return () => {
            unlistenHistory();
        };
    }, []);

    return (
        <Header
            className="header"
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 8px",
            }}
        >
            {auth?.token && (
                <Drawer
                    className="App-drawer"
                    bodyStyle={{ padding: 1 }}
                    title={auth?.name}
                    placement="left"
                    onClick={() => {}}
                    onClose={() => setVisible(false)}
                    visible={visible}
                >
                    <SideBarBody />
                </Drawer>
            )}
            
            <div style={{ display: "flex", alignItems: "center" }}>
                {auth?.token && (
                    <Button
                        className="App-drawer"
                        type="primary"
                        size={"large"}
                        icon={<BarsOutlined />}
                        onClick={() => setVisible(true)}
                    />
                )}
                <Link to="/"><Image
                width={100}
                height={50}
                preview={false}
                style={{marginBottom:20,marginLeft:40,marginTop:10}}
                src="https://i.ibb.co/sHV4S4L/logo-react.png"
                /></Link>
            </div>
           
            <RightMenu />
        </Header>
    );
}
