'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '../../../../../_components/authHeroSection';
import heroImage from '../../../../Assets/teacherOne.png'
import { forgetPassword} from '../../../../../utils/authApi';

const ForgotPasswordInterface: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const response = await forgetPassword(formData);
      console.log('Password reset email sent:', response);
      
      setIsSuccess(true);
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Failed to send reset email. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/schools/secondarySchool/teacher/login');
  };

  if (isSuccess) {
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
              <div>
                <Image src="/_assets/logo.png" alt="NetzerTech Logo" width={150} height={150} />
              </div>
            </div>

            <div className="rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h2>
              
              <p className="text-gray-600 mb-6">
                We&apos;ve sent a password reset link to <span className="font-medium text-gray-900">{formData.email}</span>
              </p>

              <p className="text-sm text-gray-500 mb-6">
                Didn&apos;t receive the email? Check your spam folder or try again.
              </p>

              <button
                onClick={handleBackToLogin}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div>
              <Image src="/_assets/logo.png" alt="NetzerTech Logo" width={150} height={150} />
            </div>
          </div>

          <div className="rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2.5">
              Forgot Password?
            </h2>

            <div className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

               <p className="text-sm text-gray-600 mb-6">
                 Enter the correct email registeredl
              </p>

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
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <button
                onClick={handleBackToLogin}
                className="w-full text-gray-600 font-medium py-2 transition-colors cursor-pointer"
              >
                Back to <span className='text-cyan-600 hover:text-cyan-700'>Login</span>
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

export default ForgotPasswordInterface;