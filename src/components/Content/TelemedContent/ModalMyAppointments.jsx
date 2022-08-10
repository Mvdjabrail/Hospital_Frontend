import { Modal } from 'react-bootstrap';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments } from "../../../features/appointment/appointmentSlice";
import { MdDelete } from "react-icons/md";
import styles from "./Telemed.module.css";
import { BsCollectionPlayFill } from "react-icons/bs";

const ModalAppointments = (showModalMyAppoint, setShowModalMyAppoint) => {
    const userId = localStorage.getItem("userId");

    const appointments = useSelector((state) => state.appointmentsReducer.appointments);

    const appointmentsUser = appointments.filter((appointment) => appointment.user === userId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    const handleClose = () => {
        setShowModalMyAppoint(false);
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
                    <thead style={{ textAlign: "center" }}>
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
                        {appointments.map((appoint, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{appoint.doctorId.lastName} {appoint.doctorId.firstName[0]}.</td>
                                    <td>{appoint.service.title}</td>
                                    <td>{appoint.dateAndTime.slice(0, 10)} {appoint.dateAndTime.slice(11, 16)}</td>
                                    <td className={styles.text_align}>
                                        <button className={styles.btnDelAppoint}>
                                            <BsCollectionPlayFill color="red" size={20} />
                                        </button>
                                    </td>
                                    <td className={styles.text_align}>
                                        <button className={styles.btnDelAppoint}>
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