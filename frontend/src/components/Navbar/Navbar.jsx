import React, { useContext, useState ,useEffect} from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/Storecontext';

const Navbar = ({ SetShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken,setCartItems } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");
const [showSearch, setShowSearch] = useState(false);
const { setSearchQuery } = useContext(StoreContext); // you’ll add this in context

const navigate=useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(""); 
    navigate("/")
    setCartItems({});// Clear token or perform logout logic
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} className="logo" alt="logo" /></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? 'active' : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? 'active' : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? 'active' : ""}>Mobile App</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? 'active' : ""}>Contact Us</a>
      </ul>

      <div className='navbar-right'>
        <div className='navbar-search'>
  <img src={assets.search_icon} alt="search" onClick={() => setShowSearch(!showSearch)} />
  {showSearch && (
    <input
      type="text"
      placeholder="Search dishes..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setSearchQuery(e.target.value); // send to global context
      }}
    />
  )}
</div>


        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          {getTotalCartAmount() !== 0 && <div className="dot"></div>}
        </div>

        {!token ? (
          <button onClick={() => SetShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}>
                <img src={assets.bag_icon} alt="orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="logout" />
                <p>Log Out</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
