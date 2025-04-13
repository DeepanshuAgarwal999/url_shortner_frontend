'use client'
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
const navLinks = [
    { href: "/#pricing", label: "Pricing" },
    { href: "/#clients", label: "Clients" },
    { href: "/analytics", label: "Analytics" },
];
const Navbar = () => {
    const { user, setUser, setIsLoggedIn } = useAuth()
    const handleLogout = async () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUser(null)
    }
    return (
        <header
            id="header"
            className="w-full sticky top-0 left-0 z-50 bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-800"
        >
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <i className="fa-solid fa-link text-2xl text-white" aria-hidden="true"></i>
                        <span className="text-xl text-white font-semibold">URLShort</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-neutral-300 hover:text-white cursor-pointer transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    {
                        user ? <div className="flex items-center space-x-4">
                            <img
                                src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=123"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <button
                                onClick={handleLogout}
                                className="text-neutral-300 hover:text-white transition-colors duration-200"
                                aria-label="Sign Out"
                            >
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </button>
                        </div> : <Link href="/login">
                            <button
                                className="bg-white text-neutral-900 px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                aria-label="Login"
                            >
                                Login
                            </button>
                        </Link>
                    }
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
