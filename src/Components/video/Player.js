import React, { useState, useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import './Player.css'

function Player(props) {
  const [player, setPlayer] = useState(null);
  const videoNode = useRef(null);

  useEffect(() => {
    if (player) {
      player.src(props.src);
      player.load();
    }
  }, [props.src]);

  useEffect(() => {
    if (videoNode.current) {
      const options = {
        autoplay: false,
        controls: true,
        sources: [{ src: props.src }],
      };
      const newPlayer = videojs(videoNode.current, options, () => {
        console.log('Video player is ready.');
      });
      setPlayer(newPlayer);
      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [props.src]);

  return (
      <div data-vjs-player>
        <video ref={videoNode} className="video-js"></video>
      </div>
  );
}

export default Player;
