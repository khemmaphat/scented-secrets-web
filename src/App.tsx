import React, { useEffect, useState } from 'react'

import { Header } from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home' // Assuming your pages are in a 'pages' directory
import { Knowledge } from './pages/Knowledge'
import { Mix } from './pages/Mix'
import { Recommend } from './pages/Recommend'
import { Profile } from './pages/Profile'
import { PerfumeDetail } from './pages/PerfumeDetail'
import { MixedResult } from './pages/MixedResult'
import { QuestionResult } from './pages/QuestionResult'
import { PerfumePath } from './interfaces/perfume_interface'
import { PerfumeServiceArray } from './service/perfume_service'

const MyComponent: React.FC = () => {
    const perfumeServiceArray = new PerfumeServiceArray()

    const [routes, setRoutes] = useState<PerfumePath[]>()

    useEffect(() => {
        perfumeServiceArray.getPerfumePath().then((response) => {
            setRoutes(response.data)
        })
    }, [])

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/knowledge" element={<Knowledge />} />
                <Route path="/mix" element={<Mix />} />
                <Route path="/recommend" element={<Recommend />} />
                <Route path="/profile" element={<Profile />} />
                {routes?.map((route, index) => (
                    <Route
                        key={index}
                        path={`perfumedetail-${route.path}`}
                        element={<PerfumeDetail />}
                    />
                ))}
                <Route path="/mixedresult" element={<MixedResult />} />
                <Route path="/questionresult" element={<QuestionResult />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyComponent
