
import React, { useState, useEffect } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { initializeDatabase } from '@/utils/database';
import { Stethoscope, Heart, Users, Calendar } from 'lucide-react';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');

  useEffect(() => {
    // Initialize the database on startup
    initializeDatabase();
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setIsLoggedIn(true);
      setCurrentUser(savedUser);
    }
  }, []);

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setCurrentUser(email);
    localStorage.setItem('currentUser', email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    localStorage.removeItem('currentUser');
  };

  if (isLoggedIn) {
    return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HealthCare Management System</h1>
              <p className="text-gray-600">Comprehensive patient and medical data management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Features */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Modern Healthcare 
                <span className="text-blue-600"> Data Management</span>
              </h2>
              <p className="text-xl text-gray-600">
                Streamline patient records, appointments, and medical data with our comprehensive management platform.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-red-100 p-3 rounded-lg w-fit mb-4">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Health Records</h3>
                <p className="text-gray-600 text-sm">Complete patient medical history and treatment records</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Appointments</h3>
                <p className="text-gray-600 text-sm">Schedule and manage patient appointments efficiently</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Patient Management</h3>
                <p className="text-gray-600 text-sm">Comprehensive patient information and communication</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                  <Stethoscope className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Medical Data</h3>
                <p className="text-gray-600 text-sm">Secure storage and retrieval of medical information</p>
              </div>
            </div>
          </div>

          {/* Right side - Auth Forms */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            {showRegister ? (
              <RegisterForm 
                onRegister={handleLogin}
                onSwitchToLogin={() => setShowRegister(false)}
              />
            ) : (
              <LoginForm 
                onLogin={handleLogin}
                onSwitchToRegister={() => setShowRegister(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
