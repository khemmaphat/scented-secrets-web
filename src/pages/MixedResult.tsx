//import React from 'react'

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PerfumeService } from '../service/perfume_service'
import { PerfumeMixedResult } from '../interfaces/perfume_interface'

export const MixedResult = () => {
    const location = useLocation()
    const answered = location.state.answered
    const answeredString = answered.join(',')

    const [mixedResult, setMixedResult] = useState<PerfumeMixedResult>()

    const perfumeService = new PerfumeService()
    useEffect(() => {
        perfumeService
            .getResultMixedPerfume(answeredString)
            .then((response) => {
                setMixedResult(response.data)
            })
    }, [])

    return (
        <div className="flex justify-center">
            <div className="container font-roboto text-lavidbrown text-center text-3xl">
                <div className="mb-8">Perfumes you can mix</div>
                <div className="mb-8 flex justify-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3091/3091458.png"
                        className="size-56"
                    />
                </div>
                <div className="mb-8">
                    Characteristics of perfumes that can be mixed
                </div>
                <div className="text-xl mb-8">
                    <div>
                        Top Notes :<span>{mixedResult?.notes.topNotes}</span>
                    </div>
                    <div>
                        Middle Notes :
                        <span>{mixedResult?.notes.middleNotes}</span>
                    </div>
                    <div>
                        Bottom Notes :
                        <span>{mixedResult?.notes.baseNotes}</span>
                    </div>
                </div>

                <div className="mb-8"> Description for this perfume </div>
                <div className="text-xl text-balance mx-96 mb-10">
                    {mixedResult?.description}
                </div>
            </div>
        </div>
    )
}
