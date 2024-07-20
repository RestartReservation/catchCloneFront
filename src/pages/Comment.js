
import React, { useState, useEffect } from 'react';
import './css/Comment.css';
import { useParams } from 'react-router-dom';

const Comment = () => {
  const [comments,setComments] = useState([]);
  const [parentComments, setParentComments] = useState([]);
  const [childCommentsMap, setChildCommentsMap] = useState({});
  const { storeName, reviewId} = useParams();
  const backImage = '/back.png';

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
    <div>

    </div>
    );
};

export default Comment;
