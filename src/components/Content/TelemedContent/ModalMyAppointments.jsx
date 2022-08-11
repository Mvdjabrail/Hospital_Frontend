import { Modal } from 'react-bootstrap';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments, deleteAppointment } from "../../../features/appointment/appointmentSlice";
import { MdDelete } from "react-icons/md";
import styles from "./Telemed.module.css";
import { BsCollectionPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router";

const ModalAppointments = (showModalMyAppoint, setShowModalMyAppoint) => {
    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    const appointments = useSelector((state) => state.appointmentsReducer.appointments);

    const appointmentsUser = appointments.filter((appointment) => appointment.user._id === userId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    const handleClose = () => {
        setShowModalMyAppoint(false);
    }

    const handleEnterChat = (roomId) => {
        navigate(`../telemed/room/${roomId}`);
    }

    const handleDeleteAppoinment = (id) => {
        dispatch(deleteAppointment(id));
    }

    return (
        <Modal className="modal-lg"
            show={showModalMyAppoint}
            onHide={handleClose}
            keyboard={true}
            backdrop="static"
            style={{ fontFamily: "Roboto Condensed, sans-serif" }}
        >
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>
                    Мои записи на телемедицину
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <table className="table table-hover">
                    <thead >
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Доктор</th>
                            <th scope="col">Услуга</th>
                            <th scope="col">Дата назначения</th>
                            <th scope="col">Зайти</th>
                            <th scope="col">Отменить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentsUser.map((appoint, index) => {
                            const date = appoint.dateAndTime ? 
                            `${appoint.dateAndTime.slice(0, 10)} ${appoint.dateAndTime.slice(11, 16)}`
                            :
                            "ожидайте..."
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{appoint.doctorId.lastName} {appoint.doctorId.firstName[0]}.</td>
                                    <td>{appoint.service.title}</td>
                                    <td>{date}</td>
                                    <td className={styles.text_align}
                                    onClick={() => handleEnterChat(appoint.roomId)}>
                                        <button className={styles.btnDelAppoint}>
                                            <BsCollectionPlayFill color="red" size={20} />
                                        </button>
                                    </td>
                                    <td className={styles.text_align}>
                                        <button className={styles.btnDelAppoint}
                                            onClick={() => handleDeleteAppoinment(appoint._id)}>
                                            <MdDelete color="red" size={20} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    )
};
export default ModalAppointments;