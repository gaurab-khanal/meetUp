"use client"
import React from "react";
import { useSocket } from "@/context/socketProvider";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import ReactPlayer from "react-player";
import Player from "../../../../components/Player";


const page = ({ params }) => {
  const socket = useSocket();

  const {peer, id} = usePeer();
  const {stream} = useMediaStream();

  return <div className="h-screen w-screen p-10">
  <Player  playerId={id} stream={stream}  playing={true}  muted={true} />
  </div>;
};

export default page;
