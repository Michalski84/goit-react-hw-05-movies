import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Reviews.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = '537fc94f598907b51d72f500bcb07467';
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
        const data = await response.json();
        setReviews(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className="reviews-container">
      <h1 className="title">Reviews</h1>
      {loading ? (
        <p>Loading...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews available for this movie.</p>
      ) : (
        <ul className="list">
          {reviews.map((review) => (
            <li key={review.id} className="item">
              <p className="content">{review.content}</p>
              <p className="author">By: {review.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
