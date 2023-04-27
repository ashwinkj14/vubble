import React,{useState} from 'react';
import Description from './Description';
import {useNavigate} from 'react-router-dom';
import './video.css';

function Video(props) {
    let src = "https://i.ytimg.com/vi/oO5k-0QpxTk/maxresdefault.jpg";
    let descr = "";
    let username = "";
    if(Object.keys(props).length !== 0){
        src = props.src;
        descr = props.descr;
        username = props.username;
    }

    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);

    const handleClickEvent = () => {
        setRedirect(true);
    };

    if(redirect){
        navigate(`/play/${props.id}`);
    }

    return(
        <div className='video-main-container' onClick={handleClickEvent}>
            <div className='video-container'>
                <div className='video-thumbnail' style={{backgroundImage:`url(${src})`}}></div>
            </div>
            <Description descr={descr} username={username}/>
        </div>
    );
}

export default Video;