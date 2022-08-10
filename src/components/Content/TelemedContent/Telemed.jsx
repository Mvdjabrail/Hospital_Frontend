import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import styles from "./Telemed.module.css";
import { pulse } from 'react-animations'
import styled, { keyframes } from 'styled-components';
import ModalAppointments from './ModalAppointments';
import ModalMyAppointments from './ModalMyAppointments';
import { fetchAppointments } from "../../../features/appointment/appointmentSlice";
import telemed1 from "../../../assets/telemed1.jpg";
import telemed2 from "../../../assets/telemed2.jpg";
import telemed3 from "../../../assets/telemed3.jpg";
import telemed4 from "../../../assets/telemed4.jpg";

const Pulse = styled.div`animation: 2s ${keyframes`${pulse}`} infinite`;

const Telemed = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    const appointments = useSelector((state) => state.appointmentsReducer.appointments);

    const [showModalAppoint, setShowModalAppoint] = useState(false);
    const [showModalMyAppoint, setShowModalMyAppoint] = useState(false);

    const userId = localStorage.getItem("userId");

    const appointmentsUser = appointments.filter((appointment) => appointment.user === userId);

    const handleOpenModal = () => {
        setShowModalAppoint(true)
    }

    const handleOpenModalMyAppoint = () => {
        setShowModalMyAppoint(true)
    }

    return (
        <Container>
            <Container style={{ height: "13vh" }}></Container>
            <Container className="d-flex justify-content-end">
                <button onClick={handleOpenModalMyAppoint} className={styles.btn}>
                    Ваши заявки...
                </button>
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

                    <Container className="d-flex flex-wrap justify-content-around">
                        <img src={telemed1} alt="fotoTelemed" style={{ width: "550px", height: "450px", margin: "10px 0" }} />
                        <img src={telemed2} alt="fotoTelemed" style={{ width: "550px", height: "450px", margin: "10px 0" }} />
                        <img src={telemed3} alt="fotoTelemed" style={{ width: "550px", height: "450px", margin: "10px 0" }} />
                        <img src={telemed4} alt="fotoTelemed" style={{ width: "550px", height: "450px", margin: "10px 0" }} />
                    </Container>
                </Container>
            </Container>
            {ModalAppointments(showModalAppoint, setShowModalAppoint)}
            {ModalMyAppointments(showModalMyAppoint, setShowModalMyAppoint)}
        </Container>
    )
};
export default Telemed;