import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/css/style.css';
import signIcon from './img/sign-icon.jpg'; 

import { URL_VARIABLE } from "./pages/ExportUrl"; 
import Review from "./pages/Review";
import Home from "./pages/Home";
import Signup from "./pages/Singup";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Store from "./pages/Store";
import Login from "./pages/Login";
import Reservation from "./pages/Reservation";
import ReservationList from "./pages/ReservationList";
import WriteReview from "./pages/WriteReview";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = localStorage.getItem('jwtToken');
    
      if (jwtToken) {
        try {
          const response = await axios.get(URL_VARIABLE + 'users/profile', {
            headers: {
              Authorization: `${jwtToken}`
            }
          });

  
          if(response.data.nickName === null){
            alert("다시 로그인 해 주세요");
            localStorage.removeItem('jwtToken');
            setIsLoggedIn(false);
            setIsProfileLoading(true); 
            return;
          }
  
          setUserProfile(response.data);
          setIsLoggedIn(true);
          setIsProfileLoading(false);
        } catch (error) {
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
          setIsProfileLoading(true); 
        }
      } else {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        setIsProfileLoading(true); 
      }
    };
  
    fetchData();
  }, [isLoggedIn]);

  const logout = () => {
    localStorage.removeItem('jwtToken');
    alert('로그아웃 되었습니다.');
    setIsLoggedIn(false);
  }

  const openLoginModal = () => {
    console.log("show")
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false); 
  };



  return (
    <div className="App">
      <Navbar expand="lg" className="navbar-custom">
        <Navbar.Brand><Link to="/" className = "title">Home</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className = "space"></div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className = "navContents"> 
            <div className="d-flex align-items-center">
            {!isLoggedIn && (
              <Nav.Link>
                <Link to="/signup">회원가입</Link>
              </Nav.Link>
            )}
            </div>
            {!isLoggedIn && (
              <Nav.Link>
                  {/* <img src={signIcon} alt="sign" className = "signIcon"/> */}
                <span onClick={openLoginModal}>로그인</span>
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link>
                <span onClick={logout}>로그아웃</span>
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link>
                <Link to="/reservationList">예약목록</Link>
              </Nav.Link>
            )}
            {isLoggedIn && !isProfileLoading && userProfile && (
              <NavDropdown
                title={<span>{userProfile.nickName} 님</span>}
                id="basic-nav-dropdown"
                className="nav-dropdown-toggle"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            )}
            </div>
       
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/reviews/:id" element={<Review />} />
        <Route path="/stores/:id" element={<Store />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reservations/:id" element={<Reservation />} />
        <Route path="/reservationList" element={<ReservationList />} />
        <Route path="/writeReview/:id1/:id2" element={<WriteReview />} />
      </Routes>
      
      {/* <div className="bottom-contents">
              
      </div> */}
      {showLoginModal && <Login onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess}/>}
    </div>

  
  );
}

export default App;