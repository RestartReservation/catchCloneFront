import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { URL_VARIABLE } from "./ExportUrl"; 
import {useParams} from "react-router-dom";
import axios from 'axios';



const Reservation = () => {
  const { id } = useParams(); 
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [reservationInfo,setReservationInfo] = useState([]);
  const [requestReservationInfo,setRequestReservationInfo] = useState({
    reservationCount : '',
    reservationDate : '',
    reservationTime : ''
  });
  const [selectedDateId,setSelectedDateId] = useState();
  const [selectedDay,setSelectedDay] = useState();
  const [selectedTime,setSelectedTime] = useState();
  const [selectedCount,setSelectedCount] = useState(1);

  const ReservationInfos = ({ reservationData }) => {
    return (
      <tr>
        <td>
          시간: {reservationData.timeInfo} 예약가능여부: {reservationData.isAvailable} 수용인원: {reservationData.capacity}
        </td>
        <td>
          <button onClick={() => handleSelectReservation(reservationData)}>선택</button>
        </td>
      </tr>
    );
  };

  
  useEffect(() => {
    // 컴포넌트가 마운트되거나 선택된 날짜가 변경될 때 API 호출
    fetchEventsForDate(date);
  }, [date]); // date 상태가 변경될 때마다 useEffect 다시 실행

  const handleSelectReservation = async (reservationData) => {
    setSelectedDateId(reservationData.id);
    setSelectedTime(reservationData.timeInfo);
    if(selectedDay === null) setSelectedDay(date.getDate());
  };
  
  const fetchEventsForDate = async (selectedDate) => {
    setReservationInfo();
    setSelectedDay(selectedDate.getDate());
    try {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해야 함
      const day = selectedDate.getDate();

      const response = await axios.get(URL_VARIABLE + `reservations/${year}/${month}/${day}/` + id);
      console.log(response);

      setReservationInfo(response.data);
      console.log(reservationInfo);
    } 
    catch (error) {
      console.error('API 호출 에러:', error);
    }
  };

  const onChange = (selectedDate) => {
    setDate(selectedDate); // 사용자가 날짜를 선택할 때마다 선택된 날짜를 업데이트
  };

  const handleReservation = async () => { 
    if(localStorage.getItem('jwtToken') == null) {
      alert("로그인 해 주세요");
      return;
    }

    console.log(selectedDateId);

    if (!selectedDateId) {
      alert('예약할 시간을 선택해주세요');
      return;
    }

    setRequestReservationInfo({
      reservationCount : selectedCount,
      reservationDate : selectedDay,
      reservationTime : selectedTime
    });

    console.log(setRequestReservationInfo);
    await sendReservationRequest();
  };
  
  const sendReservationRequest = async () => {
    const jwtToken = localStorage.getItem('jwtToken'); 
  
    try {
      const response = await axios.post(
        URL_VARIABLE + `reservations/users/${id}/` + selectedDateId,
        requestReservationInfo,
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
 
  //   // setRequestReservationInfo(dayInfo,timeInfo);
  //   const jwtToken = localStorage.getItem('jwtToken'); 

  //   try {
  //     const response = await axios.post( URL_VARIABLE + `reservations/users/${id}/` + selectedDateId, requestReservationInfo,{
  //       headers: {
  //         // Authorization: `Bearer ${jwtToken}`
  //         Authorization: `${jwtToken}`
  //       }
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     // console.error(error.response.data);
  //     // localStorage.removeItem('jwtToken');
  //     // alert("다시 로그인 해 주세요");
  //   }
  // };

  return (
    <div>
      <h2>예약</h2>
      <div>
        <Calendar
          onChange={onChange}
          value={date}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
              const hasEvents = events.some(event => event.date === formattedDate);
              return hasEvents ? <span style={{ color: 'red' }}>●</span> : null;
            }
          }}
        />
        
          <tbody>
            
          {reservationInfo && reservationInfo.length !== 0 ? (reservationInfo
              .slice() 
              .sort((a, b) => {
                if (a.timeInfo < b.timeInfo) return -1;
                if (a.timeInfo > b.timeInfo) return 1;
                return 0;
              })
              .map(reservation => (
                <ReservationInfos key={reservation.id} reservationData={reservation} />
              ))
          ) : (
            <p>예약이 가능하지 않습니다</p>
          )}
         <br>
          </br>
          <button onClick={handleReservation}>예약</button>
        </tbody>

      </div>
    </div>
  );
};

export default Reservation;