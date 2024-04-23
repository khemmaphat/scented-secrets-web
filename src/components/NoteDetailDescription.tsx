import React from 'react'

interface SearchProps {
    name: string
    description: string
    imgUrl: string
    showDetail: boolean
    onClose: () => void
}

export const NoteDetailDescription: React.FC<SearchProps> = ({
    name,
    description,
    imgUrl,
    showDetail,
    onClose,
}) => {
    return (
        <div className="font-roboto">
            {showDetail && (
                <div className="relative bg-venus text-white p-5 w-72 rounded-lg">
                    <button
                        className="absolute top-2 right-2 text-white text-xl mx-3"
                        onClick={onClose}
                    >
                        x
                    </button>
                    <div className="flex justify-start items-center mb-3">
                        <img src={imgUrl} className="size-16 rounded-full" />
                        <div className="text-xl ml-5"> {name} </div>
                    </div>
                    <div className="text-base text-balance">{description}</div>
                </div>
            )}
        </div>
    )
}
