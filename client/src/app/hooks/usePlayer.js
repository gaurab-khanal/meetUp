"use client"
import { useSocket } from "@/context/socketProvider";
import { cloneDeep } from "lodash";
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation";

const usePlayer = (myId, roomId, peer)=>{
    const router = useRouter();
    const socket = useSocket();
    const [player, setPlayer] = useState({});
    const playerCopy = cloneDeep(player);
    const myStream = useRef(null);
    myStream.current = player[myId]?.stream;

    const playerHighlighted = playerCopy[myId];

    delete playerCopy[myId];

    const nonHighlitedPlayer = playerCopy;

    const toggleAudio = ()=>{
        console.log("Toggling audio")
        setPlayer((prv)=>{
            const copy = cloneDeep(prv);
            copy[myId].muted = !copy[myId].muted;
            return {...copy}
        })

        socket.emit("toggle-audio", myId, roomId)
        
    }


    const toggleVideo = ()=>{
        console.log("Toggling video")
        setPlayer((prv)=>{
            const copy = cloneDeep(prv);
            copy[myId].playing = !copy[myId].playing;
            return {...copy}
        })

        socket.emit("toggle-video", myId, roomId)
        
    }

    const leaveRoom = ()=>{
        socket.emit("leave-room", myId, roomId)
        console.log("Leaving room:  ", roomId);
        peer?.disconnect();
        router.push("/");
    }

    return {player, setPlayer, playerHighlighted, nonHighlitedPlayer, toggleAudio, toggleVideo, leaveRoom}
}

export default usePlayer