import React from "react";
import ReactPlayer from "react-player";



const Player = ({ playerId, stream, muted, playing }) => {
  return (
    <div className='border-2 border-black relative' style={{
        height: "90%",
        width: "80%",
        
    }}>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "10px",
        justifyContent: "space-betweeen",
        gap: "10px",
        alignItems: "center",
        height: "100%",
        width: "100%",
        overflow: "auto",
      }}>
        <ReactPlayer
          key={playerId}
          url={stream}
          height={200}
          width={200}
          playing={playing}
       
          muted={muted}
       
        /> <ReactPlayer
          key={playerId}
          url={stream}
          height={200}
          width={200}
          playing={playing}
       
          muted={muted}
       
        /> <ReactPlayer
          key={playerId}
          url={stream}
          height={200}
          width={200}
          playing={playing}
       
          muted={muted}
       
        /> <ReactPlayer
          key={playerId}
          url={stream}
          height={200}
          width={200}
          playing={playing}
       
          muted={muted}
       
        /> <ReactPlayer
          key={playerId}
          url={stream}
          height={200}
          width={200}
          playing={playing}
       
          muted={muted}
       
        /> <ReactPlayer
          key={playerId}
          url={stream}
          height={200}
          width={200}
          playing={playing}
       
          muted={muted}
       
        />
       
      </div>
    </div>
  );
};

export default Player;
