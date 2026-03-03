import React from 'react'
import './Sidebar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'
import { MdFormatListBulleted, MdAddShoppingCart } from 'react-icons/md'

const Sidebar = ({ setToken }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    setToken("")
    localStorage.removeItem('adminToken')
    navigate('/')
  }

  return (
    <div className='sidebar-container'>
      <div className="sidebar-header">
        <h2>Foodway</h2>
      </div>

      <div className="sidebar-links">

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <IoMdAddCircleOutline className='sidebar-icon' />
          <p className="sidebar-text">Add Product</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <MdFormatListBulleted className='sidebar-icon' />
          <p className="sidebar-text">List Product</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <MdAddShoppingCart className='sidebar-icon' />
          <p className="sidebar-text">Orders</p>
        </NavLink>

        <button onClick={handleLogout} className="sidebar-link logout-btn">
          <IoLogOut className='sidebar-icon' />
          <p className="sidebar-text">Logout</p>
        </button>

      </div>
    </div>
  )
}

export default Sidebar
