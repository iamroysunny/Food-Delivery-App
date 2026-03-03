import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = ({ setToken }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const OnSubmitHandler = async (e) => {
    e.preventDefault()

    if (loading) return   // 🔒 prevent multiple click

    setLoading(true)

    try {
      const response = await axios.post(
        backendUrl + '/api/user/admin',
        { email, password }
      )

      if (response.data.success) {

        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)

        toast.success('Login successful')

        navigate('/orders')   // ✅ redirect after login

      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    }

    setLoading(false)
  }

  return (
    <div className='admin-panel-container'>
      <div className="admin-panel-box">

        <h1 className='login-title'>Admin Panel</h1>

        <form onSubmit={OnSubmitHandler}>

          <div className="form-group">
            <p className="form-lebel">Email Address</p>
            <input
              type="email"
              className='form-input'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <p className="form-lebel">Password</p>
            <input
              type="password"
              className='form-input'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            className="form-button" 
            type='submit'
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login