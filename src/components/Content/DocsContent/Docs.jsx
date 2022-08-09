import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getService } from "../../../features/Services/ServicesSlice";
import { getUsers } from "../../../features/users/userSlice";
import Splitter from "../AboutUsContent/Splitter";
import styles from "./docs.module.css";

const Docs = () => {
  const deps = useSelector((state) => state.servicesReducer.services);
  const doc = useSelector((state) => state.usersReducer.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getService());
  }, [dispatch]);

  const { id } = useParams();

  return (
    <>
      {deps.map((el) => {
        if (id === el._id) {
          return (
            <>
              <h1 className={styles.title}>{el.title}</h1>
              <Splitter />
              <h4 className={styles.title2}>Наши специалисты</h4>
              <hr className={styles.line} />
              <div className={styles.text}>{el.text}</div>
              <div className={styles.docsCnt}>
                {doc.map((element) => {
                  if (element.role === "doctor") {
                    if (element.service === id) {
                      return (
                        <div className={styles.card}>
                          <div className={styles.imgCnt}>
                            <img
                              className={styles.img}
                              alt="photo"
                              src={`http://localhost:4000/${element.image}`}
                            />
                          </div>
                          <div className={styles.name}>
                            <div className={styles.fName}>
                              {element.firstName}
                            </div>
                            <div className={styles.lName}>
                              {element.lastName}
                            </div>
                          </div>
                          <div className={styles.rank}>
                            Кандидат медицинских наук
                          </div>
                          <div className={styles.hidden}>
                            <button className={styles.btn}>Записаться</button>
                            <div className={styles.price}>
                              Стоимость приема от{el.price}₽
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }
                })}
              </div>
            </>
          );
        }
      })}
    </>
  );
};

export default Docs;
