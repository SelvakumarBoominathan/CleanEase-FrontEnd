# CleanEase Frontend - Professional React Application

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/react-18.3+-61dafb)
![Vite](https://img.shields.io/badge/vite-5.3+-646cff)

A modern, production-ready React frontend for the CleanEase platform. Built with cutting-edge technologies including Vite, Redux Toolkit, and professional UI components.

📋 **Table of Contents**

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 🌟 Features

### User Features

- ✅ **User Authentication** - Register, login, password reset with OTP validation
- ✅ **Browse Services** - Search and filter service providers
- ✅ **Easy Booking** - Simple scheduling with date/time selection
- ✅ **Shopping Cart** - Manage multiple bookings
- ✅ **Ratings & Reviews** - Submit and view customer feedback
- ✅ **Responsive Design** - Perfect on mobile, tablet, and desktop
- ✅ **Secure Account** - JWT-based authentication, encrypted passwords

### Admin Features

- ✅ **Admin Dashboard** - Manage platform operations
- ✅ **Employee Management** - Add, edit, delete service providers
- ✅ **Service Management** - Control available services
- ✅ **User Management** - View and manage users
- ✅ **Analytics** - View booking statistics and trends
- ✅ **Reporting** - Generate service reports

### Technical Features

- ⚡ **Fast Development** - Vite with HMR (Hot Module Replacement)
- 🔒 **Secure** - JWT authentication, protected routes, secure token handling
- 📦 **State Management** - Redux Toolkit with Redux Persist
- 🎨 **Professional UI** - CSS variables, dark mode support, animations
- 📱 **Mobile First** - Responsive design with Flexbox/Grid
- 🚀 **Docker Ready** - Containerized deployment
- 🔄 **API Integration** - Seamless Backend-2 integration
- 📝 **Form Validation** - Client and server-side validation with Formik

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0+ ([Download](https://nodejs.org/))
- **npm** 9.0+ or **yarn** 3.0+
- **Docker** & **Docker Compose** (for containerized setup)

### Local Development Setup

**1. Clone repository and install dependencies:**

```bash
cd CleanEase-FrontEnd
npm install
```

**2. Create environment file:**

```bash
cp .env.example .env
```

**3. Configure backend URL:**

```env
# .env - For local development
VITE_BE_URL=http://localhost:8000
```

**4. Start development server:**

```bash
npm run dev
```

Access at: **`http://localhost:5173`**

### Docker Setup

**Full Stack (Frontend + Backend + Databases):**

```bash
# From project root
./start-docker.sh        # Mac/Linux
./start-docker.bat       # Windows

# Services will be available at:
# Frontend:  http://localhost:3000
# Backend:   http://localhost:8000
# MongoDB:   localhost:27017
# Redis:     localhost:6379
```

**Frontend Only:**

```bash
docker build -t cleanease-frontend .
docker run -p 3000:3000 \
  -e VITE_BE_URL=http://backend:8000 \
  cleanease-frontend
```

---

## 📁 Project Structure

```
src/
├── config/
│   └── config.js              # 🔧 API endpoints, constants, features
├── services/
│   ├── api.js                 # 🌐 API service (refactored for Backend-2)
│   └── apiClient.js           # 🔐 Axios client with JWT interceptors
├── components/
│   └── UIComponents.jsx       # 🎨 Professional UI components
├── _components/               # 📄 Page components
│   ├── _Header/               #    Navigation & header
│   ├── _Homepage.jsx          #    Landing page
│   ├── _Login/                #    Authentication
│   ├── _Registerpage/         #    User registration
│   ├── _Emailvarification/    #    Email verification
│   ├── _OTPvalidation/        #    OTP validation
│   ├── _Setpassword/          #    Password reset
│   ├── _Bookingpage/          #    Service booking
│   ├── _Body/                 #    Main content
│   │   └── Modals/            #    Modal dialogs
│   ├── _Cart/                 #    Shopping cart
│   ├── _Searchfield/          #    Search filtering
│   └── _Footer/               #    Footer
├── middleware/
│   └── auth.jsx               # 🔒 Protected routes
├── store/
│   └── store.js               # 📦 Redux store config
├── slices/
│   ├── loginslice.js          #    Auth state
│   ├── registerslice.js       #    Registration state
│   └── bookingsSlice.js       #    Bookings state
├── utils/
│   ├── errorHandler.js        # ⚠️  Error handling
│   ├── helper.js              #    Helper functions
│   └── validate.js            #    Form validation
├── styles/
│   ├── theme.css              # 🎨 CSS variables & theme
│   └── components.css         #    Component styles
├── App.jsx                    # 📱 Main app component
└── main.jsx                   # ⚡ Entry point
```

---

## 🔌 API Integration

### Refactored API Service

All API calls now use a centralized, clean interface:

```javascript
import * as api from "./services/api.js";

// Authentication
await api.registerUser({ email, password, name });
await api.loginUser({ username, password });
await api.resetPassword({ username, otp, newPassword });

// Employees
await api.getAllEmployees(page, limit);
await api.getEmployeeById(id);
await api.addEmployee(employeeData); // Admin only
await api.updateEmployee(id, employeeData); // Admin only
await api.deleteEmployee(id); // Admin only

// Bookings
await api.addBooking(bookingData);
await api.getUserBookings();
await api.cancelBooking(bookingData);

// Reviews
await api.addReviewAndRating(reviewData);

// Users
await api.getUserDetails(username);
await api.updateUserProfile(profileData);
```

### Automatic Features

Every API call includes:

- ✅ Automatic JWT token injection
- ✅ Error handling & user notifications
- ✅ Toast alerts for success/failure
- ✅ Retry logic with exponential backoff
- ✅ Request/response logging
- ✅ Token expiry handling & auto-logout

---

## 🎨 Theming & Customization

### Change Colors

Edit `src/styles/theme.css`:

```css
:root {
  --primary-color: #6366f1; /* Brand color */
  --secondary-color: #8b5cf6; /* Secondary */
  --success-color: #10b981; /* Success state */
  --danger-color: #ef4444; /* Error state */
  --warning-color: #f59e0b; /* Warning state */
  /* ... more variables */
}
```

---

## 📦 npm Scripts

```bash
#Development
npm run dev          # Start Vite dev server (http://localhost:5173)

# Production
npm run build        # Build optimized production bundle
npm run preview      # Preview production build locally
npm run lint         # Run ESLint code quality check
```

---

## 🌍 Environment Variables

Create `.env` file with these variables:

```env
# API Configuration
VITE_BE_URL=http://localhost:8000

# For Docker (service name from docker-compose)
# VITE_BE_URL=http://backend:8000

# For Production
# VITE_BE_URL=https://api.yourdomain.com

# Features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=false
```

---

## 🚀 Deployment

### Production Build

```bash
npm run build
# Creates optimized dist/ folder

# Test build locally
npm run preview
```

### Docker Deployment

```bash
# Build image
docker build -t cleanease-frontend:latest .

# Run container
docker run -p 3000:3000 \
  -e VITE_BE_URL=https://api.yourdomain.com \
  cleanease-frontend:latest
```

---

## 🐛 Troubleshooting

### Port 3000/5173 Already in Use

**Linux/Mac:**

```bash
lsof -i :3000
kill -9 <PID>
```

**Windows:**

```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Backend Connection Failed

1. Ensure backend is running: `npm start` in backend folder
2. Check API URL in `.env`: `VITE_BE_URL=http://localhost:8000`
3. Verify CORS is enabled in backend

### Module Not Found Error

```bash
#Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Docker Build Fails

```bash
# Clean up Docker system
docker system prune

# Rebuild without cache
docker build --no-cache -t cleanease-frontend .
```

---

## 📚 Tech Stack

| Layer                | Technology    | Version |
| -------------------- | ------------- | ------- |
| **UI Framework**     | React         | 18.3+   |
| **Build Tool**       | Vite          | 5.3+    |
| **State Management** | Redux Toolkit | 2.2+    |
| **HTTP Client**      | Axios         | 1.7+    |
| **Form Handling**    | Formik        | 2.4+    |
| **Routing**          | React Router  | 6.23+   |
| **Containerization** | Docker        | Latest  |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📄 License

MIT License - see LICENSE file for details.

---

## 🎓 Additional Resources

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Axios Docs](https://axios-http.com)

---

**Version:** 1.0.0  
**Last Updated:** February 8, 2026  
**Status:** ✅ Production Ready

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

N/A

---

## Acknowledgements

Thank you for exploring CleanEase! Your feedback and contributions are welcome.
