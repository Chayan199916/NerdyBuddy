import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Step1 from './components/onboarding/Step1';
import Step2 from './components/onboarding/Step2';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import AuthContext from './context/AuthContext';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';  // Optional: For handling 404 routes
import PrivateRoute from './components/PrivateRoute';  // Custom component for protected routes

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Onboarding Steps */}
          <Route path="/onboarding/step1" element={<Step1 />} />
          <Route path="/onboarding/step2" element={<Step2 />} />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Default Route - Redirect based on authentication */}
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
