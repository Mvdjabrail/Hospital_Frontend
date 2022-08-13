/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getService } from "../../../features/Services/ServicesSlice";
import { getUsers, showModalSignIn } from "../../../features/users/userSlice";
import Splitter from "../AboutUsContent/Splitter";
import styles from "./docs.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  createReviews,
  deleteReview,
  getReviews,
} from "../../../features/Reviews/reviewsSlice";

const Docs = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const deps = useSelector((state) => state.servicesReducer.services);
  const doc = useSelector((state) => state.usersReducer.users);
  const reviews = useSelector((state) => state.reviewReducer.reviews);
  const loadingR = useSelector((state) => state.reviewReducer.loading);
  const loadingU = useSelector((state) => state.usersReducer.loading);
  const users = useSelector((state) => state.usersReducer.users);
  const token = useSelector((state) => state.usersReducer.token);
  const userId = localStorage.getItem("userId");
  const [sortNew, setSortNew] = useState(false);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);
  const rlTrue = styles.reviews_list_true;
  const rlFalse = styles.reviews_list_false;

  function handleText(e) {
    setText(e.target.value);
  }

  function handleCreate() {
    dispatch(createReviews({ id, rating, text }));
    setText("");
  }

  function handleDeleteReview(i) {
    dispatch(deleteReview(i));
  }

  function handleSortNew() {
    setSortNew(!sortNew);
  }

  function handleRating(value) {
    setRating(value);
  }

  function handleOpen() {
    dispatch(showModalSignIn(true));
  }

  function handleAllRating() {
    const reviewsCount =
      reviews && reviews.filter((item) => item.servicesId === id);
    const average = reviewsCount.map((item) => {
      let result = 0;
      for (let i = 0; i < item.rating; i++) {
        result += item.rating;
        return result;
      }
    });
    const averageRating =
      average && average.reduce((item, acc) => (item += acc));
    return (averageRating / reviews.length).toFixed(2);
  }

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getService());
    dispatch(getReviews({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
    {loadingU ? 
    <div className={styles.preloader}>
    <div className={styles.preloader__ring}>
      <div className={styles.preloader__sector}>L</div>
      <div className={styles.preloader__sector}>o</div>
      <div className={styles.preloader__sector}>a</div>
      <div className={styles.preloader__sector}>d</div>
      <div className={styles.preloader__sector}>i</div>
      <div className={styles.preloader__sector}>n</div>
      <div className={styles.preloader__sector}>g</div>
      <div className={styles.preloader__sector}>.</div>
      <div className={styles.preloader__sector}>.</div>
      <div className={styles.preloader__sector}>.</div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
    </div>
    <div className={styles.preloader__ring}>
      <div className={styles.preloader__sector}>L</div>
      <div className={styles.preloader__sector}>o</div>
      <div className={styles.preloader__sector}>a</div>
      <div className={styles.preloader__sector}>d</div>
      <div className={styles.preloader__sector}>i</div>
      <div className={styles.preloader__sector}>n</div>
      <div className={styles.preloader__sector}>g</div>
      <div className={styles.preloader__sector}>.</div>
      <div className={styles.preloader__sector}>.</div>
      <div className={styles.preloader__sector}>.</div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
      <div className={styles.preloader__sector}></div>
    </div>
  </div> :
      deps.map((el) => {
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
                        <div data-aos="fade-right" className={styles.card}>
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
      {loadingR ? (
        <div className={styles.preloader}>
          <div className={styles.preloader__ring}>
            <div className={styles.preloader__sector}>L</div>
            <div className={styles.preloader__sector}>o</div>
            <div className={styles.preloader__sector}>a</div>
            <div className={styles.preloader__sector}>d</div>
            <div className={styles.preloader__sector}>i</div>
            <div className={styles.preloader__sector}>n</div>
            <div className={styles.preloader__sector}>g</div>
            <div className={styles.preloader__sector}>.</div>
            <div className={styles.preloader__sector}>.</div>
            <div className={styles.preloader__sector}>.</div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
          </div>
          <div className={styles.preloader__ring}>
            <div className={styles.preloader__sector}>L</div>
            <div className={styles.preloader__sector}>o</div>
            <div className={styles.preloader__sector}>a</div>
            <div className={styles.preloader__sector}>d</div>
            <div className={styles.preloader__sector}>i</div>
            <div className={styles.preloader__sector}>n</div>
            <div className={styles.preloader__sector}>g</div>
            <div className={styles.preloader__sector}>.</div>
            <div className={styles.preloader__sector}>.</div>
            <div className={styles.preloader__sector}>.</div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
            <div className={styles.preloader__sector}></div>
          </div>
        </div>
      ) : (
        <>
          <hr style={{ border: "1px solid gray" }} />
          <div style={{ marginTop: "2%", marginLeft: "5%" }}>
            <div className={styles.tab}>
              Отзывы ({reviews.length})
              <br />
              <div style={{ fontSize: "18px" }}>
                Общий рейтинг: {reviews.length ? handleAllRating() : 0}
              </div>
            </div>
            <div className={styles.sort_block}>
              <div className={styles.sort_text}>Сортировать по:</div>
              <div className={styles.sort_new} onClick={handleSortNew}>
                Новизне{sortNew ? " ↓" : " ↑"}
              </div>
            </div>
            {token ? (
              <div className={styles.get_review_block}>
                <div style={{ fontSize: "24px" }}>Ваш отзыв:</div>
                <div className={styles.rating_area}>
                  <input
                    onChange={() => handleRating(5)}
                    type="radio"
                    id="star-5"
                    name="rating"
                    value={rating}
                  />
                  <label htmlFor="star-5" title="Оценка «5»"></label>
                  <input
                    onChange={() => handleRating(4)}
                    type="radio"
                    id="star-4"
                    name="rating"
                    value={rating}
                  />
                  <label htmlFor="star-4" title="Оценка «4»"></label>
                  <input
                    onChange={() => handleRating(3)}
                    type="radio"
                    id="star-3"
                    name="rating"
                    value={rating}
                  />
                  <label htmlFor="star-3" title="Оценка «3»"></label>
                  <input
                    onChange={() => handleRating(2)}
                    type="radio"
                    id="star-2"
                    name="rating"
                    value={rating}
                  />
                  <label htmlFor="star-2" title="Оценка «2»"></label>
                  <input
                    type="radio"
                    defaultChecked={true}
                    id="star-1"
                    name="rating"
                    value={rating}
                  />
                  <label htmlFor="star-1" title="Оценка «1»"></label>
                </div>
                <div
                  style={{
                    marginTop: "1.5%",
                    marginBottom: "0.25%",
                    fontSize: "19px",
                  }}
                >
                  Описание:
                </div>
                <textarea
                  required
                  onChange={(e) => handleText(e)}
                  value={text}
                  className={styles.plus_text}
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
                <button onClick={handleCreate} className={styles.review_button}>
                  Добавить
                </button>
              </div>
            ) : (
              <div className={styles.token_error}>
                <span
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={handleOpen}
                >
                  Войдите
                </span>{" "}
                в аккаунт, чтобы оставлять отзывы
              </div>
            )}
            <hr style={{ marginTop: "3%", border: "1px solid" }} />
            <div className={sortNew ? rlTrue : rlFalse}>
              {reviews &&
                reviews.map((item) => {
                  return (
                    users &&
                    users.map((user) => {
                      if (user._id === item.user) {
                        let star = "";
                        for (let index = 0; index < item.rating; index++) {
                          star += "★";
                        }
                        return (
                          <>
                            <hr />
                            <div className={styles.review}>
                              <div className={styles.user_img_login}>
                                <img
                                  className={styles.user_img}
                                  src="https://otzovik.com/static/img/2018/icons/default_photo.svg"
                                  alt=""
                                />
                                <div className={styles.user_name}>
                                  {user.login}
                                </div>
                                {userId === item.user && (
                                  <div
                                    onClick={() => handleDeleteReview(item._id)}
                                    className={styles.delete_review}
                                  >
                                    ×
                                  </div>
                                )}
                              </div>
                              <div className={styles.review_block}>
                                <div className={styles.user_name_2}>
                                  {user.login}
                                </div>
                                <div className={styles.data}>
                                  {item.data.slice(0, 10)}{" "}
                                  {item.data.slice(11, 16)}
                                </div>
                                <div className={styles.rating}>{star}</div>
                                <div style={{ marginBottom: "0.5%" }}>
                                  Описание:
                                </div>
                                <div className={styles.plus}>{item.text}</div>
                              </div>
                            </div>
                            <hr />
                          </>
                        );
                      }
                    })
                  );
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Docs;
