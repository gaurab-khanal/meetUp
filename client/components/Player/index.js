import React from "react";
import ReactPlayer from "react-player";



const Player = ({  stream, muted, playing }) => {
  return (
 
     
        <ReactPlayer
          url={stream}
          height={200}
          width={200}
          playing={playing}
          muted={muted}
       
        />
       
   
  );
};

export default Player;
