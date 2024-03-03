import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import Cast from './Cast';
import Reviews from './Reviews';
import './MovieDetails.css';

const API_KEY = '537fc94f598907b51d72f500bcb07467';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <button onClick={handleGoBack}>
        Back
      </button>
      {movieDetails ? (
        <div className="details-container">
          <h2 className="title">{movieDetails.title}</h2>
          <div className='details-items'>
            <img className="poster" src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
            <p className="overview">{movieDetails.overview}</p>
          </div>
          <div className="links-container">
            <p>Additional information</p>
            <Link className="link" to={`${movieId}/cast`}>Cast</Link>
            <Link className="link" to={`${movieId}/reviews`}>Reviews</Link>
          </div>
          <Routes location={location}>
            <Route path={`${movieId}/cast`} element={<Cast />} />
            <Route path={`${movieId}/reviews`} element={<Reviews />} />
          </Routes>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetails;
