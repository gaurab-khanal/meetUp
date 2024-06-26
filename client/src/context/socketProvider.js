"use client"
import { useLayoutEffect, useState, useContext, createContext, useEffect } from "react";
import { io } from "socket.io-client";



export const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);

  return socket;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connection  = io("https://meetup-547e.onrender.com");
    setSocket(connection);
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
