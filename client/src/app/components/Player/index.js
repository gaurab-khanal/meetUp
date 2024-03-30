import React from "react";
import ReactPlayer from "react-player";
import {
  CiMicrophoneOn,
  CiMicrophoneOff,
} from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
const Player = ({ stream, muted, playing, anotherUser }) => {


  return (
    <>
    <div className="relative h-full w-full">

   
    {playing ? <ReactPlayer
        url={stream}
        height="100%"
        width="100%"
        playing={playing}
        muted={muted}
      />:
      anotherUser ? 
      <div className="h-[40px] w-[130px] flex justify-center">
      <CgProfile  className="text-white mt-10"/>
    </div>
      : 
      <div className= "h-[450px] w-[550px] flex items-center justify-center" >
      <CgProfile  className="text-5xl "/>
    </div>

    }
      {anotherUser && (
        <div className="absolute bottom-0 right-0 p-2  ">
          {console.log("Muted: ", muted)}
          {muted ? (
            <CiMicrophoneOff className=" rounded-full " />
          ) : (
            <CiMicrophoneOn className=" rounded-full " />
          )}
        </div>
      )}
       </div>
    </>
  );
};

export default Player;
