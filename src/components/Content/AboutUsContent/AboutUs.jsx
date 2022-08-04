import React from "react";
import { Container } from "react-bootstrap";
import styles from "./aboutus.module.css";

const AboutUs = () => {
  return (
    <Container>
      <h1 className={styles.title}>О Нас</h1>
      <hr className={styles.line} />
      <Container className={styles.welcoming}>
        <h3 className={styles.title2}>Welcome to Health Center</h3>
        <Container className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Container>
        <Container className={styles.text2}>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim.
        </Container>
        <Container className={styles.depsCnt}>
          <Container className={styles.deps}>
            тут будут мэпаться отделения
            <Container className={styles.btnCnt}>
              <button className={styles.btn}>Отделения</button>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default AboutUs;
