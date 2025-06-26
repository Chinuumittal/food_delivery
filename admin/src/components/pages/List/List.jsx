import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css'

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        console.error("Failed to fetch data:", response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };
  const removeFood = async (foodId) => {
  try {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId
    });

    if (response.data.success) {
      await fetchList(); // Refresh the list
    } else {
      console.error("Delete failed:", response.data.message);
    }
  } catch (error) {
    console.error("Error removing food:", error);
  }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
  <div className='list add flex-col'>
    <p>All Foods List</p>
    <div className="list-table">
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list.map((item, index) => (
        <div className="list-table-format" key={index}>
        <img src={`${url}/images/${item.image}`} alt={item.name} className="food-image" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>${item.price}</p>
          <button className="delete-button" onClick={()=>removeFood(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
);

}

export default List
