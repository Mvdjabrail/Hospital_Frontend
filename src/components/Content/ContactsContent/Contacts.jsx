import { Container } from "react-bootstrap";
import contacts from "./contacts.module.css";
import React from "react";
import styles from './contacts.module.css'

const Contacts = () => {
  return (
    <Container className={contacts.ContactContainer}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.495821596466!2d45.691138400650864!3d43.32481271305504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4051d13abc103637%3A0x8601f7fff1cac51f!2zSW50b2NvZGUgQ29kaW5nIEJvb3RjYW1wIOKAkyDRiNC60L7Qu9CwINC_0YDQvtCz0YDQsNC80LzQuNGA0L7QstCw0L3QuNGP!5e0!3m2!1sru!2sru!4v1659518976274!5m2!1sru!2sru"
        width="100%"
        height="500vw"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
      <Container className={contacts.info_bloc}>
        <Container>efwefwf</Container>

        <Container fluid>
        <Container>
            <Container className={contacts.text}>Ваше имя (обязательно)</Container>
          <input type="text" className={styles.inp} />
        </Container>
        <Container>
        <Container className={contacts.text}>Ваш адрес Email (обязательно)</Container>
          <input type="email" className={styles.inp}/>
        </Container>
        <Container>
        <Container className={contacts.text}>Твое сообщение</Container>
        <textarea  className={contacts.textarea_message} ></textarea>
        </Container>
        <Container>
         <button className={contacts.send}>Отправит</button>
        </Container>
        </Container>
      
      </Container>
    </Container>
  );
};

export default Contacts;
