"use client";
import React, { useEffect } from "react";
import { useSocket } from "@/context/socketProvider";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import ReactPlayer from "react-player";
import Player from "../../../../components/Player";
import usePlayer from "@/hooks/usePlayer";

const page = () => {
  const socket = useSocket();
  const { peer, id } = usePeer();
  const { stream } = useMediaStream();
  const { player, setPlayer, playerHighlighted, nonHighlitedPlayer } =
    usePlayer(id);

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
      });
    };

    socket?.on("user-connected", handleUserConnected);

    return () => {
      socket?.off("user-connected", handleUserConnected);
    };
  }, [socket, peer, stream]);

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
    <div className="h-screen w-screen p-10 flex  items-center justify-center">
      <div className="border-2 border-black flex justify-between gap-5">
        <div className="relative ">
          {playerHighlighted && (
            <Player
              stream={playerHighlighted.stream}
              playing={playerHighlighted.playing}
              muted={playerHighlighted.muted}
            />
          )}
        {
            Object.keys(nonHighlitedPlayer).length !== 0 &&
            <div className="absolute h-[100px] bottom-3 border-2 border-black  right-3">
            {Object.keys(nonHighlitedPlayer).map((playerId) => {
              console.log("Player: ", player[playerId]);
              const { stream, muted, playing } = player[playerId];
              return (
                <Player key={playerId} stream={stream} playing={playing} muted />
              );
            })}
          </div>
        }
       
        </div>
        djsh
      </div>
    </div>
  );
};

export default page;
