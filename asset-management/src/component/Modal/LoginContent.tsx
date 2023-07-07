import React, { useState } from 'react'
import Button from '../Button'
import axios from 'axios'

const LoginContent = () => {
  const [formData, setFormData] = useState({
    userId : '',
    password: '',
  })

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
      const response = await axios.post('/api/login', formData);
      console.log('Server response:', response.data);

    } catch (error) {
      console.error('Login failed:', error);

    }
  };
  return (
    <React.Fragment>
      <form action='http://localhost:8000/login' method='post' onSubmit={handleSubmit}>
        <label htmlFor='userId'>ID</label>
        <input type='text' id="userId" name='userId'required onChange={handleInputChange}/>

        <label htmlFor='password'>password</label>
        <input type='text' id="password" name='password' required onChange={handleInputChange}/>
        <div>
          <text>{formData.userId + ": " + formData.password}</text>
        </div>
        
        <Button $primary type='submit'> 제출 </Button>
      </form>

    </React.Fragment>
  )
}

export default LoginContent