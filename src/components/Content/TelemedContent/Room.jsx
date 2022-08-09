
import React, { useState, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useWebRTC, { LOCAL_VIDEO } from "../../../hooks/useWebRTC";
import { RiMailSendLine } from "react-icons/ri"
import { BsCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { MdGroupAdd } from "react-icons/md";

function layout(clientsNumber = 1) {
   const pairs = Array.from({ length: clientsNumber }).reduce(
      (acc, next, index, arr) => {
         if (index % 2 === 0) {
            acc.push(arr.slice(index, index + 2));
         }
         return acc;
      },
      []
   );

   const rowsNumber = pairs.length;
   const height = `${80 / rowsNumber}%`;

   return pairs
      .map((row, index, arr) => {
         if (index === arr.length - 1 && row.length === 1) {
            return [
               {
                  width: "80%",
                  height,
               },
            ];
         }

         return row.map(() => ({
            width: "50%",
            height,
         }));
      })
      .flat();
}

const hundleSendMessage = () => {

}

const Room = () => {
   const { id: roomID } = useParams();
   const { clients, provideMediaRef, stream } = useWebRTC(roomID);
   const videoLayout = layout(clients.length);

   const rootNode = useRef();

   const [showVideo, setShowVideo] = useState(false);
   const [mute, setMute] = useState(false);

   const hundleHideVideo = () => {
      setShowVideo(!showVideo);
      stream.getVideoTracks()[0].enabled = showVideo;
   }

   const hundleHideMute = () => {
      setMute(!mute);
      stream.getAudioTracks()[0].enabled = mute;
   }

   return (
      <Container fluid className="d-flex p-0 my-0" style={{
         background: "#161D29", height: "100vh"
      }}>
         <Container fluid style={{ width: "70%", padding: 0 }}>
            <Container
               style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "between",
                  flexWrap: "wrap",
                  height: "100vh",
               }}
            >
               {clients.map((clientID, index) => {
                  return (
                     <div key={clientID} style={videoLayout[index]} id={clientID}>
                        <video
                           width="100%"
                           height="100%"
                           ref={(instance) => {
                              provideMediaRef(clientID, instance);
                           }}
                           autoPlay
                           playsInline
                           controls
                           muted={clientID === LOCAL_VIDEO}
                        />
                     </div>
                  );
               })}
            </Container>

            <Container fluid className="d-flex p-2 justify-content-between m-0"
               style={{ background: "#242F41" }}>
               <div style={{ margin: "0 10px", padding: 0, display: "flex" }}>
                  <Button onClick={hundleHideVideo} className={showVideo && "btn btn-danger"} style={{ marginRight: "20px" }}>
                     {showVideo ?
                        <BsFillCameraVideoOffFill size={30} color="white" />
                        :
                        <BsCameraVideoFill size={30} color="white" />
                     }
                  </Button>
                  <Button onClick={hundleHideMute} className={mute && "btn btn-danger"}>
                     {mute ?
                        <AiOutlineAudioMuted size={30} color="white" background="white" />
                        :
                        <AiFillAudio size={30} color="white" background="white" />
                     }
                  </Button>
               </div>
               <Link to='/'>
                  <Button >Выход</Button>
               </Link>
               <Button ><MdGroupAdd size={30} color="white" /></Button>
            </Container>
         </Container>

         <Container fluid style={{
            width: "30%", height: "108.3vh",
            background: "#242F41", position: "relative"
         }}>
            <Container fluid className="d-flex m-0 p-0"
               style={{ position: "absolute", bottom: 0, margin: "auto", width: "100%" }}>

               <Container fluid style={{ width: "80%" }}>
                  <textarea placeholder="Type message here..." style={{
                     borderRadius: "5px",
                     border: "none", width: "100%", resize: "none"
                  }} />
               </Container>

               <Container style={{ width: "20%", margin: "auto" }}>
                  <Button onClick={hundleSendMessage}><RiMailSendLine size={34} /></Button>
               </Container>

            </Container>
         </Container>
      </Container>
   );
};

export default Room;