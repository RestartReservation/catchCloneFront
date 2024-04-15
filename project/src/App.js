import React from "react";
import {Routes,Route,Link} from "react-router-dom";
import Review from "./pages/Review";
import Home from "./pages/Home";
import Signup from "./pages/Singup";
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/css/style.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Store from "./pages/Store";

function App() {
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
          <Link to="/signup" style={{ textDecoration: 'none', fontFamily: 'Arial, sans-serif' , color: 'white' }}>회원가입</Link></Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
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
    <Route path="/review/:id" element={<Review />} />
    <Route path="/store/:id" element={<Store />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>

  </div>

  
  );
}

export default App;
