import React from 'react';
import './UploadDialog.css';

function UploadDialog() {
    
    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleOnUpload = async () => {
        try {
            if(selectedFile!==null){
                await uploadVideo(selectedFile);
            }
          } catch (error) {
            console.error('Error uploading file:', error);
          }
    }

    const handleOnSelect = async () => {
        const file = await getFile();
        setSelectedFile(file);
    }

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
        const params = {
          Bucket: S3_BUCKET,
          Key: file.name,
          Body: file,
        };
        s3.upload(params, function (err, data) {
          if (err) {
            console.log('Error uploading file: ', err);
          } else {
            console.log('File uploaded successfully. S3 Location: ', data.Location);
          }
        });    
      };

    return(
        <div>
            {showDialog && 
            (
                <div class="popup-container" onClick={()=>{setShowDialog(false);}}>
                    <div class="popup-content">
                        <button class="close-button" onClick={()=>{setShowDialog(false);}}>&times;</button>
                        <h2>Join Vubble</h2>
                        <form className='popup-form'>
                            <label for="username">Username</label>
                            <input type="text" id="username" name="username" required/>
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required/>
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" required/>
                            <div className='signup-btns'>
                                <button className="submit-btn" type="submit">Sign Up</button>
                                <Login/>
                            </div>
                        </form>
                        <p>Already have an account? <a href="#">Log In</a></p>
                    </div>
                </div>
            )
        }
        </div>
    );
}

export default UploadDialog;