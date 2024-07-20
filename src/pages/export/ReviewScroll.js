import React, { useState, useRef } from 'react';
import axios from 'axios';
import { URL_VARIABLE } from "./ExportUrl"; 
import '../css/ReviewScroll.css';
import {Link} from "react-router-dom";


const ReviewImage = ({ reviewUrl }) => {
    return (
        <div className='review-scroll-review-image' style={{ backgroundImage: `url(${reviewUrl.reviewPictureUrl})` }}></div>
    );
}

const ReviewScroll = ({ reviewData , storeName}) => {
    const userProfileUrl = reviewData.userProfileUrl ? reviewData.userProfileUrl : '/sign-icon.jpg';
    const upIcon = '/up.png'
    const downIcon = '/down.png'
    const [heartIcon,setHeartIcon] = useState(reviewData.isLiked ? '/heart-full-1.png' : '/heart-empty.png');
    const bellIcon = '/bell.png'
    const commentIcon = '/comment.png'

    const roundedRating = reviewData.totalRating.toFixed(1);
    const formattedDate = new Date(reviewData.createdAt).toISOString().split('T')[0];
    const [reviewPictures] = useState(reviewData.reviewPictures);
    const [reviewLikeCount,setReviewLikeCount] = useState(reviewData.likeCount);
    const commentCount = reviewData.commentCount;

    const scrollContainerRef = useRef(null);
    const [ratingDetail, setRatingDetail] = useState('up');

    const handleRatingDetail = (ratingDetail) => {
        setRatingDetail(ratingDetail);
      };


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

    const handleLikeClick = async () => {
        const jwtToken = localStorage.getItem('jwtToken');
    
        if (jwtToken === null) {
            alert("로그인 해 주세요");
            return;
        } else {
            try {
                await axios.post(URL_VARIABLE + `likes/reviews/` + reviewData.reviewId, {}, {
                    headers: { Authorization: `${jwtToken}` }
                });
                if(heartIcon === '/heart-empty.png'){
                    setHeartIcon('/heart-full-1.png');
                    setReviewLikeCount(reviewLikeCount + 1);
                }
                else{
                    setHeartIcon('/heart-empty.png');
                    setReviewLikeCount(reviewLikeCount - 1);
                }
            } catch (error) {
                console.error('API 호출 에러:', error);
            }
        }
    }

    return (
        <div className='review-scroll-space'>
        <div className='container-space-thin'></div>
        <div className='review-scroll-user-info'>
            <div className="review-scroll-user-profile-image" style={{ backgroundImage: `url(${userProfileUrl})` }}></div>
            <p className='review-scroll-user-nickname'>{reviewData.userNickName}</p>
        </div>
        <div className='review-scroll-star-rate'>
            <div className="review-scroll-star-div">
                <span className="review-scroll-star">★ </span><span className="review-scroll-star-rating">{roundedRating}</span> 
                {ratingDetail === 'up' && (
                    <div className="review-scroll-down-icon-image" style={{ backgroundImage: `url(${downIcon})` }}  onClick={() => handleRatingDetail('down')}> </div>
                )
                }      
                {ratingDetail === 'down' && (
                    <div className="review-scroll-down-icon-image" style={{ backgroundImage: `url(${upIcon})` }}  onClick={() => handleRatingDetail('up')}> </div>
                )
                }      
            </div>
            <span className="review-scroll-created-date">{formattedDate}</span>
        </div>
        {ratingDetail === 'down' && (
                    <div className="review-scroll-star-rate-detail">
                          <span className="review-scroll-star-rate-detail-word">맛</span><span className="review-scroll-star-rate-detail-star">★ </span> <span className="review-scroll-star-rate-detail-rating">{reviewData.tasteRating.toFixed(1)}</span>
                          <span className="review-scroll-star-rate-detail-word">분위기</span><span className="review-scroll-star-rate-detail-star">★ </span> <span className="review-scroll-star-rate-detail-rating">{reviewData.atmosphereRating.toFixed(1)}</span>
                          <span className="review-scroll-star-rate-detail-word">서비스</span><span className="review-scroll-star-rate-detail-star">★ </span> <span className="review-scroll-star-rate-detail-rating">{reviewData.serviceRating.toFixed(1)}</span>
                    </div>
                )
                }  
        <div className='review-scroll-review-image-container'>
            <div className='review-scroll-review-image-div' ref={scrollContainerRef}>
            {reviewPictures.length > 0 ? reviewPictures.map((reviewPictureUrl, index) => (<ReviewImage key={`${reviewPictureUrl.reviewPictureUrl}-${index}`} reviewUrl={reviewPictureUrl} /> )) : (<p>사진이 없습니다</p>)}
            </div>
            <button onClick={scrollLeft} className='scroll-arrow left'>&lt;</button>
            <button onClick={scrollRight} className='scroll-arrow right'>&gt;</button>
        </div>
        <div className='review-scroll-review-contents'>
            <p className='review-scroll-review-contents-p'>{reviewData.reviewContent}</p>
        </div>
        <div className='review-scroll-review-interaction-contents'>
            <img className={`review-scroll-review-like-image ${reviewData.isLiked ? '-like-review' : ''}`}  src={heartIcon} alt='Like Icon' onClick={handleLikeClick}/>
            <span className='review-scroll-review-like-count'>{reviewLikeCount}</span>
            <Link to={`/comments/${storeName}/${reviewData.reviewId}`}><img className='review-scroll-review-comment'  src={commentIcon} alt='Comment Icon'/></Link>
            <span className='review-scroll-review-comment-count'>{commentCount}</span>
            <img className='review-scroll-review-declaration'  src={bellIcon} alt='Declaration Icon'/>
        </div>
    </div>
    );
}

export default ReviewScroll;
