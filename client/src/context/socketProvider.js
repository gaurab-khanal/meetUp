"use client"
import { useState, useContext, createContext, useEffect } from "react";
import { io } from "socket.io-client";



export const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);

  return socket;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  // https://meetup-547e.onrender.com

  useEffect(() => {
    const connection  = io("http://localhost:4000");
    setSocket(connection);
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
