import React ,{useState,useEffect} from "react"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Reservation = () =>{

    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      // API 호출 함수
      const fetchData = async () => {
        try {
          const response = await fetch('YOUR_API_ENDPOINT');
          const data = await response.json();
          setEvents(data); // API 응답으로 받은 데이터를 상태에 설정
        } catch (error) {
          console.error('API 호출 에러:', error);
        }
      };
  
      fetchData(); // 컴포넌트가 마운트될 때 API 호출
    }, []); // 빈 배열을 넘겨서 한 번만 호출되도록 설정
  
    const onChange = (selectedDate) => {
      setDate(selectedDate);
    };
  
    const renderEventsForDate = (date) => {
      // 선택된 날짜에 해당하는 이벤트 필터링
      const filteredEvents = events.filter(event => {
        // 이벤트의 날짜가 선택된 날짜와 일치하는지 확인
        const eventDate = new Date(event.date); // 이벤트 날짜를 JavaScript Date 객체로 변환
        return eventDate.toDateString() === date.toDateString();
      });
  
      return filteredEvents.map(event => (
        <div key={event.id}>
          {event.title}
        </div>
      ));
    };
  
    return (
      <div>
        <h2> </h2>
        <div>
          <Calendar
            onChange={onChange}
            value={date}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                // 월별 뷰에서만 이벤트 표시
                return renderEventsForDate(date);
              }
            }}
          />
        </div>
      </div>
    );
  };

export default Reservation;