import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './header.module.css'

const Header = () => {
    return (
        <Container className={styles.header}>
            <Container className={styles.headerContent}>
                <Container className={styles.logoCnt}>
                    <img className={styles.logo} alt='logo' src="https://health-center.vamtam.com/wp-content/uploads/2014/04/logo_new.png" />
                </Container>
                <Container className={styles.links}>
                    <Link to={'/'} className={styles.home}>Главная</Link>
                    <Link to={'/about-us'} className={styles.aboutUs}>О Нас</Link>
                    <Link to={'/departments'} className={styles.departments}>Отделения</Link>
                    <Container className={styles.timeTable}>Расписание
                        <span>

                        </span>
                    </Container>
                    <Link to={'/shop'} className={styles.shop}>Аптека</Link>
                    <Link to={'/contacts'} className={styles.contacts}>Контакты</Link>
                </Container>
            </Container>
        </Container>
    );
};

export default Header;