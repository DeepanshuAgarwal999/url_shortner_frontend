'use client'

import { UserService } from "@/apis/UserService";
import CardTitle from '@/components/shared/CardTitle'
import Loader from '@/components/shared/Loader';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { toast } from 'sonner';

interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            setIsLoading(true);
            await UserService.signup({
                name,
                email,
                password
            });
            toast.success('Account created successfully');
            router.push('/login');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="card-container">
                <CardTitle />
                <h2 className="text-2xl text-white text-center mb-8">Create Account</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-neutral-300 mb-2">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-neutral-300 mb-2">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-neutral-300 mb-2">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-neutral-300 mb-2">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-neutral-900 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader size={24} />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>
                <p className="text-center text-neutral-300 mt-6">
                    Already have an account? <Link href="login" className="text-white hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;