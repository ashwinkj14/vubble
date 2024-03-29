import React from 'react';
import './Description.css';


function Description(props) {
    let defaultDesc = "Default description";
    let username = "ashwin";
    let views = "0";
    if(Object.keys(props).length !== 0){
        defaultDesc = props.descr;
        username = props.username;
        views = props.views;
    }
    
    return(
        <div className='descr-container'>
            <h3 className='meta-title'>
                {defaultDesc}
            </h3>
            <div className='channel-details'>
                <span className='channel-name'>{username}</span>
                <div className='video-details'>
                    <span className='video-meta'>{views} views</span>
                    {/* <span className='dot'>•</span>
                    <span className='video-upload-period'>2 hours ago</span> */}
                </div>
            </div>
        </div>
    );
}

export default Description;