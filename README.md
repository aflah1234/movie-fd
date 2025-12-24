# 🎬 CineBook - Frontend

## 🚀 Overview
This is the **React + Vite** frontend for **CineBook**, a movie ticket booking platform developed by Aflah. The frontend provides a modern, responsive user interface for browsing movies, selecting seats, making bookings, and managing user accounts.

---

## ✨ Key Features

### 🎭 User Experience
- **Modern UI/UX** with custom cinema theme
- **Responsive Design** optimized for all devices
- **Theme Switcher** with 10+ beautiful themes
- **Smooth Animations** with Framer Motion
- **Interactive Components** with DaisyUI

### 🔐 Authentication
- **User Registration** with OTP verification
- **Secure Login** with JWT tokens
- **Password Reset** functionality
- **Profile Management** with image upload
- **Role-based Access** (User, Theater Owner, Admin)

### 🎬 Movie Features
- **Movie Browsing** with search and filters
- **Movie Details** with trailers and reviews
- **Show Listings** by date and location
- **Real-time Seat Selection** with interactive layout
- **Booking History** and management

### 💳 Booking & Payments
- **Interactive Seat Selection** with real-time availability
- **Payment Integration** with Razorpay
- **Mock Payment System** for development
- **Booking Confirmations** with printable tickets
- **Payment History** tracking

### 🏛️ Theater Management
- **Theater Owner Dashboard** with analytics
- **Theater Registration** and management
- **Show Scheduling** with seat layout configuration
- **Revenue Tracking** with charts and insights

### 🎨 Design Features
- **Custom Cinema Theme** with red/gold color scheme
- **Dark/Light Mode** support
- **Gradient Backgrounds** and hover effects
- **Cinema-themed Icons** and animations
- **Print-optimized** booking tickets

---

## 🛠 Technologies Used

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Charts**: Chart.js + React Chart.js 2
- **Icons**: Lucide React
- **Animations**: Lottie React
- **Forms**: React Hook Form
- **Alerts**: SweetAlert2

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aflah1234/cinebook.git
   cd cinebook
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   VITE_API_URL=http://localhost:8000
   
   # Payment Configuration (Development)
   VITE_RAZORPAY_KEY_ID=DISABLED_IN_DEV
   VITE_SKIP_RAZORPAY=true
   VITE_FORCE_MOCK_PAYMENT=true
   
   # For Production
   # VITE_API_URL=https://your-backend-api.railway.app
   # VITE_RAZORPAY_KEY_ID=rzp_test_your_actual_key
   # VITE_SKIP_RAZORPAY=false
   # VITE_FORCE_MOCK_PAYMENT=false
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

The application will start on `http://localhost:5173`

---

## 📁 Project Structure

```
client/
├── public/                 # Static assets
│   └── Logo.png           # App logo
├── src/
│   ├── assets/            # Images and media files
│   ├── components/        # Reusable UI components
│   │   ├── admin/         # Admin-specific components
│   │   ├── owner/         # Theater owner components
│   │   ├── shared/        # Shared components
│   │   ├── ui/            # UI components (buttons, modals)
│   │   └── user/          # User-specific components
│   ├── config/            # Configuration files
│   │   └── axiosInstance.js # API client setup
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Page layouts
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin pages
│   │   ├── owner/         # Theater owner pages
│   │   ├── shared/        # Shared pages (login, register)
│   │   └── user/          # User pages
│   ├── routes/            # Routing configuration
│   ├── store/             # Zustand state management
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles and themes
├── .env                   # Environment variables
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
└── vite.config.js         # Vite configuration
```

---

## 🎨 Themes & Customization

### Available Themes
- **Cinema** (Custom) - Red/gold movie theater theme
- **Dark** - Classic dark theme
- **Light** - Clean light theme
- **Synthwave** - Neon purple/pink
- **Cyberpunk** - Futuristic neon
- **Dracula** - Purple vampire theme
- **Forest** - Nature green
- **Luxury** - Premium gold & black
- **Valentine** - Romantic pink
- **Halloween** - Spooky orange

### Theme Switcher
The app includes a built-in theme switcher component that allows users to change themes dynamically. Themes are saved in localStorage for persistence.

### Custom Styling
- **Cinema Theme**: Custom CSS variables and gradients
- **Hover Effects**: Smooth transitions and animations
- **Responsive Design**: Mobile-first approach
- **Print Styles**: Optimized for ticket printing

---

## 🔧 Configuration

### API Integration
The frontend communicates with the backend API through Axios. Configure the API URL in the `.env` file:

```env
# Development
VITE_API_URL=http://localhost:8000

# Production
VITE_API_URL=https://your-backend-api.railway.app
```

### Payment Integration
- **Development**: Uses mock payment system
- **Production**: Integrates with Razorpay

### Authentication
- JWT tokens stored in HTTP-only cookies
- Automatic token refresh
- Protected routes with role-based access

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Platforms

#### **Netlify (Recommended for Frontend)**
1. Build Command: `npm run build`
2. Publish Directory: `dist`
3. Environment Variables: Add your production env vars

#### **Vercel**
1. Framework Preset: **Vite**
2. Build Command: `npm run build`
3. Output Directory: `dist`

#### **GitHub Pages**
```bash
npm run build
npm run preview
```

---

## 🧪 Development Features

### Mock Systems
- **Mock Payments**: Skip Razorpay in development
- **Mock Data**: Test with sample movies and theaters
- **Development Tools**: Hot reload, error overlay

### Testing
- Component testing setup ready
- API integration testing
- Mock service workers for offline testing

---

## 📱 Features by User Role

### 👤 Regular Users
- Browse movies and showtimes
- Select seats and make bookings
- View booking history
- Write movie reviews
- Manage profile

### 🏛️ Theater Owners
- Register and manage theaters
- Add shows and manage schedules
- View revenue analytics
- Track bookings and occupancy

### 👨‍💼 Admins
- Manage all movies and theaters
- Approve theater registrations
- View system-wide analytics
- Manage user accounts

---

## 🎯 Performance Optimizations

- **Code Splitting**: Lazy loading for routes
- **Image Optimization**: Responsive images with lazy loading
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Service worker for offline functionality
- **SEO**: Meta tags and structured data

---

## 👨‍💻 Author

**Aflah**
- GitHub: [@aflah1234](https://github.com/aflah1234)
- Email: aflah1234@gmail.com
- Frontend: [CineBook Frontend](https://github.com/aflah1234/cinebook)
- Backend: [CineBook Backend](https://github.com/aflah1234/cinebook-)

---

## 📧 Contact

Got questions or feedback? Reach out:  
- Email: aflah1234@gmail.com  
- Issues: Open a ticket [here](https://github.com/aflah1234/cinebook/issues)

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.

---

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite** for lightning-fast development
- **Tailwind CSS** for utility-first styling
- **DaisyUI** for beautiful components
- **Framer Motion** for smooth animations

---

### 🎉 Why CineBook Frontend?

**CineBook Frontend** delivers a modern, intuitive, and visually stunning user experience for movie booking. With its custom cinema theme, responsive design, and comprehensive features, it provides everything needed for a professional movie ticket booking platform! 🎬✨