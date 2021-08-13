import React from "react";

import { Layout } from "antd";

const Foot = Layout.Footer;

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <Foot style={{ textAlign: "center" }}>
            ©{year} Created by Fitrianto Dwi Cahyo
        </Foot>
    );
}
