import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import socket from "../../../socket";
import ACTIONS from "../../../socket/actions";
import { v4 } from "uuid";

const VideoChat = ({ user, token }) => {
  const navigate = useNavigate();
  const rootNode = useRef();

  const [rooms, updateRooms] = useState([]);

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    });  })

  const renderSwitch = () => {
    if (user.role !== "doctor" && rooms.length === 0) {
      return <h1>Нет начатых вебинаров</h1>
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
  return (
    <div>
      {!token ? (
        <div>
          Для проведения телемедицинской консультации необходимо 
          <button>Зарегистрироваться</button>
          или 
          <button>Авторизироваться</button>
        </div>
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
                navigate(`../course/room/${v4()}`);
              }}
            >
              Начать
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoChat;