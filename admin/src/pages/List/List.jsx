import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { backendUrl } from '../../config'
import { toast } from 'react-toastify'
import { MdDeleteForever } from 'react-icons/md'

const List = () => {

  const [list, setList] = useState([])

  // =====================
  // FETCH PRODUCT LIST
  // =====================
  useEffect(() => {

    const fetchList = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          toast.error("No admin token found")
          setList([])
          return
        }

        const response = await axios.get(
          `${backendUrl}/api/product/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (response.data.success && Array.isArray(response.data.products)) {
          setList(response.data.products)
        } else {
          setList([])
          toast.error(response.data.message || "No products found")
        }

      } catch (error) {
        console.error(error)
        setList([])
        toast.error("Unauthorized user")
      }
    }

    fetchList()

  }, [])

  // =====================
  // REMOVE PRODUCT (✅ ONLY LIST.JSX)
  // =====================
  const removeProduct = async (id) => {
    try {
      const token = localStorage.getItem("token")

      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        toast.success("Product removed")
        // 🔥 UI instantly update
        setList(prev => prev.filter(item => item._id !== id))
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error(error)
      toast.error("Unauthorized user")
    }
  }

  return (
    <div>
      <p className="product-title">Product List</p>

      <div className="product-list-container">

        <div className="product-table-title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="action-title">Action</b>
        </div>

        {list.length === 0 ? (
          <p style={{ color: "#fff", padding: "20px" }}>
            No products available
          </p>
        ) : (
          list.map((item) => (
            <div key={item._id} className="product-row">
              <img
                src={item.image}
                alt={item.name}
                className="product-image"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>

              {/* ✅ DELETE ACTION */}
              <MdDeleteForever
                className="product-action"
                onClick={() => removeProduct(item._id)}
              />
            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default List
