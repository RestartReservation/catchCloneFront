import React ,{useState,useEffect} from "react"
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import { URL_VARIABLE } from "./ExportUrl"; 

const ReservationList = () => {
    const [reservations,setReservations] = useState([]);
    const UserReservations = (userReservationData) =>{
        return(
            <tr>
            <td>{userReservationData.reservationId} 가게명 : {userReservationData.storeName} 예약(방문)일 : {userReservationData.yearInfo} - {userReservationData.dayInfo} - {userReservationData.timeInfo}
            예약상태 : {userReservationData.reservationStatus} 예약한 날짜 : {}<br/> </td> <Link to = {`/writeReview/${userReservationData.reservationId}`}><button>리뷰작성</button></Link > 
        </tr>
        )
    }

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

    // reservations 상태가 변경될 때(fetchReservations를 호출)
    useEffect(() => {
        fetchReservations();
    }, [reservations]);

    
    return(
        <div>
        {reservations.map(reservation => (
            <UserReservations key={reservation.reservationId} userReservationData={reservation} />
        ))}
    </div>
    );

}
export default ReservationList; 