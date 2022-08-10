import React, { useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  minusCartIem,
  plusCartIem,
} from "../../../features/Cart/cartSlice";
import { getDrugs } from "../../../features/drugs/drugsSlice";

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
    dispatch(getDrugs());
  }, [dispatch]);

  const currentCart = cart?.find((item) => item.user === userId);
  if (!currentCart) {
    return "";
  }
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
                  <th>Цена</th>
                  <th>Продукт</th>
                  <th>Количество</th>
                  <th>Сумма</th>
                </tr>
              </thead>
              {currentCart.products?.map((item) => {
                return drugs.map((drug) => {
                  if (item.productId === drug._id) {
                    return (
                      <tbody>
                        <tr>
                          <td>{drug.price}₽</td>
                          <td>{drug.title}</td>
                          <td>
                            {" "}
                            <button
                              onClick={() =>
                                handlePlus(currentCart._id, drug._id)
                              }
                            >
                              +
                            </button>{" "}
                            {item.amount}
                            <button
                              onClick={() =>
                                handleMinus(currentCart._id, drug._id)
                              }
                            >
                              -
                            </button>
                          </td>
                          <td>{item.amount * drug.price}</td>
                        </tr>
                      </tbody>
                    );
                  }
                });
              })}
            </td>
          </table>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartComponent;
