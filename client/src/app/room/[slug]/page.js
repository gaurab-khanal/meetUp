"use client"
import React from "react";
import { useSocket } from "@/context/socketProvider";
import usePeer from "@/hooks/usePeer";
const page = ({ params }) => {
  const socket = useSocket();

  const {peer, id} = usePeer();

  return <div>page: {params.slug}</div>;
};

export default page;
