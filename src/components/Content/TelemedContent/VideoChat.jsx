import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import socket from "../../../socket";
import ACTIONS from "../../../socket/actions";
import { v4 } from "uuid";
import { Modal, Container } from "react-bootstrap";
import styles from "./VideoChat.module.css";
import { showModalSignIn, showModalSignUp } from "../../../features/users/userSlice";

const VideoChat = () => {
   const navigate = useNavigate();
   const rootNode = useRef();
   const dispatch = useDispatch();

   const token = useSelector((state) => state.usersReducer.token);
   const user = useSelector((state) => state.usersReducer.user);

   const [rooms, updateRooms] = useState([]);
   const [openModal, setOpenModal] = useState(!token);

   useEffect(() => {
      socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
         if (rootNode.current) {
            updateRooms(rooms);
         }
      });
   });

   const handleShowSignin = () => {
      setOpenModal(false);
      dispatch(showModalSignIn(true));
    };

    const handleShowSignup = () => {
      setOpenModal(false);
      dispatch(showModalSignUp(true));
    };

   const renderSwitch = () => {
      if (user.role !== "doctor" && rooms.length === 0) {
         return <h1>Нет начатых вебинаров, если у Вам назначена видеоконсультация, ожидайте</h1>
      }

      switch (user?.role) {
         case "user":
            return <h1>Присоединиться к вебинару</h1>;
         case "doctor":
            return <h1>Начните вебинар</h1>;

         default:
            return <h1>Нет начатых вебинаров</h1>;
      }
   };

   const hundleCloseModal = () => {
      setOpenModal(false);
   }

   return (
      <div>
         {!token ? (
            <Modal
               show={openModal}
               onHide={hundleCloseModal}
               keyboard={true}
               backdrop="static"
               style={{ fontFamily: "Roboto Condensed, sans-serif" }}
            >
               <Modal.Header closeButton>
                  <Modal.Title >
                     <span>ПРЕДУПРЕЖДЕНИЕ</span>
                  </Modal.Title>
               </Modal.Header>

               <Modal.Body>
                  <h3>Для проведения телемедицинской консультации необходимо</h3>
                  <Container className="d-flex justify-content-between my-4">
                     <button className={styles.btn} onClick={handleShowSignup}>
                        зарегистрироваться
                     </button>
                     или
                     <button className={styles.btn} onClick={handleShowSignin}>
                        авторизироваться
                           </button>
                  </Container>
               </Modal.Body>
            </Modal>

         ) : (
            <div ref={rootNode}>
               {renderSwitch()}

               <ul>
                  {rooms.map((roomID) => (
                     <li key={roomID}>
                        <span>{roomID} вебинар ведется</span>
                        <button
                           onClick={() => {
                              navigate(`../course/room/${roomID}`);
                           }}
                        >
                           Присоединиться
                        </button>
                     </li>
                  ))}
               </ul>

               {user.role === "doctor" && (
                  <button
                     onClick={() => {
                        navigate(`room/${v4()}`);
                     }}
                  >
                     Начать
                  </button>
               )}
            </div>
         )}
      </div >
   );
};

export default VideoChat;