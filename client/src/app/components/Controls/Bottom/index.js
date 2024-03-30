"use client"
import React from "react";
import {
  CiMicrophoneOn,
  CiMicrophoneOff,
  CiVideoOn,
  CiVideoOff,
} from "react-icons/ci";





import { FiPhoneOff } from "react-icons/fi";

const Bottom = ({ muted, playing, toggleAudio, toggleVideo, leaveRoom }) => {

  return (
    <div className="flex gap-4">
      {muted ? (
        <CiMicrophoneOff onClick={toggleAudio}  className="cursor-pointer p-2 rounded-full text-4xl bg-red-500"/>
      ) : (
        <CiMicrophoneOn onClick={toggleAudio}  className="cursor-pointer p-2 rounded-full text-4xl bg-gray-400 hover:bg-red-500"/>
      )}
        {playing ? (
           
             <CiVideoOn onClick={toggleVideo}  className="cursor-pointer p-2 rounded-full text-4xl bg-gray-400 hover:bg-red-500"/>
        
        ) : (
            <CiVideoOff onClick={toggleVideo} className="cursor-pointer p-2 rounded-full text-4xl bg-red-500"/>
        )}
        <FiPhoneOff onClick={leaveRoom} size="35" className="cursor-pointer p-2 rounded-full text-4xl bg-gray-400 hover:bg-red-500"
        />  
    </div>
  );
};

export default Bottom;
