import React, { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from './components/Login/Login'
import { ToastContainer } from 'react-toastify'

export const backendUrl = "http://localhost:5000"
export const currency = "₹"

const App = () => {

  /* ✅ token init from localStorage */
  const [token, setToken] = useState(
    localStorage.getItem('adminToken') || ""
  )

  /* ✅ keep token synced */
  useEffect(() => {
    if (token) {
      localStorage.setItem('adminToken', token)
    } else {
      localStorage.removeItem('adminToken')
    }
  }, [token])

  return (
    <div className='app-container'>
      <ToastContainer />

      {
        !token ? (
          <Login setToken={setToken} />
        ) : (
          <div className="app-content">

            <Sidebar setToken={setToken} />

            <div className="page-content">
              <Routes>
                <Route path="/" element={<Navigate to="/add" />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token}/>} />   {/* ✅ ONLY FIX HERE */}
                <Route path="/orders" element={<Orders token={token}/>} />
              </Routes>
            </div>

          </div>
        )
      }
    </div>
  );
};

export default App
