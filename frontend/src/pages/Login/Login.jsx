import React, { useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';
import { FoodContext } from '../../context/FoodContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login')

  const { setToken } = useContext(FoodContext)

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async(event)=>{
    event.preventDefault();

    try {
      if(currentState === 'Sign Up') {

        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})

        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          toast.success(response.data.message)
          navigate('/')
        } else {
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(backendUrl + '/api/user/login', {email, password})

        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          toast.success(response.data.message)
          navigate('/')
        } else {
          toast.error(response.data.message)
        }

      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='auth-form'>
        <div className='form-header'>
          <p className='form-title'>{currentState} </p>
        </div>

        {
          currentState === 'Login' ? null : (
             <>
              <input type="text" onChange={(e) => setName(e.target.value)} value={name} className='form-input' placeholder='Full Name' required/>
            </>
          )
        }

        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='form-input' placeholder='Email' required/>

        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='form-input' placeholder='Password' required/>

        <div className="form-footer">
          <p className='fgt-password'>Forgot Password ?</p>
          {
            currentState === 'Login' ? (
              <p className='toggle-auth-state' onClick={()=> setCurrentState('Sign Up')}>Create Account</p>
            ) : (
              <p className='toggle-auth-state' onClick={()=> setCurrentState('Login')}>Login Here</p>
            )
          }
        </div> 

        <button type="submit" className='form-button'>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login;