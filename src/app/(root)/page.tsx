import ClientSection from '@/components/global/home-sections/client.section'
import HeroSection from '@/components/global/home-sections/hero.section'
import PriceSection from '@/components/global/home-sections/price.section'
import React from 'react'

const Home = () => {
  return (

    <div id="main" className="bg-gradient-to-br from-neutral-900 to-neutral-800">
      <HeroSection />
      <PriceSection />
      <ClientSection />
    </div>

  )
}

export default Home

