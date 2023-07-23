import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import NavBar from "./components/NavBar";
import CustomFooter from "./components/CustomFooter";
const { Header, Footer, Content } = Layout;

export default function CommonLayout() {
  return (
    <Layout>
      <Header id="header">
        <NavBar />
      </Header>
      <Content id="content">
        <Outlet />
      </Content>
      <Footer id="footer">
        <CustomFooter />
      </Footer>
    </Layout>
  );
}
