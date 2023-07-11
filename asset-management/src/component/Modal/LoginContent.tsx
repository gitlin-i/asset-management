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
      <form action='http://localhost:8000/login3' method='post'>
        <label htmlFor='userId'>ID</label>
        <input type='text' id="userId" name='userId'required onChange={handleInputChange}/>

        <label htmlFor='userPassword'>password</label>
        <input type='text' id="userPassword" name='userPassword' required onChange={handleInputChange}/>
        <div>
          <p>{formData.userId + ": " + formData.password}</p>
        </div>
        
        <Button $primary type='submit'> 제출 </Button>
      </form>

    </React.Fragment>
  )
}

export default LoginContent