import React, { useEffect, useState } from "react";
import axios from "axios";
import './DescriptionBox.css';

const DescriptionBox = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: '', comment: '' });
  const token = localStorage.getItem("auth-token");

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/products/${product.id}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:4000/products/${product.id}/reviews`,
        newReview,
        {
       headers: {
      "auth-token": token
    }
        }
      );
      setNewReview({ rating: '', comment: '' });
      fetchReviews(); // refresh reviews
    } catch (err) {
      console.error("Review submission failed", err);
      alert("Error submitting review. Make sure you're logged in.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product.id]);

  return (
    <div className="descriptionbox">
      {/* <div className="descriptionbox-navigator">
        <div className="dis-nav-box">Description</div>
      </div>

      <div className="disbox-dis">
        <p>{product.description || "No description available."}</p>
      </div> */}

      <div className="dis-nav-box fade">Reviews ({reviews.length})</div>

      <div className="disbox-dis">
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((rev, idx) => (
              <li key={idx}>
                <strong>{rev.username}</strong> ({rev.rating}★): {rev.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

        {token ? (
          <form onSubmit={submitReview} className="review-form">
            <label>Rating (1–5)</label>
            <input
              type="number"
              value={newReview.rating}
              min="1"
              max="5"
              required
              onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            />

            <label>Comment</label>
            <textarea
              value={newReview.comment}
              required
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Write your review here..."
            />

            <button type="submit">Submit Review</button>
          </form>
        ) : (
          <p><i>You need to log in to submit a review.</i></p>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
