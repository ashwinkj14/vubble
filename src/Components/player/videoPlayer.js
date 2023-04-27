import React from 'react';
import { useParams } from 'react-router-dom';
import Player from '../video/Player';
import './videoPlayer.css'

function VideoPlayer() {
    const id = useParams().id;
    const nmap = {"csk":"https://vidstream-output.s3.amazonaws.com/assets/csk/MP4/csk.mp4",
    "aurora":"https://vidstream-output.s3.amazonaws.com/assets/aurora/MP4/aurora.mp4",
    "times-square":"https://vidstream-output.s3.amazonaws.com/assets/times-square/MP4/times-square.mp4",
"once-upon-a-time":"https://vidstream-output.s3.amazonaws.com/assets/once-upon-a-time/MP4/once-upon-a-time.mp4",
"Vikram":"https://vidstream-output.s3.amazonaws.com/assets/Vikram/MP4/Vikram.mp4",
"eagle-is-coming":"https://vidstream-output.s3.amazonaws.com/assets/eagle-is-coming/MP4/eagle-is-coming.mp4"};
    return(
        <div className='videoPlayer-container'>
            <Player src={`${nmap[id]}`}/>
        </div>
    );
}

export default VideoPlayer;