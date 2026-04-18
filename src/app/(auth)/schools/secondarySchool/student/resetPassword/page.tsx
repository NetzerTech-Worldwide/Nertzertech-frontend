'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/navigation';
import HeroSection from '../../../../../_components/authHeroSection';
import { resetPassword } from '../../../../../utils/authApi';

const ResetPasswordInterface: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    confirmPassword : '',
    newPassword: ''
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

    if (!formData.newPassword) {
      newErrors.password = 'type in your new password';
    } else if (formData.newPassword  !== formData.confirmPassword) {
      newErrors.password = 'Password must match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  if (!validateForm()) return;
  
  setIsLoading(true);
  try {
    const response = await resetPassword(formData.newPassword);  
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

  const backtoLogin = () => {
    router.push('/schools/secondarySchool/student/login')
  };

  return (
    <div className="h-fit lg:h-screen flex">
      <HeroSection
        imageSrc="/_assets/studentOne.png"
        heading="Stay organized, stay ahead."
        description="From timetables to exams, NetzerTech helps you focus on what truly matters."
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
              Create new password.
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Enter New Password.
                </label>
                <input
                  type="text"
                  id="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter New Password."
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password.
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password."
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
                    Processing ...
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </div>

            <div className="text-center mt-2">
                <button
                type="button"
                onClick={backtoLogin}  
                className="text-sm font-medium "
                >
                Back to <span className='text-cyan-600 hover:text-cyan-700 transition-colors'>Login</span>
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
    </div>
  );
};

export default ResetPasswordInterface;
