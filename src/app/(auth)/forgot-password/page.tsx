"use client"
import { makeRequest } from '@/apis/makeRequest'
import { UserService } from '@/apis/UserService'
import CardTitle from '@/components/shared/CardTitle'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

const ForgotPassword = () => {
    const [email, setEmail] = React.useState('')
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await UserService.forgotPassword(email)
            if (response) {
                toast.success('Email sent successfully')
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className="card-container">
                <CardTitle />
                <h2 className="text-2xl text-white text-center mb-8">Forgot Password</h2>
                <p className="text-neutral-300 text-center mb-8">Enter your email address and we'll send you a link to reset your password.</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-neutral-300 mb-2">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white" />
                    </div>
                    <button className="w-full bg-white text-neutral-900 py-3 rounded-lg">Send Reset Link</button>
                </form>
                <p className="text-center text-neutral-300 mt-6">
                    Remember your password? <Link href="/login" className="text-white hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword