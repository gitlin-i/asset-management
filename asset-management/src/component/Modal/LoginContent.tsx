import React, { useState } from 'react'
import Button from '../Button'
import axios from 'axios'
import { DevApi } from '../../api'

const LoginContent = () => {
  const [formData, setFormData] = useState({
    id : '',
    password: '',
  })
  const cookieString = document.cookie
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response= await DevApi.post('/user/login',formData)
      // const response = await axios.post('/user/login', formData);

    } catch (error) {
      console.error('Login failed:', error);

    }
  };
  return (
    <React.Fragment>
      <form action='http://localhost:8000/user/login' method='post' encType='application/json'>
        <label htmlFor='userId'>ID</label>
        <input type='text' id="userId" name='id'required onChange={handleInputChange}/>

        <label htmlFor='userPassword'>password</label>
        <input type='password' id="userPassword" name='password' required onChange={handleInputChange}/>
        <div>
          <p>{formData.id + ": " + formData.password}</p>
        </div>
        
        <Button $primary type='submit' onClick={handleSubmit}> 제출 </Button>
      </form>
      <p> {cookieString}</p>
    </React.Fragment>
  )
}

export default LoginContent