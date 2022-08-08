import { Modal, Form } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDeps } from "../../../features/departments/depsSlice";
import styles from "./Telemed.module.css";

const ModalAppointments = (showModalAppoint, setShowModalAppoint) => {
   const dispatch = useDispatch();

   const deps = useSelector((state) => state.deps.departments);

   const [selectedService, setSelectedService] = useState();

   useEffect(() => {
      dispatch(getDeps());
   }, [dispatch]);

   useEffect(() => {
      dispatch(getDeps());
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
               <Form.Group className="mb-3" controlId="formBasicServices">
                  <Form.Label style={{ color: "black" }}>Выберите услугу</Form.Label>
                  <Form.Select onChange={(e) => handleSelectServices(e.target.value)}
                     value={selectedService}>
                     <option />
                     {deps.map((dep, index) => {
                        return (
                           <option style={index % 2 === 0 ?
                              { fontSize: "18px", background: "white" }
                              :
                              { fontSize: "18px", background: "#7bbbf8" }}
                              value={dep.title}>
                              {dep.title}
                           </option>
                        )
                     })}
                  </Form.Select>
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicDoctor">
                  <button className={styles.btn}>ЗАПИСАТЬСЯ</button>
               </Form.Group>
            </Form>
         </Modal.Body>
      </Modal>
   )
};
export default ModalAppointments;