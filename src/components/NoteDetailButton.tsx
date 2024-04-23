import React from 'react'

interface SearchProps {
    imgUrl: string
    showDetail: boolean
    onClick: () => void
}

export const NoteDetailButton: React.FC<SearchProps> = ({
    imgUrl,
    showDetail,
    onClick,
}) => {
    return (
        <div className="font-roboto">
            <button onClick={onClick}>
                <img
                    src={imgUrl}
                    className={`${
                        showDetail ? `size-20` : `size-16`
                    } border-2 border-lavidbrown`}
                />
            </button>
        </div>
    )
}
