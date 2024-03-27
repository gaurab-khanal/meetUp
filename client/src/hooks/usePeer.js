import {Peer} from "peerjs";
import { useEffect, useRef, useState } from "react";


const usePeer = ()=>{
    const [peer, setPeer]  = useState(null);
    const [id, setId] = useState(null);
    const myPeer = new Peer();


    const isPeerset = useRef(false)

    useEffect(()=>{
        if(isPeerset.current) return;
        isPeerset.current = true
        setPeer(myPeer);
        myPeer.on("open", (id)=>{
            console.log("Peer connected: ", id)
            setId(id);
        });
    }, [])


    return {peer, id}

}


export default usePeer;