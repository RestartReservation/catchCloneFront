import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import '../css/ReviewScroll.css';

//남은 작업 : 무한스크롤 구현, 별점 드롭다운 구현, 댓글버튼, 좋아요 버튼 구현, 신고버튼 구현    


const ReviewImage = ({ reviewUrl }) => {
    return (
        <div className='review-scroll-review-image' style={{ backgroundImage: `url(${reviewUrl.reviewPictureUrl})` }}></div>
    );
}

const ReviewScroll = ({ reviewData }) => {
    const userProfileUrl = reviewData.userProfileUrl ? reviewData.userProfileUrl : '/sign-icon.jpg';
    const roundedRating = reviewData.totalRating.toFixed(1);
    const formattedDate = new Date(reviewData.createdAt).toISOString().split('T')[0];
    const [reviewPictures] = useState(reviewData.reviewPictures);
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({
            left: -150, // 스크롤할 픽셀 수
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({
            left: 150, // 스크롤할 픽셀 수
            behavior: 'smooth'
        });
    };

    return (
        <div className='review-scroll-space'>
            <div className='container-space-thin'></div>
            <div className='review-scroll-user-info'>
                <div className="review-scroll-user-profile-image" style={{ backgroundImage: `url(${userProfileUrl})` }}></div>
                <p className='review-scroll-user-nickname'>{reviewData.userNickName}</p>
            </div>
            <div className='review-scroll-star-rate'>
                <div><span className="review-scroll-star">★ </span><span className="review-scroll-star-rating">{roundedRating}</span> </div>
                <span className="review-scroll-created-date">{formattedDate}</span>
            </div>
            <div className='review-scroll-review-image-container'>
                <div className='review-scroll-review-image-div' ref={scrollContainerRef}>
                    {reviewPictures.length > 0 ? reviewPictures.map(reviewPictureUrl => <ReviewImage key={reviewPictureUrl.reviewPictureUrl} reviewUrl={reviewPictureUrl} />) : (<p>사진이 없습니다</p>)}
                </div>
                <button onClick={scrollLeft} className='scroll-arrow left'>&lt;</button>
                <button onClick={scrollRight} className='scroll-arrow right'>&gt;</button>
            </div>
            <div className='review-scroll-review-contents'>
                <p className='review-scroll-review-contents-p'>{reviewData.reviewContent}</p>
            </div>
        </div>
    );
}

export default ReviewScroll;
