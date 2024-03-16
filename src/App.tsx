import React from 'react'

import { Header } from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home' // Assuming your pages are in a 'pages' directory
import { About } from './pages/About'
import { Mix } from './pages/Mix'
import { Recommend } from './pages/Recommend'
import { Profile } from './pages/Profile'

const MyComponent: React.FC = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mix" element={<Mix />} />
                <Route path="/recommend" element={<Recommend />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyComponent
