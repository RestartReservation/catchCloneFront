import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { URL_VARIABLE } from "./ExportUrl"; 
import {useParams} from "react-router-dom";

const Reservation = () => {
  const { id } = useParams(); 
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [reservationInfo,setReservationInfo] = useState();
  useEffect(() => {
    // 컴포넌트가 마운트되거나 선택된 날짜가 변경될 때 API 호출
    fetchEventsForDate(date);
  }, [date]); // date 상태가 변경될 때마다 useEffect 다시 실행

  const fetchEventsForDate = async (selectedDate) => {
    try {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해야 함
      const day = selectedDate.getDate();

      const response = await axios.get(URL_VARIABLE + `${year}/${month}/${day}/` + id);
      const data = await response.json();
      setReservationInfo(data);
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  };

  const onChange = (selectedDate) => {
    setDate(selectedDate); // 사용자가 날짜를 선택할 때마다 선택된 날짜를 업데이트
  };

  return (
    <div>
      <h2>나의 달력</h2>
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
        {reservationInfo && (
                <tr>
                    <td>시간 : {reservationInfo.timeInfo} 예약가능여부 : {reservationInfo.isAvailable} 수용인원 : {reservationInfo.capacity} </td>
                </tr>
            )}
        </tbody>

      </div>
    </div>
  );
};

export default Reservation;