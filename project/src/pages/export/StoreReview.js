import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/StoreReview.css';

const StoreReview = ({ reviewData }) => {
    const [reviewPictures] = useState(reviewData.reviewPictures);
    const reviewUrl = reviewPictures[0].reviewPictureUrl;

    return (
        <div>
            <div className='store-review-image' style={{ backgroundImage: `url(${reviewUrl})` }}></div>
             <div className="store-review">
            <p><Link to={`/reviews/${reviewData.reviewId}`}> 제목 : {reviewData.reviewTitle} </Link></p>
            <p>평점 : {reviewData.totalRating}</p>
            <p>작성일 : {reviewData.createdAt}</p>
            <p>좋아요 : {reviewData.likeCount}</p>
        </div>
        <div className='button-div'></div>
        </div>
       
    );
};

export default StoreReview;
