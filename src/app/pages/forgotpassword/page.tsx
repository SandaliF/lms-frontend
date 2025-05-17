"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface ForgotPasswordProps {
  // Add any props you might need to communicate with parent components
}

export default function ForgotPassword(props: ForgotPasswordProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Here you would typically make an API call to your backend
      // Example:
      // const response = await fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message || 'Failed to send reset email');
      
      // Simulating a successful request for demonstration:
      setTimeout(() => {
        setSuccess(true);
        setIsLoading(false);
      }, 1500);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send password reset email. Please try again.');
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  const handleResendEmail = () => {
    setSuccess(false);
    setError('');
    handleSubmit(new Event('submit') as any);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-md mx-auto w-full">
        {/* Logo will be placed here - leave comment for manual placement */}
        {/* <div className="flex justify-center mb-6">
          <Image 
            src="/path-to-your-logo.png" 
            alt="Logo" 
            width={120} 
            height={80}
          />
        </div> */}
        
        <h2 className="text-center text-xl font-semibold mb-6">
          Reset Your Password
        </h2>

        {success ? (
          <div className="space-y-6">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Email sent successfully!</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>We've sent a password reset link to <strong>{email}</strong></p>
                    <p className="mt-1">Please check your email and follow the instructions to reset your password.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="w-full bg-gray-600 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Resend Email'}
                </button>
                
                <button
                  onClick={handleBackToLogin}
                  className="w-full bg-blue-900 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-blue-800 transition"
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-900 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50"
                >
                  {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              Remember your password?{' '}
              <Link href="/pages/login" className="text-blue-600 hover:text-blue-500">
                Back to Login
              </Link>
            </div>

            <div className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <Link href="/pages/register" className="text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}