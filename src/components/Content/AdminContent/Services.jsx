import Container from "@appbaseio/reactivesearch/lib/styles/Container";
import React, { useEffect, useState } from "react";
import { Form, Modal, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  errorNull,
  postService,
  showModalServices,
} from "../../../features/Services/ServicesSlice";
import css from "./drugsServices.module.css";
const Services = () => {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();

  const servic = useSelector((state) => state.servicesReducer.servic);
  const error = useSelector((state) => state.servicesReducer.error);
  const showService = useSelector((state) => state.servicesReducer.showService);

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeDiscription = (e) => setDiscription(e.target.value);
  const handleChangePrice = (e) => setPrice(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle("");
    setDiscription("");
    setPrice("");
    setPreview("");
    dispatch(showModalServices(false));
    const payload = { title, discription, price, photo };
    dispatch(postService(payload));
  };

  const handleClose = () => {
    dispatch(showModalServices(false));
    dispatch(errorNull());
    setTitle("");
    setDiscription("");
  };
  const colorTextError = error ? "red" : "black";

  useEffect(() => {
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
      show={showService}
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
          Добавление услуги
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
              {servic ? (
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

export default Services;
