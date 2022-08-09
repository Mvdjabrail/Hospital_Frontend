import React, { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { ImUserPlus, ImEnter } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import { GiExitDoor } from "react-icons/gi";
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  clearToken,
  showModalSignIn,
  showModalSignUp,
} from "../../../features/users/userSlice";
import SignInPage from "../../Content/SigninInContent/SigninIn";
import SignUpPage from "../../Content/SigninUpContent/SigninUp";
import { useSelector } from "react-redux";
import CartComponent from "../../Content/CartContent/CartContent";
import { BsCart4 } from "react-icons/bs";


const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.usersReducer.token);
  const role = localStorage.getItem("role");
  const [opened, setOpened] = useState(false);

  const handleclose = () => setOpened(false);
  const handleshow = () => setOpened(true);

  const handleShowSignin = () => {
    dispatch(showModalSignIn(true));
  };
  const handleShowSignup = () => {
    dispatch(showModalSignUp(true));
  };
  const handleExit = () => {
    dispatch(clearToken());
  };

  const activePageStyle = {
    color: "#3695eb",
    textDecoration: "none",
  };

  const inActivePageStyle = {
    color: "#3e4043",
  };
  return (
    <>
      <div fluid className={styles.header}>
        <div className={styles.headerContent}>
          <Link to={"/"} className={styles.logoCnt}>
            <img className={styles.logo} alt="logo" src={logo} />
          </Link>
          <div className={styles.links}>
            <NavLink
              style={({ isActive }) =>
                isActive ? activePageStyle : inActivePageStyle
              }
              to={"/"}
              className={`${styles.home} ${styles.allLinks}`}
            >
              Главная
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive ? activePageStyle : inActivePageStyle
              }
              to={"/about-us"}
              className={`${styles.aboutUs} ${styles.allLinks}`}
            >
              О Нас
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive ? activePageStyle : inActivePageStyle
              }
              to={"/departments"}
              className={`${styles.departments} ${styles.allLinks}`}
            >
              Отделения
            </NavLink>
            <div className={`${styles.timeTable} ${styles.allLinks} `}>
              Расписание
              <span className={styles.timePopUp}>
                <div>placeholder</div>
              </span>
            </div>
            <NavLink
              style={({ isActive }) =>
                isActive ? activePageStyle : inActivePageStyle
              }
              to={"/shop"}
              className={`${styles.shop} ${styles.allLinks}`}
            >
              Аптека
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive ? activePageStyle : inActivePageStyle
              }
              to={"/telemed"}
              className={`${styles.shop} ${styles.allLinks}`}
            >
              Телемедецина
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive ? activePageStyle : inActivePageStyle
              }
              to={"/contacts"}
              className={`${styles.contacts} ${styles.allLinks}`}
            >
              Контакты
            </NavLink>
          </div>
          {token ? (
            <>
              <Nav style={{ alignItems: "center" }}>
                <Nav>
                  <Button variant="link" onClick={handleExit} className="mx-1">
                    {<GiExitDoor size={35} color={"#3695eb"} />}
                  </Button>
                </Nav>
                <Nav>
                  <Button
                    onClick={() => setOpened(!opened)}
                    variant="link"
                    className="mx-1"
                  >
                            {<BsCart4 size={30} color={"#3695eb"} />}

                  </Button>
                </Nav>
                   

                <NavLink
                  to={
                    (role === "admin" && "/admin") ||
                    (role === "user" && "/user")
                  }
                >
                  <Button variant="link" className="mx-1">
                    {<RiAdminFill size={30} color={"#3695eb"} />}
                  </Button>
                </NavLink>
              </Nav>
            </>
          ) : (
            <>
              {" "}
              <Nav className={styles.signinInUp}>
                <div
                  className={`${styles.signUp} ${styles.icons}`}
                  onClick={handleShowSignin}
                >
                  <ImUserPlus size={28} />
                </div>
                <div
                  onClick={handleShowSignup}
                  className={`${styles.signIn} ${styles.icons}`}
                >
                  <ImEnter size={28} />
                </div>
              </Nav>
            </>
          )}
        </div>
      </div>
      <SignInPage />
      <SignUpPage />
      <CartComponent
                      handleclose={handleclose}
                      handleshow={handleshow}
                      show={opened}
                      placement={"end"}
                      name={"end"}

                    />
    </>
  );
};

export default Header;
