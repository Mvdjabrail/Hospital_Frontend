import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "./layout.module.css";

const Layout = () => {
  return (
    <>
      <Header />
      <Container className={styles.outlet}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
