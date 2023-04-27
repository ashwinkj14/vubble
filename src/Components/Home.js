import React from 'react';
import './Home.css';
import Video from './video/video';
import {get, ref, child} from 'firebase/database';
import {database,storage} from '../services/firebase';

function Home() {

  const dbRef = ref(database);
  let data = null;
  let data_key = null;
  const [userData, setUserData] = React.useState(false);
  get(child(dbRef, `users`)).then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val());
      data = snapshot.val();
      setUserData(true);
      setKey();
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
      console.error(error);
  });

  const setKey = () =>{
    if(data!=null){
      for(const key in data){
        data_key = key;
      }
    }
  }

  const count = 3;

  const getDivs = () =>{
    const divs = [];
    let index = 0;
    if(data!=null){
      for(const key in data){
        console.log(data);
        if(index===0 || (index+1)%count===0){
          // storage.ref("videos").child(data[key].video).getDownloadURL().then((url)=>{

          // });
          divs.push(<Video descr={data[key].description} username={data[key].username} id={data[key].video}/>);
        }
      }
    }
    return <div className='home-video-container'>{divs}</div>;
  }

  return (
    <div className="home">
      <div className='home-video-container'>
          {/* <Video descr={data[data_key].description} username={data[data_key].username} id={data[data_key].video}/> */}
          <Video descr="Aurora, the northern lights!!" username="Ashwin" src="https://vidstream-output.s3.amazonaws.com/assets/aurora/Thumbnails/aurora.0000000.jpg" id='aurora'/>
          <Video descr="Time Square, A happening place to visit, but some people think it's boring" username="Pranauv" src="https://vidstream-output.s3.amazonaws.com/assets/times-square/Thumbnails/times-square.0000000.jpg" id='times-square'/>
          <Video descr="CSK Roars again!!" username="Joanna" src="https://vidstream-output.s3.amazonaws.com/assets/csk/Thumbnails/csk.0000000.jpg" id='csk'/>
      </div>
      
      <div className='home-video-container'>
        <Video descr="Eagle is Coming" username="Ashwin" src="https://vidstream-output.s3.amazonaws.com/assets/eagle-is-coming/Thumbnails/eagle-is-coming.0000000.jpg" id="eagle-is-coming"/>
        <Video descr="Vikram Trailer!" username="Pranauv" src="https://vidstream-output.s3.amazonaws.com/assets/Vikram/Thumbnails/Vikram.0000000.jpg" id="Vikram"/>
        <Video descr="Once upon a time" username="Joanna" src="https://vidstream-output.s3.amazonaws.com/assets/once-upon-a-time/Thumbnails/once-upon-a-time.0000000.jpg" id="once-upon-a-time"/>
      </div>
    </div>
  );
}

export default Home;
