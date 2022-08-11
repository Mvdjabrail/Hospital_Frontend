import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getDrugs } from "../../../features/drugs/drugsSlice";
import { getCategories } from "../../../features/category/categorySlice";
import styles from "./shop.module.css";
import { addCart, getCart } from "../../../features/Cart/cartSlice";
import { getUsers } from "../../../features/users/userSlice";

const ShopContent = () => {
  const dispatch = useDispatch();

  const drugs = useSelector((state) => state.drugsReducer.drugs);
  const loading = useSelector((state) => state.drugsReducer.loading);
  const cart = useSelector((state) => state.cartReducer.cart);
  const userId = localStorage.getItem("userId");

  const [kubikVid, setKubikVid] = useState(true);
  const [strokaVid, setStrokaVid] = useState(false);
  const [sort, setSort] = useState("");

  const kubikOn = styles.kubikVid_on;
  const kubikOff = styles.kubikVid_off;
  const strokaOn = styles.strokaVid_on;
  const strokaOff = styles.strokaVid_off;

  const collatore = new Intl.Collator("ru-RU");

  const sortDrugs = () => {
    switch (sort) {
      case "title-asc":
        return drugs
          .slice()
          .sort((a, b) => collatore.compare(a.title, b.title));
      case "price-asc":
        return drugs.slice().sort((a, b) => a.price - b.price);
      case "price-desc":
        return drugs.slice().sort((a, b) => b.price - a.price);
      default:
        return drugs;
    }
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  function handleKubikVid() {
    setKubikVid(true);
    setStrokaVid(false);
  }

  function handleStrokaVid() {
    setStrokaVid(true);
    setKubikVid(false);
  }

  function handleAddOfCart(idCart, product) {
    dispatch(addCart({ idCart, product }));
  }

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getDrugs());
    dispatch(getCart());
    dispatch(getCategories());
  }, [dispatch]);

  const currentCart = cart?.find((item) => item.user === userId);
  if (!currentCart) {
    return "";
  }

  const onCart = (id) =>
    currentCart.products.find((item) => item.productId === id);

  return (
    <>
      <Container className={styles.shop}>
        <h1 className={styles.apteka_title}>Лекарства и БАД</h1>
        {loading ? (
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
            <Container className={styles.sort_block}>
              <Container className={styles.sort_block_child1}>
                <span style={{ marginTop: "5px", marginRight: "4vw" }}>
                  Сортировка:
                </span>
                <select
                  onChange={(e) => handleSort(e)}
                  value={sort}
                  name=""
                  id=""
                >
                  <option value="title-asc">По названию</option>
                  <option value="price-desc">Сначала дорогие</option>
                  <option value="price-asc">Сначала дешевые</option>
                </select>
              </Container>
              <Container className={styles.sort_block_child2}>
                <Container
                  onClick={handleKubikVid}
                  className={kubikVid ? kubikOn : kubikOff}
                ></Container>
                <Container
                  onClick={handleStrokaVid}
                  className={strokaVid ? strokaOn : strokaOff}
                ></Container>
              </Container>
            </Container>
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                width: "70.5vw",
                marginLeft: "7.5vw",
              }}
            >
              {kubikVid ? (
                <Container className={styles.drugs_block_kubik}>
                  {sortDrugs().map((drug, index) => {
                    return (
                      <Container key={drug._id} className={styles.drug1}>
                        <Container>
                          <img
                            className={styles.drug_img1}
                            src={`http://localhost:4000/${drug.image}`}
                            alt=""
                          />
                          <hr />
                        </Container>
                        <Container className={styles.drug_title1}>
                          {drug.title}
                        </Container>
                        <Container className={styles.drug_recept1}>
                          Рецепт:{"    "}
                          {drug.recept === true ? "Требуется" : "Не требуется"}
                        </Container>
                        <Container className={styles.drug_price1}>
                          от {drug.price} ₽{" "}
                          {onCart(drug._id) ? (
                            <div className={styles.on_cart_back2}>
                              <button
                                onClick={() =>
                                  handleAddOfCart(currentCart._id, drug._id)
                                }
                                className={styles.drug_on_cart2}
                              ></button>
                            </div>
                          ) : (
                            <div className={styles.on_cart_back}>
                              <button
                                onClick={() =>
                                  handleAddOfCart(currentCart._id, drug._id)
                                }
                                className={styles.drug_on_cart}
                              ></button>
                            </div>
                          )}
                        </Container>
                      </Container>
                    );
                  })}
                </Container>
              ) : (
                <Container className={styles.drugs_block_stroka}>
                  {sortDrugs().map((drug, index) => {
                    return (
                      <Container key={drug._id} className={styles.drug2}>
                        <Container>
                          <img
                            className={styles.drug_img2}
                            src={`http://localhost:4000/${drug.image}`}
                            alt=""
                          />
                        </Container>
                        <Container className={styles.drug2_help}>
                          <Container className={styles.drug_title2}>
                            {drug.title}
                          </Container>
                          <Container className={styles.drug_recept2}>
                            Рецепт:{"    "}
                            {drug.recept === true
                              ? "Требуется"
                              : "Не требуется"}
                          </Container>
                          <Container className={styles.drug_price2}>
                            от {drug.price} ₽{" "}
                            {onCart(drug._id) ? (
                              <div className={styles.on_cart_back2}>
                                <button
                                  onClick={() =>
                                    handleAddOfCart(currentCart._id, drug._id)
                                  }
                                  className={styles.drug_on_cart2}
                                ></button>
                              </div>
                            ) : (
                              <div className={styles.on_cart_back}>
                                <button
                                  onClick={() =>
                                    handleAddOfCart(currentCart._id, drug._id)
                                  }
                                  className={styles.drug_on_cart}
                                ></button>
                              </div>
                            )}
                          </Container>
                        </Container>
                      </Container>
                    );
                  })}
                </Container>
              )}
            </Container>
          </>
        )}
      </Container>
    </>
  );
};

export default ShopContent;
