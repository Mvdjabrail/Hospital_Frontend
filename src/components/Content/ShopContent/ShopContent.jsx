import React from "react";
import { Container } from "react-bootstrap";
import styles from "./shop.module.css";

const ShopContent = () => {
  return (
    <Container className={styles.shop}>
      <h1 className={styles.apteka_title}>Лекарства и БАД</h1>
    </Container>
  );
};

export default ShopContent;
