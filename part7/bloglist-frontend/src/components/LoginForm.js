import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { handleLogin } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  

    const login = async (event) => {
    event.preventDefault()
    dispatch(handleLogin(username, password))
    setPassword('')
    setUsername('')
    }
  

    return (
    <form onSubmit={login}>
      <div>
        username
          <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={ (event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={ (event) => setPassword(event.target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>      
  )}

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }



export default LoginForm