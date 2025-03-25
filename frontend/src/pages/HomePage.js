import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
const HomePage = () => {
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()

    return (
        <div className='bg-primary min-h-screen'>
            <Header />
            <HeroSection handleNavigate={() => navigate(isLoggedIn ? "/collaborationPosts" : "/login")} />
            <Features />
            <CTA handleNavigate={() => navigate(isLoggedIn ? "/collaborationPosts" : "/login")} />
            <Footer />
        </div>
    )
}
export default HomePage