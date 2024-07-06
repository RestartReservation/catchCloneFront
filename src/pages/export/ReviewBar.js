import React, { useEffect, useState } from 'react';
import '../css/reviewBar.css';

const ReviewBars = ({ reviews, reviewCount }) => {
  const [reviewScoreCounts, setReviewScoreCounts] = useState([0, 0, 0, 0, 0]);

  const calculateAverageRating = (review) => {
    const { tasteRating, atmosphereRating, serviceRating } = review;
    const averageRating = (tasteRating + atmosphereRating + serviceRating) / 3;
    return Math.floor(averageRating);
  };

  // 리뷰 평점 개수 계산
  const countReviewsByScore = () => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      const averageRating = calculateAverageRating(review);
      if (averageRating >= 1 && averageRating <= 5) {
        counts[averageRating - 1]++;
      }
    });
    return counts;
  };

  useEffect(() => {
    const reviewScoreCount = async () => {
      try {
        const counts = countReviewsByScore();
        setReviewScoreCounts(counts);
      } catch (error) {
        console.error(error);
      }
    };

    reviewScoreCount();
  }, [reviews]); // reviews 배열이 변경될 때마다 다시 계산

  return (
    <div className="review-bars">
      {reviewScoreCounts.slice().reverse().map((count, index) => (
        <div key={index} className="review-bar">
          <span className= "review-bar-score">{5 - index}점:</span>
          <div className="bar">
            <div
              className="fill"
              style={{ width: `${(count / reviewCount) * 100}%` }}
            ></div>
          </div>
          <span className = "review-bar-count">  {count}</span>
        </div>
      ))}
    </div>
  );
};

export default ReviewBars;
