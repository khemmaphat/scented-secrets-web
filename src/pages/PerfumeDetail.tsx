import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PerfumeService, PerfumeServiceArray } from '../service/perfume_service'
import {
    PerfumeDataDetail,
    SearchRequest,
    SearchResponse,
} from '../interfaces/perfume_interface'
import { PerfumeCard } from '../components/PerfumeCard'

export const PerfumeDetail = () => {
    const location = useLocation()
    const perfumeId = location.state?.Id || 'No ID provided'

    const perfumeService = new PerfumeService()
    const perfumeServiceArray = new PerfumeServiceArray()

    const [perfumeDetail, setPerfumeDetail] = useState<PerfumeDataDetail>()
    const [perfumeSearch, setPerfumeSearch] = useState<SearchRequest>({
        Search: '',
        PageNum: 1,
        PageSize: 15,
        CosineValue: perfumeDetail?.cosineValue,
    })
    const [perfumeSearchData, setPerfumeSearchData] =
        useState<SearchResponse[]>()

    useEffect(() => {
        perfumeService
            .getPerfumeDetail(perfumeId)
            .then((response) => {
                setPerfumeDetail(response.data)
            })
            .catch((error) => {
                console.error('Error fetching perfume detail data:', error)
            })

        perfumeServiceArray
            .getSearchPerfumeData(perfumeSearch)
            .then((response) => {
                setPerfumeSearchData(response.data)
            })
            .catch((error) => {
                console.error('Error search fetching data:', error)
            })
    }, [])
    return (
        <div className="text-lavidbrown bg-bonjour p-10">
            <div className="grid grid-cols-3">
                <div className="h-80 mx-auto">
                    <img src={perfumeDetail?.imgUrl} className="h-full"></img>
                </div>
                <div className="col-start-2 col-span-2">
                    <span className="mr-2 text-3xl font-semibold">
                        {perfumeDetail?.brand}
                    </span>
                    <span className="text-3xl font-semibold">
                        {perfumeDetail?.name}
                    </span>
                    <div className="max-60">
                        <div>Top Notes</div>
                        <div>{perfumeDetail?.notes.topNotes}</div>
                        <div>Middle Notes</div>
                        <div>{perfumeDetail?.notes.middleNotes}</div>
                        <div>Base Notes</div>
                        <div>{perfumeDetail?.notes.baseNotes}</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="text-3xl">PerfumeType</div>
                <div className="mb-5"> {perfumeDetail?.perfumeType}</div>
            </div>
            <div>
                <div className="text-3xl">Details</div>
                <div className="mb-5"> {perfumeDetail?.description}</div>
            </div>
            <div>
                <div className="text-3xl">PerfumeType</div>
                <div className="mb-5"> {perfumeDetail?.howTo}</div>
            </div>
            <div>Test</div>
            <div>
                <div className="text-3xl">Other Perfumes</div>
                <div className="grid grid-cols-5 gap-x-5">
                    {perfumeSearchData?.map((perfume) => (
                        <PerfumeCard
                            PerfumeId={perfume.perfumeId}
                            Name={perfume.name}
                            Brand={perfume.brand}
                            ImgUrl={perfume.imgUrl}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
