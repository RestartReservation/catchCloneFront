import React, { useState,useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { URL_VARIABLE } from "./ExportUrl"; 

const WriteReview = () => {
  const [ratings, setRatings] = useState({ 맛: 0, 분위기: 0, 서비스: 0 });
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const { id1,id2 } = useParams(); 
  const [requestReviewInfo,setRequestReviewInfo] = useState({
      reservationId : id2,
      reviewContent : '',
      reviewTitle : '',
      tasteRating : 0,
      atmosphereRating : 0,
      serviceRating : 0
    });

  const handleRatingChange = (category, value) => {
    setRatings({ ...ratings, [category]: value });
  };

  const handleTitleChange = (e) => {
      setReviewTitle(e.target.value);
    };
  
    const handleContentChange = (e) => {
      setReviewContent(e.target.value);
    };

    const submitReview = async () => {
      if (!reviewTitle.trim()) { 
        alert("제목을 입력해 주세요");
        return;
      } else if (!reviewContent.trim()) { 
        alert("리뷰 내용을 입력해 주세요");
        return;
      } else if (ratings.맛 === 0 || ratings.분위기 === 0 || ratings.서비스 === 0) {
        alert("별점은 최소 1점 이상이어야 합니다");
        return;
      }
  
      const requestData = {
        reservationId: id2,
        reviewContent: reviewContent,
        reviewTitle: reviewTitle,
        tasteRating: ratings.맛,
        atmosphereRating: ratings.분위기,
        serviceRating: ratings.서비스
      };
    
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await axios.post(
          URL_VARIABLE + `reviews/${id1}`,
          requestData,
          {
            headers: {
              Authorization: `${jwtToken}`
            }
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error('API 호출 에러:', error);
        // 에러 처리
      }
    };
  
  
  // useEffect(() => {
  //   console.log(requestReviewInfo);
  //   if(requestReviewInfo.id != null){
     
  //   }
  // }, [requestReviewInfo]);
  
  return (
    <div className="container">
     <br />
      <input
        className="form-control"
        type="text"
        placeholder="제목을 입력하세요"
        value={reviewTitle}
        onChange={handleTitleChange}
      />
      <br />
      <textarea
        className="form-control"
        rows="15"
        placeholder="여기에 내용을 입력하세요"
        style={{ resize: "none" }}
        value={reviewContent}
        onChange={handleContentChange}
      ></textarea>

      {/* 별점 선택 */}
      <div className="mt-3">
        {Object.entries(ratings).map(([category, value]) => (
          <div key={category} className="mb-2">
            <label>{category}:</label>{" "}
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`mx-1 cursor-pointer ${
                  star <= value ? "text-warning" : "text-gray-400"
                }`}
                onClick={() => handleRatingChange(category, star)}
              >
                ★
              </span>
            ))}
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={submitReview}>
        리뷰 작성
      </button>
    </div>
  );
};

export default WriteReview;