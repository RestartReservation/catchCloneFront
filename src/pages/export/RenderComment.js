import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_VARIABLE } from "./ExportUrl";
import '../css/Comment.css';

const RenderComment = ({ commentData }) => {
  const [comment, setComment] = useState(commentData);
  const [heartIcon, setHeartIcon] = useState(commentData.isLiked ? '/heart-full-1.png' : '/heart-empty.png');
  const [commentLikeCount, setCommentLikeCount] = useState(commentData.likeCount);
  const formattedDate = new Date(commentData.createdAt).toISOString().split('T')[0];
  const [commentId,setCommentId] = useState();

  useEffect(() => {
    setComment(commentData);
    setHeartIcon(commentData.isLiked ? '/heart-full-1.png' : '/heart-empty.png');
    setCommentLikeCount(commentData.likeCount);
    setCommentId(commentData.id);
  }, [commentData]);

  const handleLikeClick = async () => {
    console.log("likeclick")
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken === null) {
      alert("로그인 해 주세요");
      return;
    } else {
      try {
        await axios.post(URL_VARIABLE + `likes/comments/` + commentId, {}, {
          headers: { Authorization: `${jwtToken}` }
        });
        if (heartIcon === '/heart-empty.png') {
          setHeartIcon('/heart-full-1.png');
          setCommentLikeCount(commentLikeCount + 1);
        } else {
          setHeartIcon('/heart-empty.png');
          setCommentLikeCount(commentLikeCount - 1);
        }
      } catch (error) {
        console.error('API 호출 에러:', error);
      }
    }
  }

  const userProfileUrl = (profileUrl) => {
    return profileUrl ? profileUrl : '/sign-icon.jpg';
  }

  return (
    <div className='comment'>
      <div className='comment-user-info'>
        <div className="comment-user-profile-image" style={{ backgroundImage: `url(${userProfileUrl(comment.profileUrl)})` }}></div>
        <p className='comment-user-nickname'>{comment.nickName}</p>
        <span className="comment-created-date">{formattedDate}</span>
      </div>
      <div className='comment-contents-section'>
        <div className='comment-contents'>{comment.commentContent}</div>
        <div className='comment-contents-interaction'>
          <img className={`comment-like-image${comment.isLiked ? '-full' : ''}`} 
          src={heartIcon} 
          alt='Like Icon' 
          onClick={() => handleLikeClick()} />
          <p className="comment-like-count">{commentLikeCount}</p>
        </div>
      </div>
      <div className='container-space-thin'></div>
    </div>
  )
}

export default RenderComment;
