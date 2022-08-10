import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./aboutus.module.css";
import { NavLink } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css"
import { getService } from "../../../features/Services/ServicesSlice";


const Welcoming = () => {

  const dispatch = useDispatch()

  const deps = useSelector((state)=>state.servicesReducer.services)

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  useEffect(()=>{
    Aos.init({duration: 2000})
}, [])

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>О Нас</h1>
      <hr className={styles.line} />
      <div className={styles.welcoming}>
        <h3 data-aos="fade-right" className={styles.title2}>Добро пожаловать в Health Center</h3>
        <div data-aos="fade-right" className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <br />
        <div data-aos="fade-right" className={styles.text2}>
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
                <li data-aos="fade-right" className={styles.depsList}>
                  <NavLink className={styles.links} to={'x'}>{el.title}</NavLink> 
                </li>
              )
            })}
            <div data-aos="fade-right" className={styles.btnCnt}>
              <button  className={styles.btn}>Отделения</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcoming;
