import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import NavBar from './Components/navbar/NavBar';
import Profile from './Components/profile/Profile';
import VideoPlayer from './Components/player/videoPlayer';

class App extends React.Component {
  handleSearch = (searchTerm) => {
    console.log('Searching for', searchTerm);
  };
  render(){
  return (
    <Router>
      <div className="App">
        <NavBar onSubmit={this.handleSearch}/>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/play/:id" element={<VideoPlayer/>} />
        </Routes>
      </div>
    </Router>
    );
  }
}


export default App;
