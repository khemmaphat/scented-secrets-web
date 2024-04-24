//import React from 'react'
import { useEffect, useState } from 'react'
import { PerfumeCard } from '../components/PerfumeCard'
import { Search } from '../components/Search'
import { SearchRequest, SearchResponse } from '../interfaces/perfume_interface'
import { PerfumeServiceArray } from '../service/perfume_service'
import { useUtil } from '../utils/useUtil'
import { TableButton } from '../components/TableButton'
import { useNavigate } from 'react-router-dom'

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
    const [totalPerfume, setTotalPerfume] = useState(0)

    const onSearch = () => {
        perfumeApiArray
            .getSearchPerfumeData(searchRequest)
            .then((response) => {
                setSearchResponse(response.data)
                setTotalPerfume(response.total || 0)
            })
            .catch((error) => {
                console.error('Error fetching perfume search data:', error)
            })
    }

    useEffect(() => {
        onSearch()
    }, [searchRequest])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchRequest({
                ...searchRequest,
                Search: searchTemp,
            })
        }
    }

    const handleSearchType = (type: string) => {
        if (type == 'Top Perfume') {
            setSearchRequest({
                ...searchRequest,
                Search: '',
                SearchType: '',
                SearchGroup: '',
                CosineValue: 10.1,
                PageSize: 16,
                PageNum: 1,
                Gender: '',
            })
            setSearchTable(false)
        } else if (type == 'forHer') {
            setSearchRequest({
                ...searchRequest,
                Search: '',
                SearchType: 'Gender',
                SearchGroup: '',
                CosineValue: 10.1,
                PageSize: 16,
                PageNum: 1,
                Gender: 'Female',
            })
            setSearchTable(false)
        } else if (type == 'forMen') {
            setSearchRequest({
                ...searchRequest,
                Search: '',
                SearchType: 'Gender',
                SearchGroup: '',
                CosineValue: 10.1,
                PageSize: 16,
                PageNum: 1,
                Gender: 'Male',
            })
            setSearchTable(false)
        } else if (type == 'Name') {
            setSearchRequest({
                ...searchRequest,
                Search: '',
                SearchType: 'Name',
                SearchGroup: '',
                CosineValue: 10.1,
                PageSize: 16,
                PageNum: 1,
                Gender: '',
            })
            setSearchTable(true)
            setTableType('Name')
            setCurrentCharacterSearch('#')
        } else if (type == 'Brand') {
            setSearchRequest({
                ...searchRequest,
                Search: '',
                SearchType: 'Brand',
                SearchGroup: '',
                CosineValue: 10.1,
                PageSize: 16,
                PageNum: 1,
                Gender: '',
            })
            setSearchTable(true)
            setTableType('Brand')
            setCurrentCharacterSearch('#')
        }
    }

    const characters = useUtil.genEnglishCharacterArray()

    const generatePagination = (total: number) => {
        const pagination = []

        for (let i = 0; i < total / 16; i++) {
            pagination.push(
                <button
                    key={i}
                    className="bg-white py-3 px-5 rounded-lg"
                    onClick={() =>
                        setSearchRequest({
                            ...searchRequest,
                            PageNum: i + 1,
                        })
                    }
                >
                    {i + 1}
                </button>
            )
        }
        return pagination
    }

    const [searchTemp, setSearchTemp] = useState('')
    const [currentCharacterSearch, setCurrentCharacterSearch] = useState('#')
    const nevigate = useNavigate()

    return (
        <div className="bg-bonjour grid grid-rows-1 grid-cols-6">
            <div className="col-start-2 col-span-4">
                <Search
                    onSearchValue={(e) => setSearchTemp(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onSearchGroupTopPerfume={() =>
                        handleSearchType('Top Perfume')
                    }
                    onSearchGroupForHer={() => handleSearchType('forHer')}
                    onSearchGroupForMen={() => handleSearchType('forMen')}
                    onSearchGroupBrand={() => handleSearchType('Brand')}
                    onSearchGroupName={() => handleSearchType('Name')}
                    SearchGroupLabel={searchRequest.SearchGroup || ''}
                />
            </div>
            <div className="text-lavidbrown col-start-1 col-span-6 py-10">
                {totalPerfume == 0 ? (
                    <div className="flex justify-center items-center">
                        <div className="text-center">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/scented-secrets-1958e.appspot.com/o/searchnotfound.png?alt=media&token=30266aae-bade-44a6-86d8-7eadaee9b427"
                                className="size-64"
                            />
                            <div className="text-3xl">No Result Found </div>
                            <div className="my-6">
                                <div className="text-xl">
                                    We can't fine any item matching
                                </div>
                                <div className="text-xl">your search</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {searchTable ? (
                            tableType === 'Name' ? (
                                <div className="mx-36">
                                    <div className="flex justify-center text-4xl mb-10">
                                        Name
                                    </div>
                                    <div className="grid grid-cols-10 mb-10">
                                        <TableButton
                                            label="#"
                                            isClicked={
                                                currentCharacterSearch == '#'
                                            }
                                            onClick={() => {
                                                setSearchRequest({
                                                    ...searchRequest,
                                                    Search: '',
                                                })

                                                setCurrentCharacterSearch('#')
                                            }}
                                        />
                                        {characters.map((character, index) => (
                                            <TableButton
                                                key={index}
                                                label={character}
                                                isClicked={
                                                    character ==
                                                    currentCharacterSearch
                                                }
                                                onClick={() => {
                                                    setSearchRequest({
                                                        ...searchRequest,
                                                        Search: character,
                                                    })

                                                    setCurrentCharacterSearch(
                                                        character
                                                    )
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="border border-lavidbrown rounded">
                                        <div className="text-bonjour text-xl bg-lavidbrown h-10 pt-2">
                                            <div className="ml-5">
                                                {searchRequest.Search}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4">
                                            {searchResponse?.map(
                                                (perfume, index) => (
                                                    <button
                                                        key={index}
                                                        className="text-base text-left ml-5 my-2"
                                                        onClick={() =>
                                                            nevigate(
                                                                `/perfumedetail-${perfume.perfumeId}`,
                                                                {
                                                                    state: {
                                                                        Id: perfume.perfumeId,
                                                                    },
                                                                }
                                                            )
                                                        }
                                                    >
                                                        {perfume.name}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mx-36">
                                    <div className="flex justify-center text-4xl mb-10">
                                        Brand
                                    </div>
                                    <div className="grid grid-cols-10 mb-10">
                                        <TableButton
                                            label="#"
                                            isClicked={
                                                currentCharacterSearch == '#'
                                            }
                                            onClick={() => {
                                                setSearchRequest({
                                                    ...searchRequest,
                                                    Search: '',
                                                })

                                                setCurrentCharacterSearch('#')
                                            }}
                                        />
                                        {characters.map((character, index) => (
                                            <TableButton
                                                key={index}
                                                label={character}
                                                isClicked={
                                                    character ==
                                                    currentCharacterSearch
                                                }
                                                onClick={() => {
                                                    setSearchRequest({
                                                        ...searchRequest,
                                                        Search: character,
                                                    })

                                                    setCurrentCharacterSearch(
                                                        character
                                                    )
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="border border-lavidbrown rounded">
                                        <div className="text-bonjour text-xl bg-lavidbrown h-10 pt-2">
                                            <div className="ml-5">
                                                {searchRequest.Search}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4">
                                            {searchResponse?.map(
                                                (perfume, index) => (
                                                    <button
                                                        key={index}
                                                        className="text-base text-left ml-5"
                                                        onClick={() => {
                                                            setSearchRequest({
                                                                ...searchRequest,
                                                                SearchGroup:
                                                                    perfume.brand,
                                                                SearchType:
                                                                    'Group',
                                                            })
                                                            setSearchTable(
                                                                false
                                                            )
                                                        }}
                                                    >
                                                        {perfume.brand}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div>
                                <div className="grid gap-x-5 gap-y-10 grid-cols-4 mx-52">
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
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="col-start-2 col-span-4 flex justify-center space-x-3 text-2xl mt-10">
                {generatePagination(totalPerfume)}
            </div>
        </div>
    )
}
