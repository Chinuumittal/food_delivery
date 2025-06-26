import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate=useNavigate();

  const verifyPayment = async () => {
   try {
    const response = await axios.post(url + "/api/order/verify", {
  success,
  orderId,
});

    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    navigate("/");
  }
  };

  useEffect(() => {
    if (success && orderId) {
      verifyPayment();
    }
  }, [success, orderId]);

  return (
    <div className="verify">
        <div className="spinner">
      <h2>Verifying Payment...</h2>
    </div></div>
  );
};

export default Verify;
