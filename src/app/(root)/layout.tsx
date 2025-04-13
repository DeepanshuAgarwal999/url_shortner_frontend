import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen flex flex-col justify-between'>
            <Navbar />
            <div className='flex-1'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout