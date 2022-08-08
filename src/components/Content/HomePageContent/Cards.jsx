import React from 'react';
import styles from "./hp.module.css"
import { BsClock } from "react-icons/bs"
import { BsCalendarEvent } from "react-icons/bs"
import { AiOutlinePhone } from "react-icons/ai"
import { FaMedkit } from "react-icons/fa"

const Cards = () => {
    return (
        <div className={styles.cardCnt}>
           <div className={styles.noPadding}> <div className={`${styles.cards} ${styles.card1}`}>
                <div className={styles.icon}><BsClock size={26}/></div>
                <h4 className={styles.title}>График работы</h4>
                <div className={styles.content}>
                    <div className={styles.days}>Понедельник - Пятница <div>-</div> <div>8:00 - 17:00</div> </div>
                    <hr className={styles.line}/>
                    <div className={styles.days}>Суббота <div className={styles.dash}>-</div> <div>9:30 - 17:30</div> </div>
                    <hr className={styles.line}/>
                    <div className={styles.days}>Воскресенье <div className={styles.dash2}>-</div> <div>9:30 - 15:00</div> </div>
                    <hr className={styles.line}/>
                </div>
                </div>
                <div className={styles.popUp}>
                    <button className={styles.btn}>Подробнее</button>
                </div>
            </div>
           <div className={styles.noPadding}> <div className={`${styles.cards} ${styles.card2}`}>
                <div className={styles.icon}><BsCalendarEvent size={26}/></div>
                <h4 className={styles.title}>Расписание врачей</h4>
                <div className={styles.content}>
                    <div className={styles.timeTable}>
                    Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.
                    Mirum est notare quam littera gothica, quam nunc putamus parum claram, decima et quinta decima.
                    </div>
                </div>
                </div>
                <div className={styles.popUp}>
                    <button className={styles.btn}>Расписание</button>
                </div>
            </div>
           <div className={styles.noPadding}> <div className={`${styles.cards} ${styles.card3}`}>
                <div className={styles.icon}><AiOutlinePhone size={26}/></div>
                <h4 className={styles.title}>Записаться на прием</h4>
                <div className={styles.content}>
                    <div className={styles.timeTable}>
                    Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.
                    Mirum est notare quam littera gothica, quam nunc putamus parum claram, decima et quinta decima.
                    </div>
                </div>
                </div>
                <div className={styles.popUp}>
                    <button className={styles.btn}>Записаться</button>
                </div>
            </div>
           <div className={styles.noPadding}> <div className={`${styles.cards} ${styles.card4}`}>
                <div className={styles.icon}><FaMedkit size={26}/></div>
                <h4 className={styles.title}>Срочный Вызов</h4>
                <div className={styles.content}>
                    <div className={styles.phoneNumber}>
                    1-800-700-6200
                    </div>
                    <div className={styles.cardText2}>
                    Aenean sollicitudin, lorem quis bibendum auctor…
                    </div>
                </div>
                </div>
                <div className={styles.popUp}>
                    <button className={styles.btn}>Позвонить</button>
                </div>
            </div>
        </div>
    );
};

export default Cards;