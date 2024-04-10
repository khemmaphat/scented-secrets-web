import React from 'react'

interface SearchProps {
    onSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onSearchGroupTopPerfume?: () => void
    onSearchGroupForMen?: () => void
    onSearchGroupForHer?: () => void
    onSearchGroupBrand?: () => void
    onSearchGroupName: () => void
}

export const Search: React.FC<SearchProps> = ({
    onSearchValue,
    onKeyDown,
    onSearchGroupTopPerfume,
    onSearchGroupForMen,
    onSearchGroupForHer,
    onSearchGroupBrand,
    onSearchGroupName,
}) => {
    return (
        <div className="w-full mt-16">
            <div className="absolute p-4">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/10385/10385257.png"
                    className="w-8 h-8"
                    alt="Search Icon"
                />
            </div>
            <input
                type="search"
                id="search"
                className="w-full px-16 py-5 rounded-lg border-2 border-venus"
                placeholder="Search for the name of the perfume you want..."
                onChange={onSearchValue}
                onKeyDown={onKeyDown}
            />
            <div className="font-roboto flex justify-between my-10">
                <button className="ml-20" onClick={onSearchGroupTopPerfume}>
                    Top perfumes
                </button>
                <button onClick={onSearchGroupForHer}>For Her</button>
                <button onClick={onSearchGroupForMen}>For Men</button>
                <button onClick={onSearchGroupName}>Name</button>
                <button className="mr-20" onClick={onSearchGroupBrand}>
                    Brand
                </button>
            </div>
        </div>
    )
}
