'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Eye, EyeOff, X } from "lucide-react";
// import { useRouter } from 'next/navigation';
import HeroSection from '../../../../../_components/authHeroSection';
import { loginParent } from '../../../../../utils/authApi';
import heroImage from '../../../../Assets/parentOne.png'
import { useRouter } from 'next/navigation';
import PinSetupModal from '../../../../../_components/pinSetupModal';


const LoginInterface: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    studentId: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await loginParent(formData);

      // Handle successful login
      console.log('Login successful:', response);
      setShowPinModal(true);
      
      // Store token if provided
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        // or use cookies for better security
      }

    } catch (error) {
      // Handle errors
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Login failed. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/schools/secondarySchool/parent/parentForgetPassword')
  };

  const handlePinSetupClose = () => {
    setShowPinModal(false);
    router.push('/schools/secondarySchool/parent/dashboard');
  };

  const handlePinSetupSuccess = () => {
    setShowPinModal(false);
    router.push('/schools/secondarySchool/parent/dashboard');
  };

  return (
    <div className="h-fit lg:h-screen flex">
      <HeroSection
        imageSrc={heroImage}
        heading="Stay informed and involved. "
        description="Track your child's academic progress, pay fees, and receive instant updates."
      />

      <div className="flex-1 flex items-center justify-center bg-[#F3FAFF]">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div>
              <Image src="/_assets/logo.png" alt="NetzerTech Logo" width={150} height={150} />
            </div>
          </div>

          <div className="rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2.5">
              Welcome, Please Login
            </h2>

            <div className="space-y-3">
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Student ID
                </label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="Enter Student ID"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all ${
                    errors.studentId ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.studentId && (
                  <p className="mt-1 text-sm text-red-500">{errors.studentId}</p>
                )}
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
                >
                  Forgot your password?
                </button>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>

            {errors.submit && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PIN Setup Modal */}
      <PinSetupModal
        isOpen={showPinModal}
        onClose={handlePinSetupClose}
        onSuccess={handlePinSetupSuccess}
        userData={{
          email: formData.email,
          studentId: formData.studentId
        }}
      />
    </div>
  );
};

export default LoginInterface;