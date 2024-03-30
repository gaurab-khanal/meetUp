import { useSocket } from "@/context/socketProvider";
import { useParams } from "next/navigation";
import {Peer} from "peerjs";
import { useEffect, useRef, useState } from "react";


const usePeer = ()=>{
    const socket = useSocket();
    const roomId = useParams().slug;
    const [peer, setPeer]  = useState(null);
    const [id, setId] = useState(null);
    const myPeer = new Peer();


    const isPeerset = useRef(false)

    useEffect(()=>{
        if(isPeerset.current || !roomId || !socket)  return;
        isPeerset.current = true
        setPeer(myPeer);
        myPeer.on("open", (id)=>{
            console.log("Peer connected: ", id)
                socket?.emit("join-room",{ roomId, id});
            setId(id);
        });
    }, [roomId,socket, myPeer])


    return {peer, id}

}


export default usePeer;