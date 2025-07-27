# 🏠 PropEase - Real Estate Platform

A comprehensive MERN stack real estate platform where users can discover, wishlist, and purchase properties while agents can manage listings and admins oversee the entire ecosystem.

## 🌐 Live Site
[https://real-estate-platform-4dacc.web.app](https://real-estate-platform-4dacc.web.app)

## 🔐 Admin Access
- **Email:** admin@gmail.com
- **Password:** 123qwA.

## 🏢 Agent Access
- **Email:** agent@gmail.com
- **Password:** 123qwA.


## 🚀 Key Features

• **Multi-Role Authentication System** - Secure login with email/password and Google OAuth for users, agents, and admins

• **Advanced Property Management** - Agents can add, update, and track properties with image uploads and verification workflow

• **Smart Wishlist & Purchase System** - Users can save properties, make offers within price ranges, and complete secure payments

• **Comprehensive Dashboard** - Role-based dashboards with profile management, property tracking, and administrative controls

• **Real-time Property Verification** - Admin-controlled verification system ensuring only quality listings appear publicly

• **Interactive Review System** - Users can leave reviews on properties with admin moderation capabilities

• **Responsive Design** - Fully responsive interface optimized for mobile, tablet, and desktop devices

• **Advanced Search & Filtering** - Location-based search and price range sorting for efficient property discovery

• **Secure Payment Integration** - Stripe-powered payment system for property purchases with transaction tracking

• **Fraud Prevention System** - Admin tools to mark fraudulent agents and automatically remove their listings

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form handling and validation
- **SweetAlert2** - Beautiful notifications and alerts
- **Swiper** - Touch slider for banners and galleries
- **Lottie React** - Animation library for enhanced UX

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Firebase** - Authentication and user management
- **Stripe** - Payment processing
- **ImgBB** - Image hosting service

### Deployment
- **Firebase** - Frontend deployment
- **Vercel** - Backend deployment
- **MongoDB Atlas** - Cloud database hosting

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Mobile devices** (320px - 768px)
- **Tablets** (768px - 1024px) 
- **Desktop** (1024px+)

All components, including dashboards, forms, and property cards, adapt seamlessly across different screen sizes.

## 🔒 Security Features

- **Environment Variables** - All sensitive data (Firebase config, MongoDB credentials) are secured using environment variables
- **JWT Authentication** - Secure token-based authentication system
- **Role-Based Access Control** - Granular permissions for users, agents, and admins
- **Input Validation** - Comprehensive form validation and sanitization
- **Protected Routes** - Private routes with authentication checks
- **Secure API Endpoints** - Backend API with proper authentication middleware

## 🎯 User Roles & Capabilities

### 👤 Regular Users
- Browse verified properties
- Add properties to wishlist
- Make offers on properties
- Complete property purchases
- Leave reviews on properties
- Manage personal profile and reviews

### 🏢 Real Estate Agents
- Add new property listings
- Upload property images
- Track property verification status
- Manage property offers and sales
- View sold properties and earnings
- Update property information

### 👨‍💼 Administrators
- Manage all users and their roles
- Verify or reject property listings
- Monitor and moderate user reviews
- Mark fraudulent agents
- Oversee platform operations
- Access comprehensive analytics

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database
- Firebase project
- Stripe account (for payments)

## 📊 Database Schema

The platform uses MongoDB with the following main collections:
- **Users** - User profiles, roles, and authentication data
- **Properties** - Property listings with agent information and verification status
- **Wishlist** - User wishlist items
- **Offers** - Property purchase offers and status
- **Reviews** - User reviews for properties
- **Payments** - Payment transaction records

## 🔄 API Endpoints

### Authentication
- `POST /users` - Register new user
- `GET /users/role/:email` - Get user role
- `PATCH /users/:id/role` - Update user role
- `PATCH /users/:id/fraud` - Mark user as fraud
- `DELETE /users/:id` - Delete user

### Properties
- `GET /properties` - Get all verified properties
- `POST /properties` - Add new property
- `GET /properties/:id` - Get property details
- `PATCH /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property
- `PATCH /properties/:id/verify` - Verify property

### Wishlist & Offers
- `POST /wishlist` - Add to wishlist
- `GET /wishlist/:email` - Get user wishlist
- `DELETE /wishlist/:id` - Remove from wishlist
- `POST /offers` - Make property offer
- `GET /offers/:email` - Get user offers
- `PATCH /offers/:id/status` - Update offer status

### Reviews
- `POST /reviews` - Add property review
- `GET /reviews` - Get all reviews
- `GET /reviews/:propertyId` - Get property reviews
- `DELETE /reviews/:id` - Delete review


## 🙏 Acknowledgments

- Firebase for authentication services
- Stripe for payment processing
- ImgBB for image hosting
- Vercel for deployment platform
- MongoDB Atlas for database hosting
- All contributors and testers

---

**PropEase** - Making real estate transactions simple, secure, and seamless! 🏠✨