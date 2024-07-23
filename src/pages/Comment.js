import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';
import { URL_VARIABLE } from "./export/ExportUrl"; 
import './css/Comment.css';

const Comment = () => {
  const [comments,setComments] = useState([]);
  const [parentComments, setParentComments] = useState([]);
  const [childCommentsMap, setChildCommentsMap] = useState({});
  const {storeName, reviewId} = useParams();
  const backImage = '/back.png';
  const navigate = useNavigate();

  const [writeComment, setWriteComment] = useState('');



  const fetchComments = async () => {
    try {
      console.log(reviewId);
      const response = await axios.get(`${URL_VARIABLE}comments/reviews/${reviewId}`);
      setComments(response.data);
      console.log(comments);
    } catch (error) {
      console.error(error);
    }
  };

  const requestWriteComment = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      if(jwtToken === null) {
        alert("로그인 해 주세요");
      }
      const requestData = {
        commentContents: writeComment,
        isChild: false, // 임시
        parentId: null, // 임시
      };
      console.log(jwtToken);
      const response = await axios.post(
        `${URL_VARIABLE}comments/${reviewId}`,
        requestData,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      );

      fetchComments(); // 댓글 작성 후 다시 댓글 목록을 가져옴
      setWriteComment('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleWriteComment = (event) => {
    setWriteComment(event.target.value);
  };

  useEffect(() => {
    fetchComments();
  }, [reviewId]);

  const handleRequestComment = (event) => {
    event.preventDefault();
  };


  const handleBackClick = () => {
    localStorage.setItem('reviewCheck',true);
    navigate(-1);
};



  useEffect(() => {
    const parents = comments.filter(comment => comment.parentId === null);
    const childrenMap = comments
      .filter(comment => comment.parentId !== null)
      .reduce((map, comment) => {
        if (!map[comment.parentId]) {
          map[comment.parentId] = [];
        }
        map[comment.parentId].push(comment);
        return map;
      }, {});

    setParentComments(parents);
    setChildCommentsMap(childrenMap);
  }, [comments]);

  const renderComments = (comments, layer = 0) => {
    return  comments.map(comment => (
      <div key={comment.id} style={{ marginLeft: layer * 20 }}>
        <p>{layer > 0 ? 'ㄴ ' : ''} 작성자: {comment.nickName} 댓글내용: {comment.commentContent} 작성일자: {comment.createdAt}</p>
        {childCommentsMap[comment.id] && renderComments(childCommentsMap[comment.id], layer + 1)}
      </div>
    ));
  };

  return (
    <div className='no-scroll'>
    <div className = 'contents-section-store'>
      <div className= 'navtab-contents-page-comment'>
        <div className= 'store-home-comment'>
        <div className="store-home-back-img" style={{ backgroundImage: `url(${backImage})` }} onClick={handleBackClick}></div>
            <span className = "store-home-name">{storeName}</span>
        </div>
        <div className='review-comments-div'></div>
        <div className='container-space-thin'></div>
        <div className = 'comment-input-div'>
              <form className = 'comment-input-form'>
                <input
                  className='comment-text-input'
                  type="text"
                  value={writeComment}
                  onChange={handleWriteComment}
                  placeholder="댓글을 입력하세요"
                />
              <button onClick={requestWriteComment} type="submit" className='comment-submit-button'>등록</button>
          </form>
        </div>
      </div>
    </div>
    </div>

    );
};

export default Comment;
