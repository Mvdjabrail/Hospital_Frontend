import Container from "@appbaseio/reactivesearch/lib/styles/Container";
import React, { useEffect, useState } from "react";
import { Form, Modal, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addDrugs,
  errorNull,
  showModalDrugs,
} from "../../../features/drugs/drugsSlice";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import { getCategories } from "../../../features/category/categorySlice";
import css from "./drugsServices.module.css";
const Drugs = () => {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const [categor, setCategory] = useState("");
  const [recept, setRecept] = useState(false);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categoriesReducer.categories);

  const drug = useSelector((state) => state.drugsReducer.drug);
  const error = useSelector((state) => state.drugsReducer.error);
  const showDrugs = useSelector((state) => state.drugsReducer.showDrugs);

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeDiscription = (e) => setDiscription(e.target.value);
  const handleChangePrice = (e) => setPrice(e.target.value);

  const changecategory = (e) => {
    setCategory(e.target.value);
  };

  console.log(recept);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle("");
    setDiscription("");
    setPrice("");
    setPreview("");
    dispatch(showModalDrugs(false));
    const payload = { title, discription, price, categor, photo, recept };
    dispatch(addDrugs(payload));
  };

  const handleClose = () => {
    dispatch(showModalDrugs(false));
    dispatch(errorNull());
    setTitle("");
    setDiscription("");
  };
  const colorTextError = error ? "red" : "black";
  useEffect(() => {
    dispatch(getCategories());
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(photo);
    } else {
      setPreview(null);
    }
  }, [dispatch, photo]);
  return (
    <Modal
      show={showDrugs}
      onHide={handleClose}
      keyboard={true}
      backdrop="static"
      style={{ fontFamily: "Roboto Condensed, sans-serif" }}
    >
      <Modal.Header>
        <Modal.Title
          style={{
            margin: "0 auto",
            color: "black",
          }}
        >
          Добавление Лекарство
        </Modal.Title>
        <Button
          onClick={handleClose}
          style={{
            color: "#3695eb",
            background: "transparent",
            border: "none",
            fontSize: "36px",
          }}
        >
          &times;
        </Button>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicLogin">
            <Form.Label style={{ color: "black" }}>Заголовок</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите текст..."
              onChange={handleChangeTitle}
              value={title}
              style={{ borderRadius: "0%" }}
            />
            <span style={{ color: colorTextError, fontSize: 14 }}>
              {" "}
              (обязательное поле){" "}
            </span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ color: "black" }}>Описание</Form.Label>
            <Form.Control
              type="Text"
              placeholder="Введите текст..."
              onChange={handleChangeDiscription}
              value={discription}
              style={{ borderRadius: "0%" }}
            />

            <span style={{ color: colorTextError, fontSize: 14 }}>
              {" "}
              (обязательное поле){" "}
            </span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLogin">
            <Form.Label style={{ color: "black" }}>Цена</Form.Label>
            <Form.Control
              type="Number"
              placeholder="Введите цену..."
              onChange={handleChangePrice}
              value={price}
              style={{ borderRadius: "0%" }}
            />
            <span style={{ color: colorTextError, fontSize: 14 }}>
              {" "}
              (обязательное поле){" "}
            </span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <span style={{ color: "red", fontSize: 16 }}>
              {error && error}{" "}
            </span>
          </Form.Group>
          <Container
            style={{ width: "40%" }}
            className="d-flex justify-content-between"
          >
            <p>Требуется рецепт</p>
            <Container>
              <Form.Check
                style={{ marginBottom: "5%" }}
                type="switch"
                id="custom-switch"
                checked={recept}
                onChange={() => setRecept(!recept)}
              />
            </Container>
          </Container>
          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingSelectGrid" label="Категории">
                <Form.Select
                  onChange={(e) => changecategory(e)}
                  value={categor}
                  aria-label="Floating label select example"
                >
                  <option>Выберите категорию лекарства</option>
                  {category.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.title}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <Container className="d-flex justify-content-between align-items-end">
            <div className={css.createImage}>
              <div>
                <input
                  type="file"
                  id="upload2"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.type.substring(0, 5) === "image") {
                      setPhoto(file);
                    } else {
                      setPhoto(null);
                    }
                  }}
                />
                {preview ? (
                  <>
                    <div className={css.divImg}>
                      <img className={css.img2} src={preview} alt="" />
                    </div>
                    <label htmlFor="upload2">
                      <ion-icon name="create-outline"></ion-icon>
                    </label>{" "}
                  </>
                ) : (
                  <label htmlFor="upload2">
                    <div className={css.addDiv}>
                      <img
                        className={css.img1}
                        src="https://www.babypillowth.com/images/templates/upload.png"
                        alt=""
                      />
                      <div className={css.add}>Выбрать файл</div>
                    </div>
                  </label>
                )}
              </div>
            </div>

            <Button
              style={{
                backgroundColor: "#3695eb",
                border: "none",
                borderRadius: "2%",
                padding: "6px 18px",
                height: "40px",
              }}
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              {drug ? (
                <div>
                  <Spinner size={14} />
                </div>
              ) : (
                "Отправить"
              )}
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Drugs;
