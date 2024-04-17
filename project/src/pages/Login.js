import React, { useState } from 'react';
import {Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

import { URL_VARIABLE } from "./ExportUrl"; 



const Login = ({ onClose }) => {

  const [showModal, setShowModal] = useState(true);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
 
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const requestLogin = async () => { 
    console.log(userData)
    try {
      const response = await axios.post( URL_VARIABLE + 'users/login', userData);
      console.log(response.data);
      if(response.headers == null){
        alert("아이디와 비밀번호를 다시 확인 해 주세요")
      }else{
        const token = response.headers['authorization'];
        localStorage.setItem('jwtToken', token);
        window.location.href = '/'; 
      }
    }
     catch (error) {
      console.error(error.response.data);
      
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={onClose}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>로그인</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>회원ID</Form.Label>
        <Form.Control 
          type="text"   
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          placeholder="아이디를 입력해 주세요" />
        <Form.Text className="text-muted">
         setUp
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
        placeholder="Password" />
        <Form.Text className="text-muted">
         setUp
        </Form.Text>
      </Form.Group>
      </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={requestLogin}>
            로그인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;