import React from "react";
import ReactPlayer from "react-player";



const Player = ({  stream, muted, playing }) => {
  return (
 

        <ReactPlayer
          url={stream}
          height="100%"
          width="100%"
          playing={playing}
          muted={muted}
       
        />
       
   
  );
};

export default Player;
