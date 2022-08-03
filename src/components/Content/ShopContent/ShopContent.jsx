import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./shop.module.css";

const ShopContent = () => {
  const [sortMin, setSortMin] = useState(true);
  const [sortMax, setSortMax] = useState(false);
  const [sortName, setSortName] = useState(false);
  const [hidApteka, setHidApteka] = useState(false);
  const [hidPrice, setHidPrice] = useState(false)

  const hiddenApteka = styles.aptekaInputs_off;
  const openApteka = styles.aptekaInputs_on;

  const hiddenPrice = styles.priceInputs_off;
  const openPrice = styles.priceInputs_on

  function handleHiddenApteka() {
    setHidApteka(!hidApteka)
  }

  function handleHiddenPrice() {
    setHidPrice(!hidPrice)
  }

  return (
    <Container className={styles.shop}>
      <h1>Лекарства и БАД</h1>
      <Container className={styles.filterBlock}>
        <Container>
        <Container style={{ fontSize: "19px" }}>⠀Цена⠀⠀⠀⠀<span style={{ cursor: "pointer" }} onClick={handleHiddenPrice}>{hidApteka ? "ᐯ" : "ᐱ"}</span></Container>
          <Container className={hidPrice ? hiddenPrice : openPrice}>
            <p style={{ fontSize: "10px", paddingLeft: "10px", width: "12vw"}}><input type="radio" name="2" />По рецепту</p>
            <p style={{ fontSize: "10px", paddingLeft: "10px", width: "12vw"}}><input type="radio" name="2" />Без рецепта</p>
          </Container>
          <Container style={{ fontSize: "19px", marginTop: "2vw" }}>⠀Отпуск из аптеки⠀⠀⠀⠀<span style={{ cursor: "pointer" }} onClick={handleHiddenApteka}>{hidApteka ? "ᐯ" : "ᐱ"}</span></Container>
          <Container className={hidApteka ? hiddenApteka : openApteka}>
            <p style={{ fontSize: "10px", paddingLeft: "10px", width: "12vw"}}><input type="radio" name="2" />По рецепту</p>
            <p style={{ fontSize: "10px", paddingLeft: "10px", width: "12vw"}}><input type="radio" name="2" />Без рецепта</p>
          </Container>
        </Container>
      </Container>
      <Container className={styles.sortBlock}>
        Сортировка:⠀⠀⠀⠀
        <select className={styles.select}>
          <option value={sortMin}>
            Сначала дешевле
          </option>
          <option value={sortMax}>Сначала дороже</option>
          <option value={sortName}>По названию</option>
        </select>
      </Container>
    </Container>
  );
};

export default ShopContent;
