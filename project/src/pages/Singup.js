import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { URL_VARIABLE } from "./ExportUrl"; 

const Signup = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        nickName:'',
        phoneNumber:''
      });

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
          ...userData,
          [name]: value
        });
      };

    const handleSignup = async () => { 
    console.log(userData)
    try {
      const response = await axios.post( URL_VARIABLE + 'users/signUp', userData);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  return (
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

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>닉네임</Form.Label>
        <Form.Control 
        type="text" 
        name="nickname"
        value={userData.nickName}
        onChange={handleInputChange}
        placeholder="닉네임을 입력해 주세요" />
        <Form.Text className="text-muted">
        setUp
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>전화번호</Form.Label>
        <Form.Control 
        type="number"
        name="phoneNumber"
        value={userData.phoneNumber}
        onChange={handleInputChange}
        placeholder="전화번호를 입력해 주세요" />
        <Form.Text className="text-muted">
        setUp
        </Form.Text>
      </Form.Group>

     

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" onClick={handleSignup}>
        Submit
      </Button>
    </Form>
  );
}

export default Signup;