import React from 'react'

export const Search: React.FC = () => {
    return (
        <div className="relative w-4/6 mt-16">
            <div className="absolute p-4">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/10385/10385257.png"
                    className="w-8 h-8"
                />
            </div>
            <input
                type="search"
                id="defualt-search"
                className="w-full px-16 py-5 rounded-lg border-2 border-venus"
                placeholder="Search for the name of the perfume you want..."
            />
            <div className="font-roboto flex justify-between my-10">
                <button className="ml-20">Top perfumes</button>
                <button>For her</button>
                <button>For Men</button>
                <button className="mr-20">Brand / Name</button>
            </div>
        </div>
    )
}
