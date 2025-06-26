import React, { useState,useEffect } from 'react';
import './Add.css';
import { assets } from '../../../assets/assets';
import axios from 'axios'

const Add = () => {
    const url="http://localhost:4000"
    const [image,setImage]=useState(false);
    const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

   try {
    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      alert("Product added successfully!");

      // Reset form fields
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      });
      setImage(false); // or `null` if you're using null initially
    } else {
      alert("Failed to add product.");
    }
  } catch (err) {
    console.error("Error uploading product:", err);
    alert("Something went wrong. Please try again.");
  }
  }

useEffect(() => {
  console.log("Updated data:", data);
}, [data]);

  return (
    <div className='add'>
      <form className='flex-col'>
        {/* Upload Image */}
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt='' />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>

        {/* Product Name */}
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input type='text' name='name' value={data.name} 
            onChange={handleChange} placeholder='Type here' />
        </div>

        {/* Product Description */}
        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea
            name='description'
            rows='6'
            placeholder='Write content here...' value={data.description} 
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Product Category */}
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product category</p>
            <select value={data.category} 
              onChange={handleChange} name='category'>
              <option value=''>Select a category</option>
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
               <option value='Pure Veg'>Pure Veg</option>
                <option value='Pasta'>Pasta</option>
                 <option value='Noodles'>Noodles</option>
            </select>
          </div>

          {/* Product Price */}
          <div className='add-price flex-col'>
            <p>Product price</p>
            <input  value={data.price} 
              onChange={handleChange}  type='number' name='price' placeholder='$20' />
          </div>
        </div>

        {/* Submit Button */}
        <button type='submit' className='add-btn' onClick={onSubmitHandler}>ADD</button>
      </form>
    </div>
  );
};

export default Add;
