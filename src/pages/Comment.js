import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { URL_VARIABLE } from "./export/ExportUrl";
import './css/Comment.css';
import RenderComment from './export/RenderComment';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [parentComments, setParentComments] = useState([]);
  const [childCommentsMap, setChildCommentsMap] = useState({});
  const { storeName, reviewId } = useParams();
  const backImage = '/back.png';
  const navigate = useNavigate();
  const [writeComment, setWriteComment] = useState('');


  useEffect(() => {
    fetchComments();
  }, []);



  const fetchComments = async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    try {
      const response = await axios.get(`${URL_VARIABLE}comments/reviews/${reviewId}`, {
        headers: {
          Authorization: `${jwtToken}`
        }
      });
      setComments(Array.isArray(response.data) ? response.data : []); // 응답이 배열인지 확인 후 설정
    } catch (error) {
      console.error(error);
      setComments([]); // 오류 발생 시 빈 배열로 설정
    }
  };

  const requestWriteComment = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken === null) {
        alert("로그인 해 주세요");
        return;
      }
      const requestData = {
        commentContents: writeComment,
        isChild: false, // 임시
        parentId: null, // 임시
      };
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

  const handleRequestComment = (event) => {
    event.preventDefault();
  };

  const handleBackClick = () => {
    localStorage.setItem('reviewCheck', true);
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

  // const RenderComments = (comments, layer = 0) => {

  //   const handleLikeClick = async (commentId) => {
  //     const jwtToken = localStorage.getItem('jwtToken');
  //     if (jwtToken === null) {
  //         alert("로그인 해 주세요");
  //         return;
  //     } else {
  //         try {
  //             await axios.post(URL_VARIABLE + `likes/comments/` + commentId, {}, {
  //                 headers: { Authorization: `${jwtToken}` }
  //             });
  //         } catch (error) {
  //             console.error('API 호출 에러:', error);
  //         }
  //     }
  // }

  //   const userProfileUrl = (profileUrl) => {
  //     return profileUrl ? profileUrl : '/sign-icon.jpg';
  //   }

  //   if (!Array.isArray(comments)) {
  //     return null; // comments가 배열이 아니면 null 반환
  //   }
  //   const formatDate = (dateString) => {
  //     const date = new Date(dateString);
  //     return date.toISOString().split('T')[0]; // 'T'를 기준으로 날짜 부분만 추출
  //   };

  //       return comments.map(comment => (
  //   <div className='comment'>
  //     <div className='comment-user-info'>
  //           <div className="comment-user-profile-image" style={{ backgroundImage: `url(${userProfileUrl(comment.profileUrl)})` }}></div>
  //           <p className='comment-user-nickname'>{comment.nickName}</p>
  //           <span className="comment-created-date">{formatDate(comment.createdAt)}</span>
  //     </div>
  //     <div className='comment-contents-section'>
  //       <div className='comment-contents'>{comment.commentContent}</div>
  //         <div className='comment-contents-interaction'>
  //            <img className= {`comment-like-image${comment.isLiked ? '-full' : ''}`}  src={comment.isLiked ? heartIconFull : heartIconEmpty} alt='Like Icon' onClick={handleLikeClick(comment.likeCount)}/> <p className= "comment-like-count" >{comment.likeCount}</p>
  //            </div>

  //     </div>
  //         <div className='container-space-thin'></div>
  //   </div>
  //   ));

    // return comments.map(comment => (
    //   <div key={comment.id} style={{ marginLeft: layer * 20 }}>
    //     <p>{layer > 0 ? 'ㄴ ' : ''} 작성자: {comment.nickName} 댓글내용: {comment.commentContent} 작성일자: {formatDate(comment.createdAt)}</p>
    //     {childCommentsMap[comment.id] && RenderComments(childCommentsMap[comment.id], layer + 1)}
    //   </div>
    // ));
  // };

  return (
    <div className='no-scroll'>
      <div className='contents-section-store'>
        <div className='navtab-contents-page-comment'>
          <div className='store-home-comment'>
            <div className="store-home-back-img" style={{ backgroundImage: `url(${backImage})` }} onClick={handleBackClick}></div>
            <span className="store-home-name">{storeName}</span>
          </div>
          <div className='review-comments-div'>
          {comments.length > 0 ? comments.map(comment => <RenderComment key={comment.id} commentData={comment}/> ): (<div className='no-comments'>댓글이 없습니다</div>)}
          </div>
          <div className='comment-input-div-fixed'> 
            <div className='container-space-thin'></div>
            <div className='comment-input-div'>
              <form className='comment-input-form'>
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
    </div>
  );
};
export default Comment;
