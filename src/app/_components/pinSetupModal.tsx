'use client';
import React, { useState, useRef, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface PinSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userData?: {
    email: string;
    studentId: string;
  };
}

// Placeholder API function - implement this later
const savePinToAPI = async (pinData: { pin: string; email?: string; studentId?: string }) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('PIN saved:', pinData);
      resolve({ success: true });
    }, 1000);
  });
};

const PinSetupModal: React.FC<PinSetupModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  userData 
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [pin, setPin] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-redirect timer for success step
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        onSuccess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, onSuccess]);

  // Autofocus first input when step 2 opens
  useEffect(() => {
    if (step === 2 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [step]);

  const handlePinChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;
    
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newPin = [...pin];
    for (let i = 0; i < pastedData.length; i++) {
      newPin[i] = pastedData[i];
    }
    setPin(newPin);

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleCreatePin = async () => {
    const pinString = pin.join('');
    if (pinString.length !== 4) return;

    setIsLoading(true);
    try {
      await savePinToAPI({
        pin: pinString,
        email: userData?.email,
        studentId: userData?.studentId
      });
      setStep(3);
    } catch (error) {
      console.error('Failed to save PIN:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isPinComplete = pin.every(digit => digit !== '');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fade-in">
        
        {/* Step 1: Prompt */}
        {step === 1 && (
          <>
            <p className="font-bold">
              Would you like to set a 4 digit PIN to secure your parent account?
            </p>
            <div className="flex gap-2 w-fit mt-5 m-auto">
              <button
                className="px-4 py-2 border rounded text-cyan-800 border-cyan-600"
                onClick={onClose}
              >
                No
              </button>
              <button
                className="px-4 py-2 rounded text-white bg-cyan-600"
                onClick={() => setStep(2)}
              >
                Yes
              </button>
            </div>
          </>
        )}

        {/* Step 2: PIN Input */}
        {step === 2 && (
          <>
            <p className="font-bold text-center mb-6">
              Input your 4 digit PIN to secure your parent account
            </p>
            
            <div className="flex gap-3 justify-center mb-6">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                />
              ))}
            </div>

            <button
              onClick={handleCreatePin}
              disabled={!isPinComplete || isLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating PIN...
                </>
              ) : (
                'Create PIN'
              )}
            </button>
          </>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <p className="font-bold text-lg mb-2">You&apos;ve successfully signed up!</p>
            <p className="text-gray-600 text-sm mb-6">
              You will now be redirected to your dashboard. Click on the button below to proceed.
            </p>
            <button
              onClick={onSuccess}
              className="px-6 py-2 rounded text-white bg-cyan-600 hover:bg-cyan-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinSetupModal;