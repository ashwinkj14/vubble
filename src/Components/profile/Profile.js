import React from 'react';
import Upload from './Upload';
import './Profile.css';
import {user} from '../../services/firebase';

function Profile() {
    const [isHome, setIsHome] = React.useState(false);
    const [isPlayList, setIsPlayList] = React.useState(false);
    const [isManage, setIsManage] = React.useState(false);

    let name = user.displayName;
    let photoURL = user.photoURL;

    const handleClickForManage = () => {
        setIsHome(false);
        setIsPlayList(false);
        setIsManage(true);
    };

    const handleClickForHome = () => {
        setIsHome(true);
        setIsPlayList(false);
        setIsManage(false);
    };

    const handleClickForPlaylist = () => {
        setIsHome(false);
        setIsPlayList(true);
        setIsManage(false);
    };

    return(
        <div className='profile-container'>
            <div className='profile-header'>
                <div className='profile-image-container'>
                    <span className='profile-span-entry'>
                        <img id='profile-image' src={photoURL} alt='Ashwin'/>
                    </span>
                </div>
                <div className='profile-span-container'>
                    <span className='profile-span-entry'>
                        <span className='profile-name'>{name}</span>
                        <span className='profile-descr'>No videos</span>
                    </span>
                </div>
            </div>
            <div className='tabs-container'>
            <div className='tabs'>
                <div className='tab-entry'>
                    <span className={isHome?'span-entry span-entry-active':'span-entry'} onClick={handleClickForHome}>Home</span>
                </div>
                <div className='tab-entry'>
                    <span className={isPlayList?'span-entry span-entry-active':'span-entry'} onClick={handleClickForPlaylist}>Playlist</span>
                </div>
                <div className='tab-entry'>
                    <span className={isManage?'span-entry span-entry-active':'span-entry'} onClick={handleClickForManage}>Manage</span>
                </div>
            </div>
            </div>
            {isManage && <Upload/>}
        </div>
    );
}

export default Profile;