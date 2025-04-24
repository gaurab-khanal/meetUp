"use client";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, VideoIcon, VideoOff, PhoneOff } from "lucide-react";

const Bottom = ({ muted, playing, toggleAudio, toggleVideo, leaveRoom }) => {
  return (
    <footer className="bg-slate-800 py-4 px-6 sticky bottom-0 left-0 right-0 z-[1000]">
      <div className="flex justify-center gap-4">
        <Button
          variant={muted ? "destructive" : "secondary"}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={toggleAudio}
        >
          {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        <Button
          variant={playing ? "destructive" : "secondary"}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={toggleVideo}
        >
          {playing ? (
            <VideoOff className="h-5 w-5" />
          ) : (
            <VideoIcon className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={leaveRoom}
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>
    </footer>
  );
};

export default Bottom;
