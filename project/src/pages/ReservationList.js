import React ,{useState,useEffect} from "react"
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import { URL_VARIABLE } from "./export/ExportUrl"; 
import './css/ReservationList.css';

const Tab = ({ label, onClick, active, count }) => (
  <div
    className={`tab ${active ? 'active' : ''}`} // 클래스명 동적 설정
    onClick={onClick}
  >
    {label}{count !== undefined && <span className="review-count">({count})</span>}
  </div>
);


const UserReservations = ({ userReservationData }) => {
    const {
      reservationId,
      storeId,
      storeName,
      yearInfo,
      monthInfo,
      dayInfo,
      timeInfo,
      reservationStatus,
      reservationDate 
    } = userReservationData;
    
  
  // switch(reservationStatus){

  //   case "V":
  //     userReservationData.filter(userReservationData =>{
  //       userReservationData.reservationStatus=="V"
  //     }

  //     );
  // }
    return (
      <div className="reservation">
        <p>
          {reservationId} 가게명: {storeName} 예약(방문)일: {yearInfo} 년 {monthInfo} 월 {dayInfo} 일 /  {timeInfo} 시 예약상태: {reservationStatus} 예약한 날짜:
          <Link to={`/writeReview/${storeId}/${reservationId}`}>
          <button>리뷰작성</button>
        </Link>
        </p>
       
      </div>
    );
  };
  

const ReservationList = () => {
    const [reservations,setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [activeTab, setActiveTab] = useState('before');
    
    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
    };

    const fetchReservations = async () => {
        const jwtToken = localStorage.getItem('jwtToken'); 
        if(jwtToken == null) alert('로그인 해 주세요');

        try {
            const response = await axios.get(URL_VARIABLE + "reservations/users", {
                headers: {
                  Authorization: `${jwtToken}`
                }
              });
            //console.log(response);
            console.log("123123");
            console.log(response.data);
            setReservations(response.data);
            setFilteredReservations(response.data.filter(reservation => reservation.reservationStatus === 'Y'));
            console.log("filtered");
            console.log(filteredReservations);
            
            
        } catch (error) {
            console.error(error);
        }
    };

    //const filteredReservations = reservations.filter(reservation => reservation.reservationStatus === 'Y');
    // 컴포넌트가 마운트될 때(fetchReservations를 호출)
    useEffect(() => {
        fetchReservations();
    }, []);

    useEffect(() => {
    }, [reservations]);

    useEffect(() => {
      getFilteredReservations();
    }, [activeTab]);

    const getFilteredReservations = () => {
      let filtered ;
      switch (activeTab) {
        
        case 'before':
          filtered = reservations.filter(reservation => reservation.reservationStatus === 'Y');
          break;
        case 'after':
          filtered = reservations.filter(reservation => reservation.reservationStatus === 'V');
          break;
        case 'cancle':
          filtered = reservations.filter(reservation => reservation.reservationStatus === 'N');
          break;
        default:
          filtered = 'error';
          break
      }
      setFilteredReservations(filtered);
    };

    
    

    
    return(
        <div className="contents-section-reservation-list">
          <div className="contents-section-div">
          {/* {reservations.map(reservations => (
            <UserReservations key={reservations.reservationId} userReservationData={reservations} />
        ))} */}
      <div className='navtab-container-reservation-list'>
      <Tab label="방문예정" onClick={() => handleTabClick('before')} active={activeTab === 'before'} />
      <Tab label="방문완료" onClick={() => handleTabClick('after')} active={activeTab === 'after'} />
      <Tab label="취소/노쇼" onClick={() => handleTabClick('cancle')} active={activeTab === 'cancle'} />
      </div>
      <div>
      <ul class="list-group">
        <li class="list-group-item">

        {filteredReservations.map(reservations => (
            <UserReservations key={reservations.reservationId} userReservationData={reservations} />
        ))}

        </li>
       
      </ul>
      </div>
          </div>
    </div>
    );

}
export default ReservationList; 