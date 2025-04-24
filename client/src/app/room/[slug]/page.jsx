"use client";
import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/socketProvider";
import usePeer from "@/app/hooks/usePeer.js";
import useMediaStream from "@/app/hooks/useMediaStream.js";
import Player from "../../components/Player/index.js";
import usePlayer from "@/app/hooks/usePlayer.js";
import { useParams } from "next/navigation";
import Bottom from "../../components/Controls/Bottom/index.jsx";
import { cloneDeep } from "lodash";
import { motion } from "framer-motion";
import { VideoIcon, Copy } from "lucide-react";
import Link from "next/link.js";
import { Button } from "@/components/ui/button.jsx";
import { Card } from "@/components/ui/card.jsx";

const Page = () => {
  const socket = useSocket();
  const { peer, id } = usePeer();
  const roomId = useParams().slug;
  const { stream, isTrackInactive } = useMediaStream();
  const {
    player,
    setPlayer,
    playerHighlighted,
    nonHighlitedPlayer,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(id, roomId, peer);

  const [users, setUsers] = useState({});
  const [isConnecting, setIsConnecting] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (socket) {
      setIsConnecting(false);
    }
  }, [socket]);

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

        setUsers((prv) => ({
          ...prv,
          [newUser]: call,
        }));
      });

      call.on("connection", () => {
        console.log("ashdlsjlkdjsalj Guarab");
      });
    };

    socket?.on("user-connected", handleUserConnected);

    return () => {
      socket?.off("user-connected", handleUserConnected);
    };
  }, [socket, peer, stream, setPlayer]);

  useEffect(() => {
    const checkDisconnectedUsers = () => {
      Object.entries(nonHighlitedPlayer).forEach(([userId, user]) => {
        const videoTrack = user.stream?.getVideoTracks()[0];
        const audioTrack = user.stream?.getAudioTracks()[0];

        if (videoTrack && isTrackInactive(videoTrack)) {
          console.log(`User ${userId}'s video track probably disconnected`);
          removePlayer(userId);
        }

        if (audioTrack && isTrackInactive(audioTrack)) {
          console.log(`User ${userId}'s audio track probably disconnected`);
          removePlayer(userId);
        }
      });
    };

    const removePlayer = (userId) => {
      console.log("Leaving room: ", userId);
      users[userId]?.close();
      const playerCopy = cloneDeep(player);
      delete playerCopy[userId];
      setPlayer(playerCopy);
    };

    // Check every 5 seconds for inactive players
    const interval = setInterval(checkDisconnectedUsers, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [player, setPlayer]);

  useEffect(() => {
    const handleToggleAudio = (userId) => {
      console.log("Toggling audio", userId);
      setPlayer((prv) => {
        const copy = cloneDeep(prv);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId) => {
      console.log("Toggling video", userId);
      setPlayer((prv) => {
        const copy = cloneDeep(prv);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };

    const handleLeaveRoom = (userId) => {
      console.log("Leaving room: ", userId);
      users[userId]?.close();
      const playerCopy = cloneDeep(player);
      delete playerCopy[userId];
      setPlayer(playerCopy);
    };

    socket?.on("toggle-audio", handleToggleAudio);
    socket?.on("toggle-video", handleToggleVideo);
    socket?.on("leave-room", handleLeaveRoom);

    return () => {
      socket?.off("toggle-audio", handleToggleAudio);
      socket?.off("toggle-video", handleToggleVideo);
      socket?.off("leave-room", handleLeaveRoom);
    };
  }, [socket, toggleAudio, toggleVideo, setPlayer, player, users, peer]);

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

        setUsers((prv) => ({
          ...prv,
          [callerId]: call,
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
  }, [stream, id, setPlayer]);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <header className="bg-slate-800 py-4 px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <VideoIcon className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-xl text-white">MeetUp</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-sm text-slate-300 hidden sm:block">
              Room ID:
            </div>
            <div className="bg-slate-700 text-white text-sm py-1 px-3 rounded-md font-mono">
              {roomId}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyRoomId}
              className="text-slate-300 hover:text-white"
            >
              {copied ? (
                <span className="text-green-500">✓</span>
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
        {isConnecting ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-white text-lg">Connecting to room...</p>
            </div>
          </div>
        ) : (
          <div className="h-full">
            <div className={`grid gap-4 h-full grid-cols-1 md:grid-cols-2`}>
              {/* My video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`relative `}
              >
                {playerHighlighted && (
                  <Card className="h-[60vh] overflow-hidden bg-slate-800 border-slate-700">
                    <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-2 py-1 rounded z-10">
                      You {playerHighlighted?.muted && "(Muted)"}{" "}
                    </div>
                    {playerHighlighted?.playing ? (
                      <Player
                        stream={playerHighlighted?.stream}
                        playing={playerHighlighted?.playing}
                        muted={true}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-slate-700">
                        <div className="h-24 w-24 rounded-full bg-slate-600 flex items-center justify-center">
                          <span className="text-3xl text-white">You</span>
                        </div>
                      </div>
                    )}
                  </Card>
                )}
              </motion.div>

              {/* Peer videos */}
              {playerHighlighted &&
                Object.keys(nonHighlitedPlayer).length == 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className={`relative`}
                  >
                    <Card className=" h-[60vh] bg-slate-800 border-slate-700">
                      <div className="h-full relative w-full flex items-center justify-center bg-slate-700">
                        <span className="text-3xl z-[100] text-white">
                          Waiting...
                        </span>
                        <motion.div
                          className="absolute h-24 w-24 bg-slate-600 rounded-full"
                          animate={{
                            scale: [1, 0.8, 1],
                            opacity: [0.7, 0.9, 0.7],
                          }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 3,
                          }}
                        />
                      </div>
                    </Card>
                  </motion.div>
                )}

              {Object.keys(nonHighlitedPlayer).length !== 0 &&
                Object.keys(nonHighlitedPlayer).map((playerId, index) => {
                  const { stream, muted, playing } = player[playerId];
                  console.log("Player: ", player);
                  if (!stream) return null;
                  return (
                    <motion.div
                      key={playerId}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                      className={`relative `}
                    >
                      <Card className=" h-[60vh] overflow-hidden bg-slate-800 border-slate-700">
                        <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-2 py-1 rounded z-10">
                          Participant {index + 1}
                        </div>
                        {playing ? (
                          <Player
                            stream={stream}
                            playing={playing}
                            muted={muted}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-slate-700">
                            <div className="h-24 w-24 rounded-full bg-slate-600 flex items-center justify-center">
                              <span className="text-3xl text-white">
                                P{index + 1}
                              </span>
                            </div>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        )}
      </main>

      <Bottom
        muted={playerHighlighted?.muted}
        playing={!playerHighlighted?.playing}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        leaveRoom={leaveRoom}
      />
    </div>
  );
};

export default Page;
