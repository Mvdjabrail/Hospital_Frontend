import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import styles from "./Telemed.module.css";
import { pulse } from 'react-animations'
import styled, { keyframes } from 'styled-components';
import ModalAppointments from './ModalAppointments';
import telemed1 from "../../../assets/telemed1.jpg";
import telemed2 from "../../../assets/telemed2.jpg";
import telemed3 from "../../../assets/telemed3.jpg";
import telemed4 from "../../../assets/telemed4.jpg";


const Pulse = styled.div`animation: 5s ${keyframes`${pulse}`} infinite`;

const Telemed = () => {
    const [showModalAppoint, setShowModalAppoint] = useState(false);

    const handleOpenModal = () => {
        { setShowModalAppoint(true) }
    }

    return (
        <Container>
            <Container style={{ height: "8vh" }}></Container>
            <Container >
                <Pulse>
                    <button onClick={handleOpenModal} className={styles.btn} >
                        ЗАПИСАТЬСЯ
                    </button>
                </Pulse>
            </Container>
            <Container style={{ padding: "15px", boxShadow: "0px 0px 16px 0px rgba(34, 60, 80, 0.6) inset" }}>
                <Container style={{ boxShadow: "0px 0px 16px 0px rgba(34, 60, 80, 0.6) inset" }}>
                    <h2>Консультации в режиме реального времени </h2>
                    <p><span>Телемедицинские технологии</span> — позволяют в реальном масштабе времени вести прямой аудио-видеодиалог между врачами,
                        пациентом и его родственниками. Возможности телемедицины: телеконсультирование, телеобучение, теленаставничество,
                        домашняя телемедицина. Телемедицинская консультация — это проведенная на высоком уровне консультация, во время которой
                        врач и пациент территориально разобщены — консультант находится, например, в Санкт-Петербурге или другом городе страны
                        или зарубежья, а больной и его лечащий врач могут находиться в любом из регионов России или в другой стране.
                        В зависимости от конкретной задачи, в консультации могут участвовать сразу несколько врачей, в том числе разных
                        специальностей (телеконсилиум). Телемедицинскую консультацию проводят для уточнения диагноза, выдачи рекомендаций по
                        лечению, решения вопросов госпитализации после получения необходимой информации (эпикриз, рентген-снимки, МРТ,
                        видеозапись УЗИ и т.д.).
                    </p>
                    <p>
                        <span>Преимущества телеконсультаций:</span> возможность получения консультации в специализированных центрах у специалистов
                        высокого уровня; значительная экономия финансовых и временных затрат по сравнению с суммарными затратами на традиционную
                        поездку в медицинский центр.
                    </p>

                    <Container className="d-flex flex-wrap justify-content-between">
                        <img src={telemed1} alt="fotoTelemed" style={{width: "550px", height: "450px"}}/>
                        <img src={telemed2} alt="fotoTelemed" style={{width: "550px", height: "450px"}}/>
                        <img src={telemed3} alt="fotoTelemed" style={{width: "550px", height: "450px"}}/>
                        <img src={telemed4} alt="fotoTelemed" style={{width: "550px", height: "450px"}}/>
                    </Container>
                </Container>
            </Container>
            {ModalAppointments(showModalAppoint, setShowModalAppoint)}
        </Container>
    )
};
export default Telemed;