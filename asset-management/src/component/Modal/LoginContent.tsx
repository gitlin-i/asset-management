import React, { useState } from 'react'
import Button from '../Button'
import { DevApi } from '../../api'
import Input from '../Input'
import styled from 'styled-components'
import { Link  } from 'react-router-dom'
import { modalState } from '../../atom/atom'
import { useRecoilState } from 'recoil'


const StyledForm = styled.form`
  display:flex;
  width:80%;
  flex-direction:column;

  gap:2rem;
`
const RestyledInput = styled(Input)`
  background-color:white;
  color: black;
`
const RestyledLink = styled(Link)`
  width:100%;
  background-color: ${props => props.theme.color.secondary };
  color: white;
  display:flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  padding: 1rem;
  text-decoration: none;
  &:hover {
    color: white;
    box-shadow: 0px 6px 10px #e3e1e1;
  }
`
const LoginContent = () => {
  const [formData, setFormData] = useState({
    id : '',
    password: '',
  })
  const [modal, setModal] = useRecoilState(modalState)
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
      console.log(response)
      if(response.status === 200) {
        setModal((prev) => {
          return {
            ...prev,
            isModalOpen: false
          }
        })
      }

    } catch (error) {
      alert('Login failed');

    }
  };

  return (
    <React.Fragment>
      <StyledForm action='http://localhost:8000/user/login' method='post' encType='application/json'>
        
        <RestyledInput type='text' id='userId' name='id' onChange={handleInputChange} defaultText='ID' />
        <RestyledInput type='password' id='userPassword' name='password' onChange={handleInputChange} defaultText='PASSWORD'/>

        
        <Button $primary type='submit' onClick={handleSubmit}> 로그인 </Button>
        <RestyledLink to={'/join'}> 회원 가입 </RestyledLink>

      </StyledForm>
    </React.Fragment>
  )
}

export default LoginContent