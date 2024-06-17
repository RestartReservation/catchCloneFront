import React from 'react';
import {Link} from "react-router-dom";
import '../css/StoreReview.css';

const StoreReview = ({ reviewData }) => {
    return (
        <div className="store-review">
            <p><Link to={`/reviews/${reviewData.reviewId}`}> 제목 : {reviewData.reviewTitle} </Link></p>
            <p>평점 : {reviewData.totalRating}</p>
            <p>작성일 : {reviewData.createdAt}</p>
            <p>좋아요 : {reviewData.likeCount}</p>
        </div>
    );
};
export default StoreReview;