import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import socket from "../../../socket";
import ACTIONS from "../../../socket/actions";
import { v4 } from "uuid";
import { showModalSignIn, showModalSignUp } from "../../../features/users/userSlice";

const VideoChat = () => {
   const navigate = useNavigate();
   const rootNode = useRef();
   const dispatch = useDispatch();

   const role = useSelector((state) => state.usersReducer.role);

   const [rooms, updateRooms] = useState([]);

   useEffect(() => {
      socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
         if (rootNode.current) {
            updateRooms(rooms);
         }
      });
   }, []);

   const handleShowSignin = () => {
      setOpenModal(false);
      dispatch(showModalSignIn(true));
   };

   const renderSwitch = () => {
      if (role !== "doctor" && rooms.length === 0) {
         return <h1>Нет начатых вебинаров, если Вам назначена видеоконсультация, ожидайте</h1>
      }

      switch (role) {
         case "user":
            return <h1>Присоединиться к вебинару</h1>;
         case "doctor":
            return <h1>Начните вебинар</h1>;

         default:
            return <h1>Нет начатых вебинаров</h1>;
      }
   };

   return (
      <div>
         <div ref={rootNode}>
            {renderSwitch()}

            <ul>
               {rooms.map((roomID) => (
                  <li key={roomID}>
                     <button
                        onClick={() => {
                           navigate(`../telemed/room/${roomID}`);
                        }}
                     >
                        Присоединиться
                     </button>
                  </li>
               ))}
            </ul>

            {role === "doctor" && (
               <button
                  onClick={() => {
                     const roomID = v4();
                     navigate(`../telemed/room/${roomID}`);
                  }}
               >
                  Начать
               </button>
            )}
         </div>
      </div >
   );
};

export default VideoChat;