import { Modal, Form } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';

const ModalAppointments = (showModalAppoint, setShowModalAppoint) => {
    const dispatch = useDispatch();
    const [selectedService, setSelectedService] = useState();

    useEffect(() => {
        dispatch()
    }, [dispatch]);

    const handleClose = () => {
        setShowModalAppoint(false);
    }

    const handleSelectServices = (selected) => {
        setSelectedService(selected);
    }

    return (
        <Modal
            show={showModalAppoint}
            onHide={handleClose}
            keyboard={true}
            backdrop="static"
            style={{ fontFamily: "Roboto Condensed, sans-serif" }}
        >
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>
                    Запись на телемедицину
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicLogin">
                        <Form.Label style={{ color: "black" }}>Выберите услугу</Form.Label>
                        <Form.Select onChange={(e) => handleSelectServices(e.target.value)}
                            value={selectedService}>
                            <option value="user"> user </option>
                            <option value="admin"> admin </option>
                            <option value="author"> author </option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
};
export default ModalAppointments;