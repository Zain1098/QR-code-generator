'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Basic password strength logic
  const hasMinLength = password.length >= 8
  const hasNumber = /\d/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const strengthScore = [hasMinLength, hasNumber, hasUpper].filter(Boolean).length

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (!acceptTerms) {
      setError('You must accept the terms and conditions')
      return
    }
    
    setLoading(true)
    setError(null)
    
    const supabase = createClient()
    
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    
    setLoading(false)
    
    if (signUpError) {
      setError(signUpError.message)
      toast.error('Failed to sign up')
      return
    }
    
    setSuccess(true)
    toast.success('Account created successfully!')
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Check your email</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            We've sent a verification link to <span className="font-medium text-zinc-900 dark:text-white">{email}</span>. Please click the link to activate your account.
          </p>
          <Link href="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            Return to login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Create an Account</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Join us and start generating QR codes</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-900/50">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="••••••••"
              required
            />
            {password.length > 0 && (
              <div className="mt-2 flex space-x-1">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className={`h-1 flex-1 rounded-full ${
                      strengthScore >= i 
                        ? (strengthScore === 1 ? 'bg-red-500' : strengthScore === 2 ? 'bg-yellow-500' : 'bg-green-500') 
                        : 'bg-zinc-200 dark:bg-zinc-700'
                    }`}
                  ></div>
                ))}
              </div>
            )}
            <div className="mt-1 flex items-center text-xs text-zinc-500 dark:text-zinc-400 space-x-4">
              <span className={hasMinLength ? 'text-green-500' : ''}>8+ chars</span>
              <span className={hasNumber ? 'text-green-500' : ''}>Number</span>
              <span className={hasUpper ? 'text-green-500' : ''}>Uppercase</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-start mt-2">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-zinc-600 dark:text-zinc-400">
                I accept the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading || strengthScore < 3}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
