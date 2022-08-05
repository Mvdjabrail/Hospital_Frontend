import React from 'react';
import { div } from 'react-bootstrap';
import styles from './aboutus.module.css'

const WhyUs = () => {
    return (
        <div>
            <h3 className={styles.whyUs}>Почему мы?</h3>
            <hr className={styles.line2}/>
            <div className={styles.content}>
                <div className={styles.imgCnt}>
                    <img className={styles.pic} alt='pic' src='	https://health-center.vamtam.com/wp-content/uploads/2014/01/photo.jpg' />
                    <div className={styles.picText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                </div>
                <div className={styles.list}>
                    <li>Отличные оценки, нам доверяют сотни довольных клиентов</li>
                    <li>Низкие цены</li>
                    <li>Прекрасные доктора с многолетним опытом</li>
                    <li>Приветливый и дружелюбный персонал, который ответит на все ваши вопросы</li>
                    <li>Отличные оценки, нам доверяют сотни довольных клиентов</li>
                    <li>Низкие цены</li>
                    <li>Прекрасные доктора с многолетним опытом</li>
                    <li>Приветливый и дружелюбный персонал, который ответит на все ваши вопросы</li>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;