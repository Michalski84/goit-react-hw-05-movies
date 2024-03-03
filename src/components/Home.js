import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const API_KEY = '537fc94f598907b51d72f500bcb07467';
    const BASE_URL = 'https://api.themoviedb.org/3';

    const fetchMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
