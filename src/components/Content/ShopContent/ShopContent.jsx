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
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const cart = useSelector((state) => state.cartReducer.cart);
  const userId = localStorage.getItem("userId");

  const [kubikVid, setKubikVid] = useState(true);
  const [strelka, setStrelka] = useState(true);
  const [strokaVid, setStrokaVid] = useState(false);
  const [sort, setSort] = useState("");

  const kubikOn = styles.kubikVid_on;
  const kubikOff = styles.kubikVid_off;
  const strokaOn = styles.strokaVid_on;
  const strokaOff = styles.strokaVid_off;
  const strelkaOff = styles.strelka_apteka_off;
  const strelkaOn = styles.strelka_apteka_on;

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

  function handleStrelka() {
    setStrelka(!strelka);
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
  return (
    <>
      <Container className={styles.shop}>
        <h1 className={styles.apteka_title}>Лекарства и БАД</h1>
        <Container className={styles.sort_block}>
          <Container className={styles.sort_block_child1}>
            <span style={{ marginTop: "5px", marginRight: "4vw" }}>
              Сортировка:
            </span>
            <select onChange={(e) => handleSort(e)} value={sort} name="" id="">
              <option value="title-asc">По названию</option>
              <option value="price-desc">Сначала дорогие</option>
              <option value="price-asc">Сначала дешевые</option>
            </select>
            <select style={{ marginLeft: "4vw" }}>
              <option>Все</option>
              {categories.map((category) => {
                return <option value="">{category.title}</option>;
              })}
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
        <Container className={styles.filter_block}>
          <Container>
            <Container className={styles.filter_recipe_block}>
              <span>Отпуск из аптеки</span>
              <span
                onClick={handleStrelka}
                className={strelka ? strelkaOn : strelkaOff}
              >
                ᐱ
              </span>
            </Container>
            {strelka ? (
              <Container style={{ transition: "0.2s" }}>
                <label className={styles.radio1} htmlFor="" name="1"></label>
                <label className={styles.radio1} htmlFor="" name="1"></label>
              </Container>
            ) : null}
          </Container>
        </Container>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            width: "70.5vw",
            marginLeft: "12.5vw",
          }}
        >
          {kubikVid ? (
            <Container className={styles.drugs_block_kubik}>
              {sortDrugs().map((drug, index) => {
                return categories.map((category, i) => {
                  return (
                    <Container key={index} className={styles.drug1}>
                      <Container>
                        <img
                          className={styles.drug_img1}
                          src="https://planetazdorovo.ru/pics/logotype.svg"
                          alt=""
                        />
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
                        {cart.map((cart) => {
                          if (cart.user === userId) {
                            if (
                              cart.products.find((item) => item === drug._id)
                            ) {
                              return (
                                <div className={styles.on_cart_back2}>
                                  <button
                                    className={styles.drug_on_cart2}
                                  ></button>
                                </div>
                              );
                            }
                            return (
                              <div className={styles.on_cart_back}>
                                <button
                                  onClick={() =>
                                    handleAddOfCart(cart._id, drug._id)
                                  }
                                  className={styles.drug_on_cart}
                                ></button>
                              </div>
                            );
                          } else {
                            return "";
                          }
                        })}
                      </Container>
                      {/* <Container className={styles.drug_category}>{category.title}</Container> */}
                    </Container>
                  );
                });
              })}
            </Container>
          ) : (
            ""
            // <Container className={styles.drugs_block_stroka}>
            //   {sortDrugs().map((drug, index) => {
            //     return categories.map((category, i) => {
            //       return (
            //         <Container key={index} className={styles.drug2}>
            //           <Container>
            //             <img
            //               className={styles.drug_img2}
            //               src="https://planetazdorovo.ru/pics/logotype.svg"
            //               alt=""
            //             />
            //           </Container>
            //           <Container className={styles.drug2_help}>
            //             <Container className={styles.drug_title2}>
            //               {drug.title}
            //             </Container>
            //             <Container className={styles.drug_recept2}>
            //               Рецепт:{"    "}
            //               {drug.recept === true ? "Требуется" : "Не требуется"}
            //             </Container>
            //             <Container className={styles.drug_price2}>
            //               от {drug.price} ₽{" "}
            //               <div className={styles.on_cart_back}>
            //                 <button className={styles.drug_on_cart}></button>
            //               </div>
            //             </Container>
            //           </Container>
            //           {/* <Container className={styles.drug_category}>{category.title}</Container> */}
            //         </Container>
            //       );
            //     });
            //   })}
            // </Container>
          )}
        </Container>
      </Container>
    </>
  );
};

export default ShopContent;
