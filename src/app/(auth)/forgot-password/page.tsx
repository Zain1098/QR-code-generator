'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const supabase = createClient()
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    
    setLoading(false)
    
    if (error) {
      setError(error.message)
      toast.error('Failed to send reset link')
      return
    }
    
    setSuccess(true)
    toast.success('Reset link sent to your email')
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Check your email</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            We've sent password reset instructions to <span className="font-medium text-zinc-900 dark:text-white">{email}</span>.
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
        <div className="mb-6">
          <Link href="/login" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to login
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Reset your password</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-900/50">
            {error}
          </div>
        )}
        
        <form onSubmit={handleResetPassword} className="space-y-4">
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
          
          <button
            type="submit"
            disabled={loading || !email}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send reset instructions'}
          </button>
        </form>
      </div>
    </div>
  )
}
