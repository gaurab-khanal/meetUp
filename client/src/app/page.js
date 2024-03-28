"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  
  const router = useRouter();
  const [roomId, setRoomId] = useState("")

  const joinRoom = () => {

    if(!roomId) {
      setError("Please enter a room id")
      return;
    }
    router.push(`/room/${roomId}`);
  }

  const createAndJoin = () => {
    const roomId = uuidv4();
    router.push(`/room/${roomId}`);
  };

  return (
    <>
      <div className="flex items-center justify-center  h-screen   gap-4">
        <div className="flex flex-col items-center gap-4">
        <h1 className="text-xl ">Vid Meet App</h1>
        <div className="flex flex-col items-center gap-2">
          <div>
            <input
              type="text"
              placeholder="Enter room id"
              className="border-2 border-black pl-2 rounded-md mr-2"
              value={roomId}
              required
              onChange={(e)=>setRoomId(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full" onClick={joinRoom}>
              Join
            </button>
          </div>
          {
            error && <div className="text-red-500">{error}</div>
          }
          <span>OR</span>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={createAndJoin}>
            Create a new room{" "}
          </button>
        </div>
        </div>
      </div>
    </>
  );
}
