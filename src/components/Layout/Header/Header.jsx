import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import AiOutlineUser from "react-icons/ai"
import { ImUserPlus, ImEnter } from "react-icons/im";
import { GiExitDoor } from "react-icons/gi";
import { BiUser } from "react-icons/bi"
import logo from '../../../assets/logo.png'
import { NavLink } from 'react-router-dom';

const Header = () => {
    const activePageStyle = {
        color: "#3695eb",
        textDecoration: "none",
      };
    
      const inActivePageStyle = {
        color: "#3e4043",
      };
    return (
        <Container className={styles.header}>
            <Container className={styles.headerContent}>
                <Link to={'/'} className={styles.logoCnt}>
                    <img className={styles.logo} alt='logo' src={logo} />
                </Link>
                <Container className={styles.links}>
                    <NavLink style={({ isActive }) =>
                    isActive ? activePageStyle : inActivePageStyle
                  } to={'/'} className={`${styles.home} ${styles.allLinks}`}>Главная</NavLink>
                    <NavLink style={({ isActive }) =>
                    isActive ? activePageStyle : inActivePageStyle
                  } to={'/about-us'} className={`${styles.aboutUs} ${styles.allLinks}`}>О Нас</NavLink>
                    <NavLink style={({ isActive }) =>
                    isActive ? activePageStyle : inActivePageStyle
                  } to={'/departments'} className={`${styles.departments} ${styles.allLinks}`}>Отделения</NavLink>
                    <Container className={`${styles.timeTable} ${styles.allLinks}`}>Расписание
                        <span className={styles.timePopUp}>
                          <Container>placeholder</Container>
                        </span>
                    </Container>
                    <NavLink style={({ isActive }) =>
                    isActive ? activePageStyle : inActivePageStyle
                  } to={'/shop'} className={`${styles.shop} ${styles.allLinks}`}>Аптека</NavLink>
                    <NavLink style={({ isActive }) =>
                    isActive ? activePageStyle : inActivePageStyle
                  } to={'/contacts'} className={`${styles.contacts} ${styles.allLinks}`}>Контакты</NavLink>
                    <NavLink to={'sign-up'} className={`${styles.signUp} ${styles.icons}`}><ImUserPlus size={28} /></NavLink>
                    <NavLink to={'sign-in'} className={`${styles.signIn} ${styles.icons}`}><ImEnter size={28}/></NavLink>
                </Container>
            </Container>
        </Container>
    );
};

export default Header;