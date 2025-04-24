import { useEffect, useRef } from "react";

const Player = ({ stream, muted, playing }) => {
  const videoRef = useRef(null);



  useEffect(() => {
    if (videoRef.current) {
      console.log('isrendered: ', stream);
      videoRef.current.srcObject = stream;
      videoRef.current.play()
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }

  }, [stream, muted, playing, videoRef.current]);


  return (
    <>
   <video
      ref={videoRef}
      playsInline
      autoPlay
      muted={muted}
      className='md:rounded-[12px]'
      style={{
        // borderRadius: '12px',
        overflow: 'hidden',
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        transform: 'scaleX(-1)'
      }}
    />
    </>
  );
};

export default Player;
