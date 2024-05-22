import { URL_VARIABLE } from "./ExportUrl"; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comment from "./Comment"; 

const Review = () => {
  const { id } = useParams();
  const [reviewContents, setReviewContents] = useState(null);
  const [comments, setComments] = useState([]);
  const [writeComment, setWriteComment] = useState('');

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`${URL_VARIABLE}reviews/${id}`);
        console.log(response);
        setReviewContents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReview();
  }, [id]);

  const requestWriteComment = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const requestData = {
        commentContents: writeComment,
        isChild: false, // 임시
        parentId: null, // 임시
      };
      console.log(jwtToken);
      const response = await axios.post(
        `${URL_VARIABLE}comments/${id}`,
        requestData,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      );
      console.log(response);
      fetchComments(); // 댓글 작성 후 다시 댓글 목록을 가져옴
      setWriteComment('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleWriteComment = (event) => {
    setWriteComment(event.target.value);
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${URL_VARIABLE}comments/reviews/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <div>
      <table>
        <tbody>
          {reviewContents && (
            <tr>
              <td>
                제목: {reviewContents.reviewTitle} 작성자: {reviewContents.nickName} 작성일자: {reviewContents.createdAt}
                <br />
                <br />
                {reviewContents.reviewContent}
              </td>
            </tr>
          )}
        </tbody>
      </table>
        <br/>
      <Comment comments={comments} />

      <div>
        <br />
        <input
          className="form-control"
          type="text"
          value={writeComment}
          onChange={handleWriteComment}
        />
        <button onClick={requestWriteComment}>댓글작성</button>
      </div>
    </div>
  );
};


export default Review;
