import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./aboutus.module.css";
import { getDeps } from "../../../features/departments/depsSlice";
import { NavLink } from "react-router-dom";

const Welcoming = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDeps());
  }, [dispatch]);

  const deps = useSelector((state)=>state.deps.departments)

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>О Нас</h1>
      <hr className={styles.line} />
      <div className={styles.welcoming}>
        <h3 className={styles.title2}>Добро пожаловать в Health Center</h3>
        <div className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <br />
        <div className={styles.text2}>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim.
        </div>
        <div className={styles.depsCnt}>
          <div className={styles.deps}>
            {deps.map((el)=>{
              return(
                <li className={styles.depsList}>
                  <NavLink className={styles.links} to={'x'}>{el.title}</NavLink> 
                </li>
              )
            })}
            <div className={styles.btnCnt}>
              <button className={styles.btn}>Отделения</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcoming;
