import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "./aboutus.module.css";
import { getDeps } from "../../../features/departments/depsSlice";
import { NavLink } from "react-router-dom";

const AboutUs = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDeps());
  }, [dispatch]);

  const deps = useSelector((state)=>state.deps.departments)

  return (
    <Container className={styles.main}>
      <h1 className={styles.title}>О Нас</h1>
      <hr className={styles.line} />
      <Container className={styles.welcoming}>
        <h3 className={styles.title2}>Добро пожаловать в Health Center</h3>
        <Container className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Container>
        <br />
        <Container className={styles.text2}>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim.
        </Container>
        <Container className={styles.depsCnt}>
          <Container className={styles.deps}>
            {deps.map((el)=>{
              return(
                <li className={styles.depsList}>
                  <NavLink className={styles.links} to={'x'}>{el.title}</NavLink> 
                </li>
              )
            })}
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
