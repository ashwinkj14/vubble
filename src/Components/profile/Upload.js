import React from 'react';
import { Storage } from 'aws-amplify';
import './Upload.css';

function Upload() {

    const handleButtonClick = async () => {
        try {
          const file = await getFile();
          await uploadVideo(file);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
    
      const getFile = () => {
        return new Promise((resolve, reject) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'video/*';
          input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
              resolve(file);
            } else {
              reject(new Error('No file selected'));
            }
          };
          input.click();
        });
      };
    
      const uploadVideo = async (file) => {
        const key = `videos/${file.name}`;
        try {
          const response = await Storage.put(key, file);
          console.log('File uploaded successfully:', response);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };

    return(
        <div className='upload-container'>
            <div className='manage-content-header'>
                <div className='manage-content-title'>
                    <span>Channel Content</span>
                </div>
                <div className='upload-btn-container'>
                    <button onClick={handleButtonClick} className='upload-btn'>
                        <span className='upload-btn-content'>
                            UPLOAD VIDEOS
                        </span>
                    </button>
                </div>
            </div>
            <div className='manage-video-content'>
                <div className='content-table-header'>
                    <div className='table-header-video content-table-header-cell'>
                        <span>File</span>
                    </div>
                    <div className='table-header-upload-time content-table-header-cell'>
                        <span>Uploaded time</span>
                    </div>
                    <div className='table-header-views content-table-header-cell'>
                        <span>Views</span>
                    </div>
                </div>
            </div>
            <div className='tab-divider'/>
            <div className='channel-content'>
                <div className='channel-content-default'>
                    <span>No Video</span>
                </div>
            </div>
        </div>
    );
}

export default Upload;