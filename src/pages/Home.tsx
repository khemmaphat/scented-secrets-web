//import React from 'react'
import { useEffect, useState } from 'react'
import { PerfumeCard } from '../components/PerfumeCard'
import { Search } from '../components/Search'
import { SearchRequest, SearchResponse } from '../interfaces/perfume_interface'
import { PerfumeServiceArray } from '../service/perfume_service'
import { useUtil } from '../utils/useUtil'
import { TableButtonContainer } from '../components/TableButtonContainer'

export const Home = () => {
    const [searchTable, setSearchTable] = useState(false)
    const [tableType, setTableType] = useState('')
    const [searchRequest, setSearchRequest] = useState<SearchRequest>({
        Search: '',
        SearchType: '',
        SearchGroup: '',
        CosineValue: 10.1,
        PageSize: 16,
        PageNum: 1,
        Gender: '',
    })
    const [searchResponse, setSearchResponse] = useState<SearchResponse[]>()
    const perfumeApiArray = new PerfumeServiceArray()

    const onSearch = () => {
        perfumeApiArray
            .getSearchPerfumeData(searchRequest)
            .then((response) => {
                setSearchResponse(response.data)
                console.log(searchResponse)
            })
            .catch((error) => {
                console.error('Error fetching perfume search data:', error)
            })
    }

    useEffect(() => {
        onSearch()
    }, [])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch()
        }
    }

    const handleSearchType = (type: string) => {
        if (type == 'Top Perfume') {
            setSearchRequest({
                ...searchRequest,
                SearchType: '',
                PageNum: 1,
                PageSize: 16,
            })
            setSearchTable(false)
        } else if (type == 'forHer') {
            setSearchRequest({
                ...searchRequest,
                SearchType: 'Gender',
                Gender: 'Female',
                PageNum: 1,
                PageSize: 16,
            })
            setSearchTable(false)
        } else if (type == 'forMen') {
            setSearchRequest({
                ...searchRequest,
                SearchType: 'Gender',
                Gender: 'Male',
                PageNum: 1,
                PageSize: 16,
            })
            setSearchTable(false)
        } else if (type == 'Name') {
            setSearchRequest({
                ...searchRequest,
                SearchType: 'Name',
                PageNum: 1,
                PageSize: 48,
            })
            setSearchTable(true)
            setTableType('Name')
        } else if (type == 'Brand') {
            setSearchRequest({
                ...searchRequest,
                SearchType: 'Brand',
                PageNum: 1,
                PageSize: 48,
            })
            setSearchTable(true)
            setTableType('Brand')
        }
    }

    const characters = useUtil.genEnglishCharacterArray()

    return (
        <div className="bg-bonjour grid grid-rows-1 grid-cols-6">
            <div className="col-start-2 col-span-4">
                <Search
                    onSearchValue={(e) =>
                        setSearchRequest({
                            ...searchRequest,
                            Search: e.target.value,
                        })
                    }
                    onKeyDown={handleKeyDown}
                    onSearchGroupTopPerfume={() =>
                        handleSearchType('Top Perfume')
                    }
                    onSearchGroupForHer={() => handleSearchType('forHer')}
                    onSearchGroupForMen={() => handleSearchType('forMen')}
                    onSearchGroupBrand={() => handleSearchType('Brand')}
                    onSearchGroupName={() => handleSearchType('Name')}
                />
            </div>
            <div className="text-lavidbrown col-start-1 col-span-6">
                {searchTable ? (
                    tableType === 'Name' ? (
                        <div className="mx-36">
                            <div className="flex justify-center text-4xl mb-10">
                                Name
                            </div>
                            <TableButtonContainer labels={characters} />
                            <div className="border border-lavidbrown rounded">
                                <div className="text-bonjour text-xl bg-lavidbrown h-10">
                                    {searchRequest.Search}
                                </div>
                                <div className="grid grid-cols-4">
                                    {searchResponse?.map((purfume, index) => (
                                        <div
                                            className="text-base ml-5 my-2"
                                            key={index}
                                        >
                                            {purfume.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mx-36">
                            <div className="flex justify-center text-4xl mb-10">
                                Brand
                            </div>
                            <TableButtonContainer labels={characters} />
                            <div className="border border-lavidbrown rounded">
                                <div className="text-bonjour text-xl bg-lavidbrown h-10">
                                    {searchRequest.Search}
                                </div>
                                <div className="grid grid-cols-4">
                                    {searchResponse?.map((purfume, index) => (
                                        <div
                                            className="text-base ml-5"
                                            key={index}
                                        >
                                            {purfume.brand}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="grid gap-x-5 gap-y-10 grid-rows-4 grid-cols-4 mx-52">
                        {searchResponse?.map((perfume, index) => (
                            <PerfumeCard
                                key={index}
                                PerfumeId={perfume.perfumeId}
                                Name={perfume.name}
                                Brand={perfume.brand}
                                ImgUrl={perfume.imgUrl}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="col-start-2 col-span-4 flex justify-center space-x-3 text-2xl mt-10">
                <button className="bg-white py-3 px-5 rounded-lg"> 1 </button>
            </div>
        </div>
    )
}
