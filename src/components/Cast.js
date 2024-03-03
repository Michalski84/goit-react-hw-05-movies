import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Cast.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  const API_KEY = '537fc94f598907b51d72f500bcb07467';
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div className="cast-container">
      <h3 className="title">Cast</h3>
      <ul className="list">
        {cast.map((actor) => (
          <li key={actor.id} className="item">
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${actor.profile_path}`}
              alt={actor.name}
              className="image"
            />
            <p className="name">{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
