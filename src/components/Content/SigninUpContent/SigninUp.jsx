import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  errorNull,
  showModalSignUp,
  showModalSignIn,
  getKey,
  errorKey,
} from "../../../features/users/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Modal, Button, Spinner, Container } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [keyEmail, setKeyEmail] = useState("");
  const [infoKey, setInfoKey] = useState("");
  const [counter, setCounter] = useState(2);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const signUp = useSelector((state) => state.usersReducer.signUp);
  const showSignUp = useSelector((state) => state.usersReducer.showSignUp);
  const error = useSelector((state) => state.usersReducer.error);
  const key = useSelector((state) => state.usersReducer.key);

  const handleChangeFirstName = (e) => setFirstName(e.target.value);
  const handleChangeLastName = (e) => setLastName(e.target.value);
  const handleChangeLogin = (e) => setLogin(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangeKey = (e) => setKeyEmail(e.target.value);

  const attempt = (value) => {
    return value === 1 ? "попытка" : "попытки";
  };

  const handleSubmit = () => {
    if (key.toString() === keyEmail.toString()) {
      dispatch(addUser({ firstName, lastName, login, password, email }));
      dispatch(showModalSignIn(true));
      setLogin("");
      setPassword("");
      setEmail("");
      setKeyEmail("");
    } else {
      setCounter(counter - 1);
      setInfoKey(`Неверный код. У вас еще ${counter} ${attempt(counter)}`);
    }

    if (counter === 0) {
      setInfoKey("запросите новый код");
      dispatch(errorKey(""));
      setCounter(2);
    }
  };

  const handleChecked = (e) => {
    if (e.target.checked) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  const handleClose = () => {
    dispatch(showModalSignUp(false));
    dispatch(errorNull());
    setLogin("");
    setPassword("");
    setEmail("");
    setKeyEmail("");
  };

  const handleOpenEye = () => {
    setShowPassword(false);
  };

  const handleClouseEye = () => {
    setShowPassword(true);
  };

  const handleSendKeyEmail = () => {
    dispatch(getKey(email));
  };

  const colorTextError = error ? "red" : "white";

  return (
    <>
      <Modal
        show={showSignUp}
        onHide={handleClose}
        keyboard={true}
        backdrop="static"
        style={{ fontFamily: "Roboto Condensed, sans-serif" }}
      >
        <Modal.Header>
          <Modal.Title style={{ margin: "0 auto", color: "black" }}>
            РЕГИСТРАЦИЯ
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: "black" }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                onChange={handleChangeEmail}
                value={email}
                style={{ borderRadius: "0%" }}
              />
              <span style={{ color: colorTextError, fontSize: 14 }}>
                {" "}
                {error}
              </span>
            </Form.Group>

            <Container
              fluid
              className="d-flex justify-content-between p-0"
              style={{ marginBottom: "12px" }}
            >
              <Button
                style={{
                  backgroundColor: "#3695eb",
                  border: "none",
                  borderRadius: "20px",
                  padding: "6px 18px",
                }}
                onClick={handleSendKeyEmail}
                disabled={email.length < 5}
              >
                {signUp ? (
                  <div>
                    <Spinner size={14} />
                  </div>
                ) : (
                  "Получить код"
                )}
              </Button>
              <Form.Control
                style={{ width: "65%", borderRadius: "0%" }}
                type="keyEmail"
                placeholder="Введите 6 значный код"
                onChange={handleChangeKey}
                value={keyEmail}
                maxLength="6"
              />
            </Container>
            <Container
              style={{
                color: "red",
                marginLeft: "-10px",
                marginBottom: "15px",
              }}
            >
              {infoKey}
            </Container>

            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label style={{ color: "black" }}>Имя</Form.Label>
              <Form.Control
                type="firstName"
                placeholder="Введите имя"
                onChange={handleChangeFirstName}
                value={firstName}
                style={{ borderRadius: "0%" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label style={{ color: "black" }}>Имя</Form.Label>
              <Form.Control
                type="lastName"
                placeholder="Введите фамилию"
                onChange={handleChangeLastName}
                value={lastName}
                style={{ borderRadius: "0%" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLogin">
              <Form.Label style={{ color: "black" }}>Логин</Form.Label>
              <Form.Control
                type="login"
                placeholder="Введите логин"
                onChange={handleChangeLogin}
                value={login}
                style={{ borderRadius: "0%" }}
              />
              <span style={{ color: colorTextError, fontSize: 14 }}>
                {" "}
                {error === "логин уже занят"
                  ? "(логин уже занят)"
                  : "(обязательное поле)"}
              </span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: "black" }}>Пароль</Form.Label>
              <Form.Control
                type={showPassword ? "Text" : "Password"}
                placeholder="Введите пароль"
                onChange={handleChangePassword}
                value={password}
                style={{ borderRadius: "0%" }}
              />
              {showPassword ? (
                <div onClick={handleOpenEye}>
                  <AiOutlineEye
                    onClick={handleChecked}
                    style={{
                      position: "absolute",
                      bottom: "115",
                      color: "black",
                      cursor: "pointer",
                      left: "445",
                      fontSize: "25px",
                    }}
                  />
                </div>
              ) : (
                <div onClick={handleClouseEye}>
                  <AiOutlineEyeInvisible
                    style={{
                      position: "absolute",
                      bottom: "115",
                      color: "black",
                      cursor: "pointer",
                      left: "445",
                      fontSize: "25px",
                    }}
                  />
                </div>
              )}

              <span style={{ color: colorTextError, fontSize: 14 }}>
                {" "}
                (больше 4 и меньше 10 символов){" "}
              </span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <span style={{ color: colorTextError, fontSize: 16 }}>
                {error !== "логин уже занят" && error}{" "}
              </span>
            </Form.Group>

            <Button
              style={{
                backgroundColor: "#3695eb",
                border: "none",
                borderRadius: "2%",
                padding: "6px 18px",
              }}
              variant="primary"
              type="button"
              className="mt-3"
              disabled={!login || password.length < 3}
              onClick={handleSubmit}
            >
              {signUp ? (
                <div>
                  <Spinner size={14} />
                </div>
              ) : (
                "Регистрация"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpPage;
