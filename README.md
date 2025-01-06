# CleanEase Frontend

CleanEase is an online platform that offers services such as cleaning, driving, plumbing, carpentry, gardening, and more. This frontend application, built using the MERN stack, provides user-friendly features for both users and administrators.

---

## Features

### For Users:

- **Account Creation**: Users can register with their email addresses.
- **Login & Password Reset**: Secure login and password reset functionality with OTP verification.
- **Booking Services**: Users can view available services and book slots online.
- **Cart Management**: A cart to manage selected services.

### For Admins:

- **Admin Login**: Access restricted to the admin account (Username: `admin`, Password: `Admin123$`).
- **Employee Management**: Admins can add new employees or edit existing employee details. These options are invisible to regular users.

---

## File Structure

### Components

- **\_Body**: Handles the main content and service listing.
- **\_Bookingpage**: Manages the booking process, including date and time selection.
- **\_Cart**: Displays selected services for the user.
- **\_Emailverification**: Component for initiating the OTP process.
- **\_Footer**: Application footer with company details.
- **\_Header**: Application header with navigation.
- **\_Login**: Login page for both users and admin.
- **\_OTPverification**: Verifies the OTP during password reset.
- **\_Registerpage**: User registration page.
- **\_Searchfield**: Filters services by criteria such as cost and type.
- **\_Setpassword**: Component for updating passwords after OTP verification.

### State Management

- **Slices**:
  - `bookingsSlice.js`: Manages bookings state.
  - `loginslice.js`: Handles login state for both users and admin.
  - `registerslice.js`: Stores user registration data.
- **store.js**: Centralized Redux store for managing the application's state.

### Middleware

- **auth.js**: Handles authentication logic and restricts access to certain features based on user roles.

### Utilities

- **helper.js**: Helper functions for reusable logic.
- **validate.js**: Validation utilities for forms and inputs.

### Core Files

- **\_Homepage.jsx**: The main entry point for the application's homepage layout.
- **App.jsx**: Root component managing routing and global structure.
- **main.jsx**: Entry point for rendering the application.

### Styling

- **App.css**: Global styles for the application.

### Configuration

- **vite.config.js**: Configuration for Vite, the build tool used.
- **index.html**: Main HTML file for the application.

### Others

- **.gitignore**: Specifies files and directories to exclude from Git.

---

## Tech Stack

- **Frontend Framework**: React.js
- **State Management**: Redux Toolkit
- **Styling**: CSS Modules
- **Build Tool**: Vite

---

## Installation & Setup

### Prerequisites

- Node.js installed
- A running backend server for API requests

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd cleanease-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:5173`.

---

## Admin Credentials

- **Username**: admin
- **Password**: Admin123$

---

## Key Features to Explore

1. **User Registration and Login**

   - Create a new account.
   - Log in to your account.
   - Reset password using OTP verification.

2. **Booking Services**

   - Explore various services.
   - Book slots based on availability.

3. **Admin Functionality**
   - Log in with admin credentials.
   - Add or edit employee details.

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
