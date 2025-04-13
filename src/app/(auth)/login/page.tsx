'use client'

import { UserService } from "@/apis/UserService";
import CardTitle from "@/components/shared/CardTitle";
import Loader from "@/components/shared/Loader";
import { useAuth } from "@/context/AuthProvider";
import { setAuthToken } from "@/utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Login = () => {
    const { setIsLoggedIn, setUser } = useAuth()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const email = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
        const password = e.currentTarget.elements.namedItem("password") as HTMLInputElement;
        try {
            const response: any = await UserService.login({ email: email.value, password: password.value });
            if (response) {
                setIsLoggedIn(true)
                setUser(response)
                localStorage.setItem('token', response.token)
                router.replace('/')
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="card-container">
                <CardTitle />
                <h2 className="text-2xl text-white text-center mb-8">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-neutral-300 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-neutral-300 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                            placeholder="Enter your password"
                        />
                    </div>
                    {/* Remember Me and Forgot Password */}
                    <div className="flex justify-between items-center">
                        <label className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="mr-2 bg-neutral-800 border-neutral-700"
                            />
                            <span className="text-neutral-300">Remember me</span>
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-neutral-300 hover:text-white transition-colors duration-200"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <button
                        disabled={isLoading}
                        className="w-full bg-white text-neutral-900 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Sign-Up Link */}
                <p className="text-center text-neutral-300 mt-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-white hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
