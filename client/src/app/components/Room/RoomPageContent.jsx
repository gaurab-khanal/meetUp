"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Copy, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Loader from "@/components/ui/loader";

export default function RoomPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [roomId, setRoomId] = useState("");
  const [activeTab, setActiveTab] = useState(
    searchParams.get("create") === "true" ? "create" : "join"
  );
  const [copied, setCopied] = useState(false);
  const [generatedRoomId, setGeneratedRoomId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Generate a room ID when the component mounts
    setGeneratedRoomId(uuidv4());
  }, []);

  const handleCreateRoom = () => {
    setLoading(true);
    router.push(`/room/${generatedRoomId}`);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    setLoading(true);
    if (roomId.trim()) {
      router.push(`/room/${roomId}`);
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(generatedRoomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen px-3 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      <header className="container mx-auto py-6">
        <Link href="/" className="flex items-center gap-2">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl">MeetUp</span>
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-slate-200 dark:border-slate-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Video Chat Room
              </CardTitle>
              <CardDescription className="text-center">
                Create a new room or join an existing one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="create">Create Room</TabsTrigger>
                  <TabsTrigger value="join">Join Room</TabsTrigger>
                </TabsList>
                <TabsContent value="create" className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Your Room ID:</div>
                    <div className="flex">
                      <Input
                        value={generatedRoomId}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="ml-2"
                        onClick={copyRoomId}
                      >
                        {copied ? (
                          <span className="text-green-500">✓</span>
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Share this ID with others so they can join your room.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="join">
                  <form onSubmit={handleJoinRoom} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="roomId" className="text-sm font-medium">
                        Enter Room ID:
                      </label>
                      <Input
                        id="roomId"
                        placeholder="Enter the room ID to join"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="font-mono"
                        required
                      />
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              {activeTab === "create" ? (
                <Button className="w-full group" onClick={handleCreateRoom}>
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      Create & Join Room
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleJoinRoom}
                  disabled={!roomId.trim()}
                >
                  {loading ? <Loader /> : <>Join Room</>}
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      <footer className="bg-slate-100 dark:bg-slate-800 py-4">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-300">
          <p>© {new Date().getFullYear()} MeetUp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
