"use client";
import { useSocket } from "@/context/socketProvider";
import Image from "next/image";
import usePeer from "@/hooks/usePeer";
import { useEffect , useState} from "react";

export default function Home() {
  const socket = useSocket();
 
  useEffect(() => {
    const handleConnect = () => {
      console.log("Client connected");
      console.log(socket.id);
    };
    socket?.on("connect", handleConnect);
  }, [socket]); 

  return <>hello world</>;
}
