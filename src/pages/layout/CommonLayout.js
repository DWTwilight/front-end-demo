import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import NavBar from "./components/NavBar";
const { Header, Footer, Content } = Layout;

const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

export default function CommonLayout() {
  return (
    <Layout>
      <Header id="header">
        <NavBar />
      </Header>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
}
