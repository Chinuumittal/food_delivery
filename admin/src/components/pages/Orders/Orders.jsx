import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../../assets/assets';

const Orders = ({ url = "http://localhost:4000" }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      console.log("Orders API response:", response.data);

      if (response.data.success) {
        setOrders(response.data.orders || response.data.data || []);
      } else {
        toast.error("No orders found");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error fetching orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Error updating status");
    }
  };

  return (
    <div className='order add'>
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="parcel" />

              <div>
                <p className='order-item-food'>
                  {order.items.map((item, i) =>
                    `${item.name} x ${item.quantity}${i !== order.items.length - 1 ? ", " : ""}`
                  )}
                </p>

                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>

                <div className="order-item-address">
                  <p>{order.address.street},</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.zipCode}</p>
                </div>

                <p className='order-item-phone'>{order.address.phone}</p>
                <p>Items: {order.items.length}</p>
                <p>Total: ${order.amount}</p>

                <select
                  value={order.status}
                  onChange={(e) => statusHandler(e, order._id)}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
