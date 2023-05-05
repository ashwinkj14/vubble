import React from 'react';
import AWS from 'aws-sdk';
import './Upload.css';
import {user, database} from '../../services/firebase';
import {ref as databaseRef, set, get, push, child} from 'firebase/database';
import {sha256} from 'hash.js';

const S3_BUCKET = 'vidstream-input';
const REGION = 'us-east-1';
const ACCESS_KEY = 'AKIATVI4NKXF5XJWGFHD';
const SECRET_ACCESS_KEY = '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';

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
});

function hashStringWithTime(str) {
  const timestamp = Date.now().toString();
  const input = str + timestamp;
  const hash = sha256().update(input).digest('hex');
  return hash;
}


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

      const addItem = (fileName) => {
        push(databaseRef(database,`users/${user.uid}/videos`), fileName);
      };
    
      const addVideoElement = (filename,descr) => {
        const addElement = {
          name:filename,
          description:descr.value,
          views:0,
          uploadedBy:user.displayName,
          updated:Date.now()
        };

        push(databaseRef(database,`videos/${filename}`), addElement);
      }
      

      const updateInDatabase = async(fileName) => {
        const descr = document.querySelector("#video-description");
        const itemRef = databaseRef(database);
        await get(child(itemRef,`users/${user.uid}`))
        .then( async (snapshot) => {
          if(!snapshot.exists()){
             await set(databaseRef(database,`users/${user.uid}`),{
              username:user.displayName,
              email:user.email,
              videos:[]
            });
          }
        });
        addVideoElement(fileName,descr);
        addItem(fileName);
      }

      const uploadVideo = async (file) => {    
        const videoFile = file;
        const videoType = videoFile.type;
        if(videoType.includes("video")){
          const arr = videoType.split("video/");
          const extension = arr[1];

          const fileName = hashStringWithTime(selectedFile.name+user.uid);
          const videoKey = "inputs/"+fileName+"."+extension;

          const params = {
            Bucket: S3_BUCKET,
            Key: videoKey,
            Body: videoFile,
            ContentType: videoFile.type
          };

          s3.putObject(params, (err, data) => {
            if (err) {
              console.log('Error uploading video:', err);
            } else {
              console.log('Video uploaded successfully:', data);
              updateInDatabase(fileName);
              setShowDialog(false);
            }
          });
        }
        
      };
//"assets/Master/MP4/Master.mp4"
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