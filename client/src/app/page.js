"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  
  const router = useRouter();
  const [roomId, setRoomId] = useState("")
  const [name, setName] = useState("")
  const [name2, setName2] = useState("")
  const [error, setError] = useState("")
  const [error2, setError2] = useState("")

  const joinRoom = () => {

    if(!roomId || !name) {
      setError("Room id or name is missing")
      return;
    }
    router.push(`/room/${roomId}?name=${name}`);
  }

  const createAndJoin = () => {
    const roomId = uuidv4();
    if(!roomId || !name2) {
      setError2("Room id or name is missing")
      return;
    }
    router.push(`/room/${roomId}?name=${name2}`);
  };

  return (
    <>
      <div className="flex items-center justify-center  h-screen   gap-4">
        <div className="flex flex-col items-center gap-4">
        <h1 className="text-xl ">Vid Meet App</h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Enter Name</label>
          <input
              type="text"
              placeholder="Enter Name"
              className="border-2 border-black pl-2 rounded-md mr-2"
              value={name}
              required
              id="name"
              onChange={(e)=>setName(e.target.value)}
            />
             <label htmlFor="roomId">Enter Room Id</label>
            <input
              type="text"
              placeholder="Enter room id"
              className="border-2 border-black pl-2 rounded-md mr-2"
              value={roomId}
              required
              id="roomId"
              onChange={(e)=>setRoomId(e.target.value)}
            />
            <button className="bg-blue-500 w-[30%] hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full" onClick={joinRoom}>
              Join
            </button>
          </div>
          {
            error && <div className="text-red-500">{error}</div>
          }
          <span>--------------- OR ---------------</span>
          <div className="flex flex-col gap-2">
          <label htmlFor="name2">Enter Name</label>
          <input
              type="text"
              placeholder="Enter Name"
              className="border-2 border-black pl-2 rounded-md mr-2"
              value={name2}
              required
              id="name2"
              onChange={(e)=>setName2(e.target.value)}
            />
             {
            error2 && <div className="text-red-500">{error2}</div>
          }
          <button className="bg-blue-500 w-[70%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={createAndJoin}>
            Create a new room{" "}
          </button>

          </div>
        </div>
        </div>
      </div>
    </>
  );
}
