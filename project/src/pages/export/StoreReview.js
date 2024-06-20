import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/StoreReview.css';

const StoreReview = ({ reviewData }) => {
    const [reviewPictures] = useState(reviewData.reviewPictures);
    const reviewUrl = reviewPictures[0].reviewPictureUrl;
    const formattedDate = new Date(reviewData.createdAt).toISOString().split('T')[0];
    const roundedRating = reviewData.totalRating.toFixed(1);
    const userProfileUrl = reviewData.userProfileUrl ? reviewData.userProfileUrl : '/sign-icon.jpg';

    return (
        <div>
           <Link to={`/reviews/${reviewData.reviewId}`}>  <div className='store-review-image' style={{ backgroundImage: `url(${reviewUrl})` }}></div></Link>
             <div className="store-review">
                <div className="store-review-info">
                <div className="user-profile-image" style={{ backgroundImage: `url(${userProfileUrl})` }}></div>
                    <div className="store-review-user-nickname">        
                    <p> 
                    <span className="nickname">{reviewData.userNickName}</span><br />
                    <span className="created-date">{formattedDate}</span>
                    </p>
         
                </div>
        
                <div className="store-review-star-rating">
                        <span className="store-review-star">★</span>
                        <span className="store-review-rating">{roundedRating}</span>
                    </div>
                
               
                </div>

                <p className="store-review-content">{reviewData.reviewContent}</p>
            </div>
        </div>
       
    );
};

export default StoreReview;
