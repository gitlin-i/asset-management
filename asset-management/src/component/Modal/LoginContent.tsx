import React from 'react'
import Button from '../Button'

const LoginContent = () => {
  return (
    <React.Fragment>
      <form action='http://localhost:8000/login' method='get'>
        <label htmlFor='userId'>ID</label>
        <input type='text' id="userId" name='userId'required />

        <label htmlFor='password'>password</label>
        <input type='text' id="password" name='password' required />
        
        <Button $primary type='submit'> 제출 </Button>
      </form>

    </React.Fragment>
  )
}

export default LoginContent