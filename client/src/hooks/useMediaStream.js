"use client"
import { useEffect, useRef, useState } from "react"

const useMediaStream = ()=>{
    const [state, setState] = useState(null)
    const isStreamSet = useRef(false);

    useEffect(()=>{
        if(isStreamSet.current) return;
        isStreamSet.current = true;
        (async ()=>{
            try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            console.log("Setting your stream: ", stream)
            setState(stream);
            } catch (error) {
                console.log("Error getting media stream: ", error)
            }
        })()
    }, [])

    return {
        stream: state
    }
}


export default useMediaStream