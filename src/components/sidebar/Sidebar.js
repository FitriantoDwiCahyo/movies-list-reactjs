import React, { useState, useContext } from "react";
import { Layout, Menu, Avatar } from "antd";
import {
    UserOutlined,
    LaptopOutlined,
    UnlockOutlined,
    LogoutOutlined,
    FormOutlined,
    DatabaseOutlined,
    PlaySquareOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../auth/AuthContext";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

export const SideBarBody = () => {
    const [auth, setAuth] = useContext(AuthContext);
    const { pathname } = useLocation();

    const handleLogout = () => {
        setAuth(null);
    };

    return (
        // <></>
        <Menu
            theme={"light"}
            mode="inline"
            selectedKeys={[pathname]}
            defaultOpenKeys={["user"]}
            style={{ height: "100%", borderRight: 0 }}
        >
            <SubMenu key="user" icon={<UserOutlined />} title={auth?.name}>
                <Menu.Item
                    key="/user/change-password"
                    icon={<UnlockOutlined />}
                >
                    <Link to={"/user/change-password"}>Change Password</Link>
                </Menu.Item>
                <Menu.Item
                    onClick={handleLogout}
                    key="/user/logout"
                    icon={<LogoutOutlined />}
                >
                    Logout
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="movie-menu"
                icon={<PlaySquareOutlined />}
                title="Movies Editor"
            >
                <Menu.Item key="/movie-menu/create" icon={<FormOutlined />}>
                    <Link to={"/movie-menu/create"}>Add New Movie</Link>
                </Menu.Item>
                <Menu.Item key="/movie-menu" icon={<DatabaseOutlined />}>
                    <Link to={"/movie-menu"}>Movie List Editor</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="game-menu"
                icon={<LaptopOutlined />}
                title="Games Editor"
            >
                <Menu.Item key="/game-menu/create" icon={<FormOutlined />}>
                    <Link to={"/game-menu/create"}>Add New Game</Link>
                </Menu.Item>
                <Menu.Item key="/game-menu" icon={<DatabaseOutlined />}>
                    <Link to={"/game-menu"}>Game List Editor</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default function Sidebar() {
    const [auth] = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed) => {
        setCollapsed(collapsed);
    };

    if (auth?.token) {
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <SideBarBody />
            </Sider>
        );
        }
}
