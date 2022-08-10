import { Modal, Form } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getService } from "../../../features/Services/ServicesSlice";
import { getUsers } from "../../../features/users/userSlice";
import { addAppointment } from "../../../features/appointment/appointmentSlice";
import { v4 } from "uuid";
import styles from "./Telemed.module.css";

const ModalAppointments = (showModalAppoint, setShowModalAppoint) => {
   const dispatch = useDispatch();

   const services = useSelector((state) => state.servicesReducer.services);
   const users = useSelector((state) => state.usersReducer.users);
   const userId = useSelector((state) => state.usersReducer.userId);
   const appointments = useSelector((state) => state.appointmentsReducer.appointments);

   const appointmentsUser = appointments.filter((appointment) => appointment.user === userId);

   const [selectedService, setSelectedService] = useState();
   const [selectedDoctor, setSelectedDoctor] = useState();

   useEffect(() => {
      dispatch(getService());
   }, [dispatch]);

   useEffect(() => {
      dispatch(getUsers());
   }, [dispatch]);

   const doctors = users.filter((doc) => doc.role === "doctor");

   const notAppointServices = () => {
      let result = [];
      if (appointmentsUser.length > 0) {
         for (let i = 0; i < appointmentsUser.length; i++) {
            for (let j = 0; j < services.length; j++) {
               if (appointmentsUser[i].service._id !== services[j]._id) {
                  result.push(services[j]);
               }
            }
         }
      }
      else {
         return services
      }
      return result;
   }

   if (!notAppointServices) {
      return ''
   }

   const handleClose = () => {
      setShowModalAppoint(false);
   }

   const handleSelectServices = (selected) => {
      setSelectedService(selected);
   }

   const handleSelectDoctor = (selected) => {
      setSelectedDoctor(selected);
   }

   const handleAddAppointment = (e) => {
      const doctorId = selectedDoctor;
      const user = userId;
      const service = selectedService;
      const roomId = v4();

      e.preventDefault();
      dispatch(addAppointment({ doctorId, user, service, roomId }));
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
               <Form.Group className="mb-3" controlId="formBasicServices">
                  <Form.Label style={{ color: "black" }}>Выберите услугу</Form.Label>
                  <Form.Select onChange={(e) => handleSelectServices(e.target.value)}
                     value={selectedService}>
                     <option />
                     {notAppointServices().map((service, index) => {
                        return (
                           <option style={index % 2 === 0 ?
                              { fontSize: "18px", background: "white" }
                              :
                              { fontSize: "18px", background: "#7bbbf8" }}
                              value={service._id}
                              key={index}>
                              {service.title}
                           </option>
                        )
                     })
                     }
                  </Form.Select>
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicDoctor">
                  <Form.Label style={{ color: "black" }}>Выберите врача</Form.Label>
                  <Form.Select onChange={(e) => handleSelectDoctor(e.target.value)}
                     value={selectedDoctor}>
                     <option />
                     {doctors.map((doc, index) => {
                        return (
                           <option style={index % 2 === 0 ?
                              { fontSize: "18px", background: "white" }
                              :
                              { fontSize: "18px", background: "#7bbbf8" }}
                              value={doc._id}
                              key={index}>
                              {doc.lastName} {doc.firstName}
                           </option>
                        )
                     })}
                  </Form.Select>
               </Form.Group>

               <Form.Group className="d-flex justify-content-end mb-3" controlId="formBasicButton">
                  <button onClick={handleAddAppointment} className={styles.btn}>ЗАПИСАТЬСЯ</button>
               </Form.Group>
            </Form>
         </Modal.Body>
      </Modal>
   )
};
export default ModalAppointments;