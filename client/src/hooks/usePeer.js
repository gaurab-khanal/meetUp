import {Peer} from "peerjs";
import { useEffect, useState } from "react";


const usePeer = ()=>{
    const [peer, setPeer]  = useState(null);
    const [id, setId] = useState(null);
    const myPeer = new Peer();

    useEffect(()=>{
        setPeer(myPeer);
        myPeer.on("open", (id)=>{
            console.log("Peer connected: ", id)
            setId(id);
        });
    }, [])

}


export default usePeer;