import React, { useState } from 'react'
import './Add.css'
import upload_img from '../../assets/upload_img.jpg'
import axios from 'axios'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Chicken Biryani")   // ✅ FIXED

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      if (image) formData.append("image", image)

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setPrice("")
        setImage(null)
        setCategory("Chicken Biryani")     // ✅ FIXED
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='form-container'>

      <div>
        <p className="form-label">Upload Image</p>
        <div className="image_upload_container">
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : upload_img} alt="upload" />
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Product Name" required />
      <textarea value={description} onChange={(e)=>setDescription(e.target.value)} required />
      <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} />

      <select value={category} onChange={(e)=>setCategory(e.target.value)}>
        <option value="Chicken Biryani">Chicken Biryani</option>
        <option value="Butter Chicken">Butter Chicken</option>
        <option value="Dosa">Dosa</option>
        <option value="Idli">Idli</option>
        <option value="Samosa">Samosa</option>
        <option value="Paneer Tikka">Paneer Tikka</option>
        <option value="Gulab Jamun">Gulab Jamun</option>
        <option value="Rasgulla">Rasgulla</option>
      </select>

      <button type="submit">Add product</button>
    </form>
  )
}

export default Add
