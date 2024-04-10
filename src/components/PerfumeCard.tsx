import React from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchProps {
    PerfumeId: string
    Name: string
    Brand: string
    ImgUrl: string
}

export const PerfumeCard: React.FC<SearchProps> = ({
    PerfumeId,
    Name,
    Brand,
    ImgUrl,
}) => {
    const nevigate = useNavigate()

    return (
        <div className="bg-white text-base text-lavidbrown w-full h-80 rounded-lg relative">
            <img src={ImgUrl} className="h-40 mx-auto mt-5 rounded-lg" />
            <div className="ml-5 mt-5">
                <div className="mb-1">{Brand}</div>
                <div>{Name}</div>
            </div>
            <button
                className="absolute right-5 bottom-6 px-5 py-0.5 bg-lavidbrown text-bonjour rounded-lg"
                onClick={() =>
                    nevigate('/perfumedetail', { state: { Id: PerfumeId } })
                }
            >
                detail
            </button>
        </div>
    )
}
