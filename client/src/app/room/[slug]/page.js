"use client";
import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/socketProvider";
import usePeer from "@/app/hooks/usePeer.js";
import useMediaStream from "@/app/hooks/useMediaStream.js";
import Player from "../../components/Player/index.js";
import usePlayer from "@/app/hooks/usePlayer.js";
import { useParams } from "next/navigation";
import Bottom from "../../components/Controls/Bottom";
import { cloneDeep } from "lodash";
import CopyRoomId from "@/app/components/Copy/index.js";


const Page = () => {
  const socket = useSocket();
  const { peer, id } = usePeer();
  const roomId = useParams().slug;  
  const { stream } = useMediaStream();
  const { player, setPlayer, playerHighlighted, nonHighlitedPlayer, toggleAudio, toggleVideo , leaveRoom} =
    usePlayer(id, roomId, peer);

    const [users, setUsers] = useState({});

  useEffect(() => {
    const handleUserConnected = (newUser) => {
      if (!stream) return;
      const call = peer?.call(newUser, stream);

      call?.on("stream", (incomingStream) => {
        console.log("Incoming stream: user: ", newUser);
        setPlayer((prv) => ({
          ...prv,
          [newUser]: {
            stream: incomingStream,
            muted: false,
            playing: true,
          },
        }));

      setUsers((prv)=>({
        ...prv,
        [newUser]: call
      })
      )
      });
    };

    socket?.on("user-connected", handleUserConnected);

    return () => {
      socket?.off("user-connected", handleUserConnected);
    };
  }, [socket, peer, stream]);

  useEffect(()=>{
    const handleToggleAudio = (userId)=>{
      console.log("Toggling audio", userId)
      setPlayer((prv)=>{
        const copy = cloneDeep(prv);
        copy[userId].muted = !copy[userId].muted;
        return {...copy}
    })
    }

    const handleToggleVideo = (userId)=>{
      console.log("Toggling video", userId)
      setPlayer((prv)=>{
        const copy = cloneDeep(prv);
        copy[userId].playing = !copy[userId].playing;
        return {...copy}
    })
    }

    const handleLeaveRoom = (userId)=>{
      console.log("Leaving room: ", userId)
      users[userId]?.close();
      const playerCopy = cloneDeep(player);
      delete playerCopy[userId];
      setPlayer(playerCopy);
    }

    socket?.on("toggle-audio", handleToggleAudio)
    socket?.on("toggle-video", handleToggleVideo)
    socket?.on("leave-room", handleLeaveRoom)

    return ()=>{
      socket?.off("toggle-audio", handleToggleAudio)
      socket?.off("toggle-video", handleToggleVideo)
      socket?.off("leave-room", handleLeaveRoom)
    }
      
  }, [socket, toggleAudio, toggleVideo])

  useEffect(() => {
    if (!peer || !stream) return;

    peer?.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);
      console.log("strejhs: ", stream);

      call.on("stream", (incomingStream) => {
        console.log("Incoming stream: from someone: ", incomingStream);
        setPlayer((prv) => ({
          ...prv,
          [callerId]: {
            stream: incomingStream,
            muted: false,
            playing: true,
          },
        }));

        setUsers((prv)=>({
          ...prv,
          [callerId]: call
        })
        )
      });
    });
  }, [peer, stream, setPlayer]);

  useEffect(() => {
    if (!stream || !id) return;
    setPlayer((prv) => ({
      ...prv,
      [id]: {
        stream: stream,
        muted: false,
        playing: true,
      },
    }));
  }, [stream, id]);

  return (
    <div className="h-full w-full p-10 flex gap-4 flex-col items-center justify-center">
      <div className="border-2 border-black flex justify-between gap-5">
        <div className="relative ">
          {playerHighlighted && (
            <Player
              stream={playerHighlighted.stream}
              playing={playerHighlighted.playing}
              muted={playerHighlighted.muted}
              anotherUser= {false}
            />
          )}
        {
            Object.keys(nonHighlitedPlayer).length !== 0 &&
            <div className="absolute h-[100px] bottom-3 gap-2 flex right-3">
            {Object.keys(nonHighlitedPlayer).map((playerId) => {
              console.log("Player: ", player[playerId]);
              const { stream, muted, playing } = player[playerId];
              return (
                <div className=" border-2 border-black ">

                <Player key={playerId} stream={stream} playing={playing} muted={muted}  anotherUser= {true}/>
                </div>
              );
            })}
          </div>
        }
       
        </div>
      </div>
      <CopyRoomId roomId={roomId}/>
      <Bottom
          muted={playerHighlighted?.muted}
          playing={playerHighlighted?.playing}
          toggleAudio={toggleAudio}
          toggleVideo={toggleVideo}
          leaveRoom={leaveRoom}
        />
    </div>
  );
};

export default Page;
