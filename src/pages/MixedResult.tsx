//import React from 'react'

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PerfumeService, PerfumeServiceArray } from '../service/perfume_service'
import {
    PerfumeMixedResult,
    SearchRequest,
    SearchResponse,
} from '../interfaces/perfume_interface'
import { MySlider } from '../components/MySlider'
import { PerfumeCard } from '../components/PerfumeCard'

export const MixedResult = () => {
    const location = useLocation()
    const answered = location.state.answered
    const answeredString = answered.join(',')

    const [mixedResult, setMixedResult] = useState<PerfumeMixedResult>()

    const perfumeService = new PerfumeService()
    const perfumeServiceArray = new PerfumeServiceArray()

    const [perfumeSearch] = useState<SearchRequest>({
        Search: '',
        PageNum: 1,
        PageSize: 13,
        CosineValue: 1,
    })
    const [perfumeSearchData, setPerfumeSearchData] =
        useState<SearchResponse[]>()

    useEffect(() => {
        perfumeService
            .getResultMixedPerfume(answeredString)
            .then((response) => {
                setMixedResult(response.data)
            })
            .catch((error) => {
                console.error('Error search fetching data:', error)
            })

        perfumeServiceArray
            .getSearchPerfumeData(perfumeSearch)
            .then((response) => {
                setPerfumeSearchData(response.data)
            })
            .catch((error) => {
                console.error('Error search fetching data in slider:', error)
            })
    }, [])

    return (
        <div className="flex justify-center">
            <div className="container font-roboto text-lavidbrown text-center text-3xl">
                <div className="mb-8">Perfumes you can mix</div>
                <div className="mb-8 flex justify-center">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/scented-secrets-1958e.appspot.com/o/perfume-spray.png?alt=media&token=0f71ca89-f65a-4b60-93ac-fd04ccf7d451"
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
                <div className="mx-10 mb-10">
                    <MySlider total={perfumeSearchData?.length || 0}>
                        {perfumeSearchData?.slice(1).map((perfume, index) => (
                            <div className="flex justify-center" key={index}>
                                <PerfumeCard
                                    PerfumeId={perfume.perfumeId}
                                    Name={perfume.name}
                                    Brand={perfume.brand}
                                    ImgUrl={perfume.imgUrl}
                                />
                            </div>
                        ))}
                    </MySlider>
                </div>
            </div>
        </div>
    )
}
