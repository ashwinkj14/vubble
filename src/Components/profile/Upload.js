import React from 'react';
// import AWS from 'aws-sdk';
import './Upload.css';
import {storage} from '../../services/firebase';
import {ref, uploadBytes} from 'firebase/storage';
import {user, database} from '../../services/firebase';
import {ref as databaseRef, set} from 'firebase/database';

// const S3_BUCKET = 'vidstream-input';
// const REGION = 'us-east-1';
// const ACCESS_KEY = 'AKIATVI4NKXF5XJWGFHD';
// const SECRET_ACCESS_KEY = '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';

// const s3 = new AWS.S3({
//   accessKeyId: ACCESS_KEY,
//   secretAccessKey: SECRET_ACCESS_KEY,
//   region: REGION,
// });


function Upload() {

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [showDialog, setShowDialog] = React.useState(false);

    const handleButtonClick = () => {
        setShowDialog(true);
    };

    const handleUpload = async () => {
      try {
        if(selectedFile!==null){
          await uploadVideo(selectedFile);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

    const handleSelectFile = async () => {
      try {
        const file = await getFile();
        setSelectedFile(file);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

      const getFile = () => {
        return new Promise((resolve, reject) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '*';
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
        const videoRef = ref(storage, `videos/${file.name}`);
        uploadBytes(videoRef, selectedFile).then(()=>{
          console.log('Video uploaded');
          const descr = document.querySelector("#video-description");
          set(databaseRef(database,`users/${user.displayName}`),{
            username:user.displayName,
            video:selectedFile.name,
            description:descr.value,
            views:"1",
            updated:"last 1 hour ago"
          });
          setShowDialog(false);
        });
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
            {showDialog && 
            (
                <div class="upload-popup-container">
                    <div class="upload-popup-content">
                        <button class="upload-close-button" onClick={()=>{setShowDialog(false);}}>&times;</button>
                        <div>Upload Video</div>
                        <div className="field-label">Description</div>
                        <div>
                          <input type="text" id='video-description'/>
                        </div>
                        <div className='btn-container'>
                          <button onClick={handleSelectFile} className='upload-btn'>
                            <span className='upload-btn-content'>
                              SELECT FILE
                            </span>
                          </button>
                          <button onClick={handleUpload} className='upload-btn'>
                            <span className='upload-btn-content'>
                              UPLOAD VIDEO
                            </span>
                          </button>
                        </div>
                    </div>
                </div>
            )
        }
        </div>
    );
}

export default Upload;