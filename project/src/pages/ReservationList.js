import React ,{useState,useEffect} from "react"
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import { URL_VARIABLE } from "./ExportUrl"; 

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
  
  
    return (
      <div>
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

    

    const fetchReservations = async () => {
        const jwtToken = localStorage.getItem('jwtToken'); 
        if(jwtToken == null) alert('로그인 해 주세요');

        try {
            const response = await axios.get(URL_VARIABLE + "reservations/users", {
                headers: {
                  Authorization: `${jwtToken}`
                }
              });
            console.log(response);
            setReservations(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // 컴포넌트가 마운트될 때(fetchReservations를 호출)
    useEffect(() => {
        fetchReservations();
    }, []);

    useEffect(() => {
    }, [reservations]);

    
    return(
        <div>
        {reservations.map(reservations => (
            <UserReservations key={reservations.reservationId} userReservationData={reservations} />
        ))}
    </div>
    );

}
export default ReservationList; 