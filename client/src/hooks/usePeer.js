import { useSocket } from "@/context/socketProvider";
import { useParams, useSearchParams } from "next/navigation";
import {Peer} from "peerjs";
import { useEffect, useRef, useState } from "react";


const usePeer = ()=>{

    const searchParams = useSearchParams()
 
  const name = searchParams.get('name')

    const socket = useSocket();
    const roomId = useParams().slug;
    const [peer, setPeer]  = useState(null);
    const [id, setId] = useState(null);
    const myPeer = new Peer();


    const isPeerset = useRef(false)

    useEffect(()=>{
        console.log("name: ", name)
        if(isPeerset.current || !roomId || !socket)  return;
        isPeerset.current = true
        setPeer(myPeer);
        console.log("room ", roomId)
        myPeer.on("open", (id)=>{
            console.log("Peer connected: ", id)
                socket?.emit("join-room",{ roomId, id, name});
            setId(id);
        });
    }, [roomId,socket])


    return {peer, id}

}


export default usePeer;