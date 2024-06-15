  import React, { useState, useEffect } from 'react';
  import {useParams,Link} from "react-router-dom";
  import axios from 'axios';
  import { URL_VARIABLE } from "./export/ExportUrl"; 
  import './css/style.css';
  import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css';
  import { TextField, Dialog, DialogTitle, DialogContent } from '@mui/material';
  import StoreMenu from './export/StoreMenu';
  import Tab from './export/Tab'

  const ReservationTimes = ({reservationInfo}) => {
    return(<button> 시간: {reservationInfo.timeInfo} </button>)
  }
  
  const ReservationDateSelect = ({storeId}) => {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [date, setDate] = useState(new Date());
    const [reservationInfo,setReservationInfo] = useState([]);


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleDateChange = (selectedDate) => {
      setSelectedDate(selectedDate);
      setOpen(false);
    };

    useEffect (() =>{
      const fetchTodayReservation = async() =>{
        try {
          const year = date.getFullYear();
          const month = date.getMonth() + 1; 
          const day = date.getDate();
  
          const response = await axios.get(URL_VARIABLE + `reservations/${year}/${month}/${day}/` + storeId);
  
          setReservationInfo(response.data);
          console.log(response);
        } 
        catch (error) {
          console.error('API 호출 에러:', error);
        }
      }
  
      if(reservationInfo.length === 0){
        fetchTodayReservation();
      }
  
    },[]);
  

    useEffect (() =>{
    const fetchReservation = async() =>{
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1; 
        const day = selectedDate.getDate();

        const response = await axios.get(URL_VARIABLE + `reservations/${year}/${month}/${day}/` + storeId);

        setReservationInfo(response.data);
        console.log(response);
      } 
      catch (error) {
        console.error('API 호출 에러:', error);
      }
    }
    fetchReservation();
  },[selectedDate]);
  
    
    return (
      <div className='reservation-select'>
        <TextField
          label="예약 날짜 선택"
          value={selectedDate ? selectedDate.getMonth()+1 + '월' + selectedDate.getDate() + '일' : date.getMonth()+1 + '월' + date.getDate() + '일'}
          onClick={handleClickOpen}
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        />
  
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>날짜 선택</DialogTitle>
          <DialogContent>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
            />
          </DialogContent>
        </Dialog>

        <div className='reservation-select-time'>
              {
                reservationInfo && reservationInfo.length !== 0 ? (
                  reservationInfo
                    .slice()
                    .sort((a, b) => {
                      const [hoursA, minutesA] = a.timeInfo.split(':').map(Number);
                      const [hoursB, minutesB] = b.timeInfo.split(':').map(Number);
                      return hoursA - hoursB || minutesA - minutesB;
                    })
                    .map(reservation => (
                      <ReservationTimes key={reservation.id} reservationInfo={reservation} />
                    ))
                ) : (
                  <p>예약이 가능하지 않습니다</p>
                )
              }
        </div>
      
      </div>
      
    );
    
  }

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



  const Store = () =>{
      const { id } = useParams(); 
      const [storeContents,setStoreContents] = useState();
      const [reviews, setReviews] = useState([]);
      const [currentImageIndex, setCurrentImageIndex] = useState(0);
      const [activeTab, setActiveTab] = useState('home');
      const [todayReservation,setTodayReservation] = useState([]);
      const [storeMenuList,setStoreMenuList] = useState([]);
      const limitedStoreMenuList = storeMenuList.slice(0, 5);

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
                  setStoreMenuList(response.data.storeMenuDtoList);
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
    if (tabName !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 화면을 최상단으로 스크롤
  }
  };


      return (
    
          <div class="contents-section-store">
            {activeTab === 'home' && (
              <div className='home-tap'>
              <div>
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
              <div className='container-space'></div>

            <div className='navtab-container'>
            <Tab label="홈" onClick={() => handleTabClick('home')} active={activeTab === 'home'} />
            <Tab label="예약" onClick={() => handleTabClick('reservation')} active={activeTab === 'reservation'} />
            <Tab label="사진" onClick={() => handleTabClick('pictures')} active={activeTab === 'pictures'} />
            <Tab label="리뷰" onClick={() => handleTabClick('review')} active={activeTab === 'review'} count={reviews.length} /> 
            </div>

            <div className='navtab-contents'>
              {activeTab === 'home' && (
                <div className='navtab-contents-home'>
                    <p className='navtab-contents-title'>공지</p>
                    <p>공지칸입니다</p>
                </div>
              )
              }
              {activeTab === 'reservation' && (
                <div className='navtab-contents-reservation'>
                    <p className='navtab-contents-title'>예약</p>
                    <ReservationDateSelect storeId={id} />
                    <Link to = {`/reservations/${id}`}><button className='reservation-button'>예약</button></Link > 
                </div>
              )
              }
              {activeTab === 'menu' && (
                <div className='navtab-contents-menu'>
                    <p className='navtab-contents-title'>메뉴</p>
                  
                </div>
              )
              }
            </div>
            <div className='container-space'></div>
            <div className='menu'>
            <p className='menu-title'>메뉴</p>
            <div className='div-space-long'></div>
                    {limitedStoreMenuList.map(storeMenu => (
                    <StoreMenu storeMenu={storeMenu} isTab={false} />
                        ))
                    }
                <button className = 'menu-open-button'>메뉴 전체보기</button>
            </div>
          <div className='container-space'></div>
            <div>
            <div className='review'>
            <p className='review-title'>리뷰</p>
            <div className='review-contents'>
                {reviews.length > 0 ? reviews.map(review => <Reviews key={review.id} reviewData={review} />) : (<p>리뷰가 없습니다</p>)}
                </div>
            </div>
          </div>
     
        </div>
            )}
            {activeTab === 'reservation' && (
              <div className= 'navtab-contents-page'>
                <div className='navtab-container-page'>
                  <Tab label="홈" onClick={() => handleTabClick('home')} active={activeTab === 'home'} />
                  <Tab label="예약" onClick={() => handleTabClick('reservation')} active={activeTab === 'reservation'} />
                  <Tab label="사진" onClick={() => handleTabClick('pictures')} active={activeTab === 'pictures'} />
                  <Tab label="리뷰" onClick={() => handleTabClick('review')} active={activeTab === 'review'} count={reviews.length} /> 
                </div>
                <div className='navtab-contents-reservation'>
                  <p className='navtab-contents-title'>예약</p>
                  <ReservationDateSelect storeId={id} />
                  <Link to = {`/reservations/${id}`}><button className='reservation-button'>예약</button></Link > 
              </div>
            </div>
            )}
            {activeTab === 'pictures' && (
              <div className= 'navtab-contents-page'>
                <div className='navtab-container-page'>
                  <Tab label="홈" onClick={() => handleTabClick('home')} active={activeTab === 'home'} />
                  <Tab label="예약" onClick={() => handleTabClick('reservation')} active={activeTab === 'reservation'} />
                  <Tab label="사진" onClick={() => handleTabClick('pictures')} active={activeTab === 'pictures'} />
                  <Tab label="리뷰" onClick={() => handleTabClick('review')} active={activeTab === 'review'} count={reviews.length} /> 
                </div>
            </div>
            )}
            {activeTab === 'review' && (
              <div className= 'navtab-contents-page'>
                <div className='navtab-container-page'>
                  <Tab label="홈" onClick={() => handleTabClick('home')} active={activeTab === 'home'} />
                  <Tab label="예약" onClick={() => handleTabClick('reservation')} active={activeTab === 'reservation'} />
                  <Tab label="사진" onClick={() => handleTabClick('pictures')} active={activeTab === 'pictures'} />
                  <Tab label="리뷰" onClick={() => handleTabClick('review')} active={activeTab === 'review'} count={reviews.length} /> 
                </div>
            </div>
            )}



          </div>
          
        );

  }

  export default Store;