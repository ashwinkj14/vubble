import React from 'react';
import './Home.css';
import Video from './video/video';
import {get, ref, child} from 'firebase/database';
import {database} from '../services/firebase';
import {s3} from '../services/aws';

const S3_BUCKET = 'vidstream-output';

function Home() {

  const dbRef = ref(database);
  const [listItems, setListItems] = React.useState([]);
  const [videoData, setVideoData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  React.useEffect(() => {
      getRenderingData();
  },[isLoaded]);

  const constructVideoData = (data,keys) => {
    const videos = [];
    for (let key in keys) {
      const value = data[keys[key]];
      const vals = Object.keys(value);
      for (let k in vals) {
        let metaData = value[vals[k]];
        const fileName = metaData.name;
        const imageKey = "assets/"+fileName+"/Thumbnails/"+fileName+".0000000.jpg"
        
        const image_urlParams = {
          Bucket: S3_BUCKET,
          Key: imageKey,
          Expires: 3600
        };
        
        metaData.imageUrl = s3.getSignedUrl('getObject', image_urlParams);
        videos.push(metaData);
      }
    }
    return videos;
  }

  const getRenderingData = async () => {
    get(child(dbRef, `videos`)).then((snapshot) => {
      if (snapshot.exists()) {
        const rows = [];
        const data = snapshot.val();
        const keys = Object.keys(data);
        
        setVideoData(constructVideoData(data,keys));

        for (let i = 0; i < videoData.length; i += 3) {
          rows.push(videoData.slice(i, i + 3));
        }
  
        const items = rows.map((row, index) => (
          <div key={index} className='home-video-container'>
            {row.map((element, index) => (
              <Video key={index} descr={element.description} username={element.uploadedBy} src={element.imageUrl} id={element.name} views={element.views}/>
            ))}
          </div>
        ));

        setListItems(items);

        if(isLoaded===false){
          setIsLoaded(true);
        }

      } else {
          console.log("No data available");
      }
      }).catch((error) => {
        console.error(error);
    });
  }

  return (
    <div className="home">
      {listItems}
    </div>
  );
}

export default Home;
