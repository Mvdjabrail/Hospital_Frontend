import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import socket from "../../../socket";
import ACTIONS from "../../../socket/actions";
import { v4 } from "uuid";

const VideoChat = () => {
   const navigate = useNavigate();
   const rootNode = useRef();

   const role = useSelector((state) => state.usersReducer.role);

   const [rooms, updateRooms] = useState([]);

   useEffect(() => {
      socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
         if (rootNode.current) {
            updateRooms(rooms);
         }
      });
   }, []);

   return (
      <div>
         <div ref={rootNode}>
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