import React, { useState, useEffect } from 'react';
import {Routes,Route,useParams,Link} from "react-router-dom";
import axios from 'axios';
import { URL_VARIABLE } from "./ExportUrl"; 
import Review from "./Review";

const Reviews = ({ reviewData }) => {

  return (
      <tr>
          <td><Link to={`/review/${reviewData.id}`}>{reviewData.id}</Link></td>
          <td>{reviewData.nickName}</td>
          <td>{reviewData.createdAt}</td>
          <td>{reviewData.likeCount}</td>
      </tr>
  );
}

const Store = () =>{
    const { id } = useParams(); 
    const [storeContents,setStoreContents] = useState();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
    const fetchReviews = async () => {
        try {
            const response = await axios.get(URL_VARIABLE + "reviews/store/" + id);
            console.log(response);
            setReviews(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchReviews();
}, []); 

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const response = await axios.get(URL_VARIABLE + "stores/" + id);
                setStoreContents(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStore();
    },[id])

    return (
        <div>
          {storeContents && (
            <div>
              <p>가게 이름: {storeContents.storeName}</p>
              <p>평점: {storeContents.starRate}</p>
              <p>가게 소개: {storeContents.aboutStore}</p>
            </div>
          )}
          <div>
            <p>리뷰</p>

          {reviews.length > 0 ? reviews.map(review => <Reviews key={review.id} reviewData={review} />) : (<p>리뷰가 없습니다</p>)}
          </div>
        <Routes>
          <Route path="/review/:id" element={<Review />} />
        </Routes>
        </div>
        
      );

}

export default Store;