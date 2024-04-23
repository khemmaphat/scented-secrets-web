import React from 'react'

interface SearchProps {
    onSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onSearchGroupTopPerfume?: () => void
    onSearchGroupForMen?: () => void
    onSearchGroupForHer?: () => void
    onSearchGroupBrand?: () => void
    onSearchGroupName: () => void
    SearchGroupLabel: string
}

export const Search: React.FC<SearchProps> = ({
    onSearchValue,
    onKeyDown,
    onSearchGroupTopPerfume,
    onSearchGroupForMen,
    onSearchGroupForHer,
    onSearchGroupBrand,
    onSearchGroupName,
    SearchGroupLabel,
}) => {
    return (
        <div className="font-roboto w-full mt-16">
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
            {SearchGroupLabel != '' && (
                <div className="text-4xl text-lavidbrown text-center mt-10">
                    {SearchGroupLabel}
                </div>
            )}

            <div className="grid grid-cols-5 my-10 text-lavidbrown">
                <button className="" onClick={onSearchGroupTopPerfume}>
                    Top perfumes
                </button>
                <button onClick={onSearchGroupForHer}>For Her</button>
                <button onClick={onSearchGroupForMen}>For Men</button>
                <button onClick={onSearchGroupName}>Name</button>
                <button className="" onClick={onSearchGroupBrand}>
                    Brand
                </button>
            </div>
        </div>
    )
}
