# 🍔 Full-Stack Food Delivery Web App

A complete **Food Delivery Web Application** with:

- 🍽️ **User View**: Customers can browse food, add items to cart, and place orders.
- 🛠️ **Admin Dashboard**: Admins can add products, manage inventory, and view orders.

Built using **React**, **Node.js**, **Express**, **MongoDB**, and **Stripe**.

---

## 🌐 Live Links

- 🧑‍🍳 **User Site**: [https://food-delivery-front-lxfe.onrender.com](https://your-user-site.onrender.com)  
- 🧑‍💼 **Admin Panel**: [https://food-delivery-admin-eft0.onrender.com](https://your-admin-site.onrender.com)  
- 🔗 **Backend API**: [https://food-delivery-1-vgsl.onrender.com](https://food-delivery-1-vgsl.onrender.com)

---

## 🛠️ Tech Stack

| Layer        | Tech Used                                  |
|--------------|---------------------------------------------|
| Frontend     | React, React Router, Axios, Toastify        |
| Backend      | Node.js, Express, MongoDB, Mongoose         |
| Styling      | CSS Modules                                 |
| Payments     | Stripe API (User Side)                      |
| Deployment   | Render (Frontend + Backend)                 |

---

## 📁 Folder Structure

```
food-delivery-app/
│
├── frontend/                # 👨‍🍳 User View (React Frontend)
│   ├── components/         # Navbar, Food Cards, Footer etc.
│   ├── pages/              # Home, Cart, Place Order, Login etc.
│   ├── context/            # Context API for global state (cart, auth)
│   └── App.jsx             # Frontend routing
│
├── admin/                  # 👨‍💼 Admin Panel (React Frontend)
│   ├── components/         # Navbar, Sidebar etc.
│   ├── pages/              # Add Product, Orders, Product List
│   └── App.jsx             # Frontend routing
│
├── backend/                # 🔧 Express Backend API
│   ├── routes/             # foodRoutes.js, orderRoutes.js, userRoutes.js
│   ├── controllers/        # Controller logic for routes
│   ├── models/             # Mongoose schemas: Food, Order, User
│   └── server.js            # App entry point
```

---

## ✨ Features

### 👨‍🍳 User View
- Browse categorized food items
- Add to cart, view cart total
- Login / Register
- Place order with delivery address
- Stripe payment integration
- Toast alerts for user feedback

### 🧑‍💼 Admin Panel
- Add new food items with image
- View list of all products
- View list of all customer orders
- Real-time form validation
- Toast notifications for success/error

### 🔧 **Backend API**
- RESTful API with Express.js
- MongoDB for persistent storage
- Stripe integration for orders
- Image uploads handled with `multer`

---

## ⚙️ Setup Instructions (Locally)

1. **Clone the repo**
```bash
git clone https://github.com/your-username/food_delivery.git
cd food_delivery
