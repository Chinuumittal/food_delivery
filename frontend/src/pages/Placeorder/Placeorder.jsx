import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/Storecontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url,
    user
  } = useContext(StoreContext);

  const subtotal = getTotalCartAmount();
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('online');

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    const orderData = {
      userId: user?._id || "test_user",
      address: data,
      items: orderItems,
      amount: total,
      payment: paymentMethod === 'cod' ? true : false,
      paymentMethod
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          token: token
        }
      });

      if (response.data.success) {
        if (paymentMethod === 'cod') {
          toast.success('Order placed with Cash on Delivery!');
          navigate('/myorders');
        } else {
          window.location.replace(response.data.session_url);
        }
      } else {
        toast.error("Order placement failed.");
        console.log("Order placement failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong while placing the order.");
    }
  };

  useEffect(() => {
    if (!token || subtotal === 0) {
      navigate('/cart');
    }
  }, [token, subtotal]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="First name"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Street address"
          value={data.street}
          onChange={(e) => setData({ ...data, street: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={data.city}
          onChange={(e) => setData({ ...data, city: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={data.state}
          onChange={(e) => setData({ ...data, state: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Zip/Postal code"
          value={data.zipcode}
          onChange={(e) => setData({ ...data, zipcode: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={data.country}
          onChange={(e) => setData({ ...data, country: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone number"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{subtotal.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{total.toFixed(2)}</b>
          </div>

          {/* Payment Method UI */}
          <div className="payment-method">
            <p>Choose Payment Method:</p>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                />
                Online Payment
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                Cash on Delivery (COD)
              </label>
            </div>
          </div>

          <button type="submit">PROCEED TO PAY</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
