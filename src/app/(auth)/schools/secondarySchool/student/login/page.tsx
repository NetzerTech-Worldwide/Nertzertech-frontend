'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

import HeroSection from '../../../../../_components/authHeroSection';
import { loginStudent } from '../../../../../utils/authApi';
import heroImage from '../../../../../Assets/studentOne.png';

const LoginInterface: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
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
      const response = await loginStudent(formData);

      // your original logic preserved
      if (response.mustChangePassword) {
        router.push('/schools/secondarySchool/student/change-password');
      } else {
        router.push('/schools/secondarySchool/student/dashboard');
      }

    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error
          ? error.message
          : 'Login failed. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/schools/secondarySchool/student/forgetPassword');
  };

  return (
    <div className="h-fit lg:h-screen flex">
      <HeroSection
        imageSrc={heroImage}
        heading="Stay organized, stay ahead."
        description="From timetables to exams, NetzerTech helps you focus on what truly matters."
      />

      <div className="flex-1 flex items-center justify-center bg-[#F3FAFF]">
        <div className="w-full max-w-md">

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Image
              src="/_assets/logo.png"
              alt="NetzerTech Logo"
              width={150}
              height={150}
            />
          </div>

          <div className="rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2.5">
              Welcome, Please Login
            </h2>

            <div className="space-y-3">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  className={`w-full px-4 py-2 border rounded-lg outline-none ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Student ID
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="Enter Student ID"
                  className={`w-full px-4 py-2 border rounded-lg outline-none ${
                    errors.studentId ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.studentId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.studentId}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className={`w-full px-4 py-2 border rounded-lg outline-none ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-2.5 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-cyan-600 hover:text-cyan-700"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-cyan-600 text-white py-3 rounded-lg disabled:opacity-50 flex justify-center items-center"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

              {/* Submit error */}
              {errors.submit && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">
                    {errors.submit}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInterface;