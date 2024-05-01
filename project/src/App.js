import React, { useState } from "react";
import {Routes,Route,Link} from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/css/style.css';

import { URL_VARIABLE } from "./pages/ExportUrl"; 
import Review from "./pages/Review";
import Home from "./pages/Home";
import Signup from "./pages/Singup";
import Container from 'react-bootstrap/Container';
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

  const [userName, setUserName] = useState();

  const[isLogin, setIsLogin] = useState(false);

  // const checkUserData = async () =>{
  //   const jwtToken = localStorage.getItem('jwtToken');
  //   if(jwtToken === null || jwtToken === undefined || isLogin) return;
  //   try {
  //     const response = await axios.get( URL_VARIABLE + 'users/signUp', jwtToken);
  //     response.statusCode !== 201 ? alert("다시 로그인 해 주세요") : setUserName(response.userName);
  //     setIsLogin(true);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error.response.data);
  //     alert("로그인 정보를 가져오는 중 에러가 발생했습니다");
  //   }
  // }

  // checkUserData();

  const openLoginModal = () => {
    console.log("show")
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  
  return(
  <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">MainPage</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link >
            <Link to="/" style={{ textDecoration: 'none', fontFamily: 'Arial, sans-serif' , color: 'white' }}>Home</Link>
          </Nav.Link>
          <Nav.Link> 
          <Link to="/signup" style={{ textDecoration: 'none', fontFamily: 'Arial, sans-serif' , color: 'white' }}>회원가입</Link>
          </Nav.Link>

          <Nav.Link>
            <button onClick={openLoginModal} style={{ cursor: 'pointer', textDecoration: 'none', fontFamily: 'Arial, sans-serif', color: 'white' }} > 로그인 </button>
            </Nav.Link>

            <Nav.Link> 
          <Link to="/reservationList" style={{ textDecoration: 'none', fontFamily: 'Arial, sans-serif' , color: 'white' }}>예약목록</Link>
          </Nav.Link>

          <Nav.Link> 
          <Link to="/writeReview/:id1/:id2"  style={{ textDecoration: 'none', fontFamily: 'Arial, sans-serif' , color: 'white' }}>리뷰작성</Link>
          </Nav.Link>

{/* 
            <Nav.Link> 
          <Link to="/reservations" style={{ textDecoration: 'none', fontFamily: 'Arial, sans-serif' , color: 'white' }}>예약</Link>
          </Nav.Link> */}

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
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
    {showLoginModal && <Login onClose={closeLoginModal} />}
  </div>

  
  );
}

export default App;