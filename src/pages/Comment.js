
import React, { useState, useEffect } from 'react';
import './css/Comment.css';
import { useParams, useNavigate} from 'react-router-dom';

const Comment = () => {
  const [comments,setComments] = useState([]);
  const [parentComments, setParentComments] = useState([]);
  const [childCommentsMap, setChildCommentsMap] = useState({});
  const {storeName, reviewId} = useParams();
  const backImage = '/back.png';
  const navigate = useNavigate();
  const [requestComment, setResquestComment] = useState('');


  const handleChange = (event) => {
    setResquestComment(event.target.value);
  };


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
              <form onSubmit={handleRequestComment} className = 'comment-input-form'>
                <input
                  className='comment-text-input'
                  type="text"
                  value={requestComment}
                  onChange={handleChange}
                  placeholder="댓글을 입력하세요"
                />
              <button type="submit" className='comment-submit-button'>등록</button>
          </form>
        </div>
      </div>
    </div>
    </div>

    );
};

export default Comment;
