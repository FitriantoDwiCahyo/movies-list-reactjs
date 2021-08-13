import React from "react";
import "./App.css";
import "./style/style.css";
import { Layout } from "antd";
import NavBar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import SideBar from "./components/sidebar/Sidebar";

const { Content } = Layout;

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout style={{ minHeight: "100vh" }}>
                    <NavBar />
                    <Layout className="site-layout">
                        {/* <aside className="App-sidebar">
                            <SideBar />
                        </aside> */}
                        <Content
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                className="site-layout-background"
                                style={{
                                    padding: 16,
                                    flex: "1 0 auto",
                                    overflow: "auto",
                                }}
                            >
                                <Routes />
                            </div>
                            <Footer />
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;
