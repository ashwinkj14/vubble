import React from 'react';
import { useParams } from 'react-router-dom';
import Player from '../video/Player';
import './videoPlayer.css'
import {s3} from '../../services/aws';

const S3_BUCKET = 'vidstream-output';

function VideoPlayer() {
    const id = useParams().id;
    const videoKey = "assets/"+id+"/MP4/"+id+".mp4";
    
    const video_urlParams = {
        Bucket: S3_BUCKET,
        Key: videoKey,
        Expires: 3600 // Number of seconds the URL is valid for
    };

    const videoUrl = s3.getSignedUrl('getObject', video_urlParams);

    return(
        <div className='videoPlayer-container'>
            <Player src={`${videoUrl}`}/>
        </div>
    );
}

export default VideoPlayer;