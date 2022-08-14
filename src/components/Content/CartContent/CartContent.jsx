import React, { useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  delProduct,
  getCart,
  minusCartIem,
  plusCartIem,
} from "../../../features/Cart/cartSlice";
import { getDrugs } from "../../../features/drugs/drugsSlice";
import { AiFillDelete } from "react-icons/ai";
import styles from "./cart.module.css";

function CartComponent(props) {
  const cart = useSelector((state) => state.cartReducer.cart);
  const userId = localStorage.getItem("userId");
  const drugs = useSelector((state) => state.drugsReducer.drugs);

  const handlePlus = (idCart, id) => {
    dispatch(plusCartIem({ idCart, id }));
  };

  const handleMinus = (idCart, id) => {
    dispatch(minusCartIem({ idCart, id }));
  };

  const handleDelete = (idCart, idProduct) => {
    dispatch(delProduct({ idCart, idProduct }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
    dispatch(getDrugs());
  }, [dispatch]);

  const currentCart = cart?.find((item) => item.user === userId);
  if (!currentCart) {
    return "";
  }

  const arrayPrice = currentCart.products.map((item) => {
    const drugss = drugs.filter((drug) => drug._id === item.productId);
    const amount = drugss.map((drug) => drug.price);
    return amount;
  });

  const arrayAmount = currentCart.products.map((item) => {
    return item.amount;
  });

  function sum() {
    let arr = [];
    for (let i = 0; i < arrayAmount.flat().length; i++) {
      for (let q = 0; q < arrayPrice.flat().length; q++) {
        if (i === q) {
          arr.push(arrayAmount[i] * arrayPrice[q]);
        }
      }
    }
    return arr;
  }

  const total = !sum().length ? 0 : sum().reduce((item, acc) => (item += acc));

  // console.log(total);

  return (
    <>
      <Nav variant="link" onClick={props.handleShow} className="mx-1"></Nav>
      <Offcanvas show={props.show} onHide={props.handleclose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Корзина</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <table>
            <td>
              <thead>
                <tr>
                  {/* <th>Цена</th> */}
                  {/* <th>Продукт</th>
                  <th>Количество</th>
                  <th>Сумма</th> */}
                </tr>
              </thead>
              <tbody>
              {currentCart.products?.map((item) => {
                return drugs.map((drug) => {
                  if (item.productId === drug._id) {
                    return (
                      // <div className={styles.div1}>
                        <tr>
                          {/* <td>{drug.price}₽</td> */}
                          <td>
                            {" "}
                            <img
                              alt="pic"
                              className={styles.img}
                              src={`http://localhost:4000/${drug.image}`}
                            />
                          </td>
                          <td className={styles.titlePrice}>
                            <th>{drug.price}₽</th>
                            <th>{drug.title}</th>
                          </td>
                          <td>
                            {" "}
                            <button
                              className={styles.btn}
                              onClick={() =>
                                handlePlus(currentCart._id, drug._id)
                              }
                            >
                              +
                            </button>{" "}
                            {item.amount}
                            <button
                              className={styles.btn}
                              onClick={() =>
                                handleMinus(currentCart._id, drug._id)
                              }
                            >
                              -
                            </button>
                          </td>
                          <td>{item.amount * drug.price}₽</td>
                          <td>
                            <AiFillDelete
                              className={styles.icc}
                              onClick={() =>
                                handleDelete(currentCart._id, drug._id)
                              }
                            />
                          </td>
                        </tr>
                      // </div>
                    );
                  }
                });
              })}
              </tbody>
              <tfoot>
                <tr>
                  <td>К оплате</td>
                  <td>{total} ₽</td>
                </tr>
              </tfoot>
            </td>
          </table>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartComponent;
