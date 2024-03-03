import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Movies.css';

const API_KEY = '537fc94f598907b51d72f500bcb07467';
const BASE_URL = 'https://api.themoviedb.org/3';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
      setSearchResults(JSON.parse(lastSearch));
      setShowSearchResults(true);
    }
  }, []);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.results);
      setShowSearchResults(true);
      localStorage.setItem('lastSearch', JSON.stringify(data.results));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <div className="movies-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input className="search-input" type="text" value={searchQuery} onChange={handleChange} onKeyPress={handleKeyPress} />
        <button className="search-button" type="submit">Search</button>
      </form>
      {showSearchResults && (
        <ul className="movies-list">
          {searchResults.map((movie) => (
            <li className="movies-item" key={movie.id}>
              <Link className="movies-link" to={`/movies/${movie.id}`} state={{ fromMovies: true }}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Movies;
