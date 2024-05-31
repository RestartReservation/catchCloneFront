  import React, { useState, useEffect } from 'react';
  import {useParams,Link} from "react-router-dom";
  import axios from 'axios';
  import { URL_VARIABLE } from "./ExportUrl"; 
  import './css/style.css';


  const Reviews = ({ reviewData }) => {

    return (
        <tr>
            <td><Link to={`/reviews/${reviewData.reviewId}`}> 제목 : {reviewData.reviewTitle} </Link></td>
            <td>평점 : {reviewData.totalRating}</td>
            <td>작성일 : {reviewData.createdAt}</td>
            <td>좋아요 : {reviewData.likeCount}</td>
        </tr>
)  }

const StarRating = ({ rating,reviewLength }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
      if (i <= filledStars) {
          stars.push(<span key={i} className="star filled">★</span>);
      } else {
          stars.push(<span key={i} className="star">★</span>);
      }
  }

  return <div className="star-rating">{stars} <p className='review-counting'>{reviewLength}개 리뷰 </p>  </div>;
};

const Tab = ({ label, onClick, active }) => (
  <div
    className={`tab ${active ? 'active' : ''}`} // 클래스명 동적 설정
    onClick={onClick}
  >
    {label}
  </div>
);


  const Store = () =>{
      const { id } = useParams(); 
      const [storeContents,setStoreContents] = useState();
      const [reviews, setReviews] = useState([]);
      const [currentImageIndex, setCurrentImageIndex] = useState(0);
     const [activeTab, setActiveTab] = useState('home');

      useEffect(() => {
      const fetchReviews = async () => {
          try {
              const response = await axios.get(URL_VARIABLE + "reviews/stores/" + id);
              console.log(response);
              setReviews(response.data);
          } catch (error) {
              console.error(error);
          }
      };

      fetchReviews();
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

      // 임시
      const images = [
        'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=507&simg=/content/image/2019/09/27/20190927000594_0.jpg',
        'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201702/27/117f5b49-1d09-4550-8ab7-87c0d82614de.jpg', 
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRJyX-QgEmUkuqutcLsUS8dQXg_eE9mzSoxA&s'   
    ];



  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };



      return (
          <div class="contents-section">
            <div>
            {/* url임시 */}
            <div class="square">
                <img src={images[currentImageIndex]} alt="Store" className="image" />
                <button className="prev" onClick={handlePrevImage}>❮</button>
                <button className="next" onClick={handleNextImage}>❯</button>
                <div className="image-counter">
                    {currentImageIndex + 1} / {images.length}
                </div>
              </div>
            
            </div>
            {storeContents && (
              <div className="store-contents">
                <p className='store-contents-storename'>{storeContents.storeName}</p>
                <StarRating rating={storeContents.starRate} reviewLength={reviews.length} />
                <p>{storeContents.aboutStore}</p>
              
              </div>
              
            )}
          <div className='navtap-container'>
      <Tab label="홈" onClick={() => handleTabClick('home')} active={activeTab === 'home'} />
      <Tab label="예약" onClick={() => handleTabClick('reservation')} active={activeTab === 'reservation'} />
      <Tab label="메뉴" onClick={() => handleTabClick('menu')} active={activeTab === 'menu'} />
      <Tab label="리뷰" onClick={() => handleTabClick('review')} active={activeTab === 'review'} />
         </div>
         <div className='navtap-contents'>
            {activeTab === 'home' && (
              <div className='navtap-contents-home'>
                  <p className='navtap-contents-title'>공지</p>
                  <p>공지칸입니다</p>
              </div>
            )
            }
            {activeTab === 'reservation' && (
              <div className='navtap-contents-reservation'>
                  <p className='navtap-contents-title'>예약</p>
                  <p>예약 라벨 추가</p>
              </div>
            )
            }
         </div>
            <div className='store-contents-review'>
              <p>리뷰</p>
            {reviews.length > 0 ? reviews.map(review => <Reviews key={review.id} reviewData={review} />) : (<p>리뷰가 없습니다</p>)}
            </div>
            <div>
            <Link to = {`/reservations/${id}`}><button>예약</button></Link > 
            </div>

          </div>
          
        );

  }

  export default Store;