'use client'
import CardTitle from '@/components/shared/CardTitle'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'

const ResetPassword = () => {
    const { user } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [])
    if (!user) return null
    return (

        <div className='flex items-center justify-center min-h-screen'>
            <div className="card-container">
                <CardTitle />
                <h2 className="text-2xl text-white text-center mb-8">Set New Password</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-neutral-300 mb-2">New Password</label>
                        <input type="password" className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white" />
                    </div>
                    <div>
                        <label className="block text-neutral-300 mb-2">Confirm New Password</label>
                        <input type="password" className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white" />
                    </div>
                    <button className="w-full bg-white text-neutral-900 py-3 rounded-lg">Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword