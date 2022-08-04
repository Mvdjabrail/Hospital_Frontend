import React from "react";
import { Container } from "react-bootstrap";
import styles from "./shop.module.css";

const ShopContent = () => {
  return (
    <Container className={styles.shop}>
      <h1 className={styles.apteka_title}>Лекарства и БАД</h1>
      <Container className={styles.sort_block}>
        <Container className={styles.sort_block_child1}>
        <span style={{ marginTop: "5px" }}>Сортировка:</span>
        <select name="" id="">
          <option value="">По названию</option>
          <option value="">Сначала дорогие</option>
          <option value="">Сначала дешевые</option>
        </select>
        </Container>
        <Container className={styles.sort_block_child2}>
          <Container className={styles.sortVid1_on}></Container>
          <Container className={styles.sortVid2_off}></Container>
        </Container>
      </Container>
      <Container className={styles.filter_block}>
        <Container>
          <Container className={styles.filter_recipe_block}>
            <span>Отпуск из аптеки</span>
            <span style={{ cursor: "pointer" }}>ᐱ</span>
          </Container>
          <Container>
            <label htmlFor=""></label>
            <label htmlFor=""></label>
          </Container>
        </Container>
      </Container>
      <Container className={styles.drugs_block}>
        
      </Container>
    </Container>
  );
};

export default ShopContent;
