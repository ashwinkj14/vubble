import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    async function fetchFeaturedMovie() {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=030f3df2258f73c5b8e5125a5a190dde&language=en-US&page=1'
      );
      setFeaturedMovie(response.data.results[0]);
    }
    fetchFeaturedMovie();
  }, []);

  return (
    <div className="home">
      {featuredMovie && (
        <div
          className="banner"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path})`,
          }}
        >
          <div className="banner-content">
            <h1 className="banner-title">{featuredMovie.title}</h1>
            <p className="banner-description">{featuredMovie.overview}</p>
            <button className="banner-button">Watch Now</button>
          </div>
        </div>
      )}
      <div className="featured">
        <h2 className="featured-title">Featured Movies & TV Shows</h2>
        <div className="featured-list">
          {/* Display a grid of featured movies and TV shows */}
        </div>
      </div>
    </div>
  );
}

export default Home;
