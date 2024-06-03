import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_VARIABLE } from "./ExportUrl"; 
import { useParams } from 'react-router-dom';

const UserProfile = () =>{

    const [userProfile, setUserProfile] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const jwtToken = localStorage.getItem('jwtToken');
  
    useEffect(() => { if (jwtToken) {
        axios.get(URL_VARIABLE + 'users/profile', {
          headers: {
            Authorization: `${jwtToken}`
          }
        })
        .then(response => {
          console.log(response);
          if(response.data.nickName === null){
            alert("다시 로그인 해 주세요");
            localStorage.removeItem('jwtToken');
            setIsLoggedIn(false);
            return;
          }
          setUserProfile(response.data);
          setIsLoggedIn(true);
        })
        .catch(error => {
          if (error.response) {
            console.error('Error response:', error.response.data);
            if (error.response.status === 401) {
              alert("인증되지 않았습니다. 다시 로그인 해 주세요.");
            } else if (error.response.status === 403) {
              alert("접근 권한이 없습니다.");
            } 
          } else if (error.request) {
            console.error('Error request:', error.request);
            alert("다시 로그인 해 주세요.");
          } else {
            console.error('Error message:', error.message);
            alert("요청을 처리하는 중에 에러가 발생했습니다. 다시 시도해 주세요.");
          }
          localStorage.removeItem('jwtToken');
          setIsLoggedIn(false);
        });
      } else {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
      }
    }, []);

      return(

        <div>{userProfile.nickName}</div>

      );
}
export default UserProfile;