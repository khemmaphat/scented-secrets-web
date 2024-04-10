import React from 'react'

interface InputProps {
    Name: string
    ImgUrl: string
    isClick: boolean
    onClick: () => void
}

export const NoteCard: React.FC<InputProps> = ({
    Name,
    ImgUrl,
    isClick,
    onClick,
}) => {
    return (
        <button
            className={`font-roboto border-4 border-lavidbrown px-10 py-5 rounded-lg relative ${
                isClick ? 'bg-lavidbrown' : ''
            }`}
            onClick={onClick}
        >
            {isClick && (
                <div className="absolute top-2 right-2 bg-bonjour rounded-md">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/7709/7709965.png"
                        className="size-6"
                    />
                </div>
            )}

            <div className="flex justify-center my-5">
                <img src={ImgUrl} className="size-32 rounded-full" />
            </div>
            <div
                className={`text-center text-2xl ${
                    isClick ? 'text-bonjour' : 'text-lavidbrown'
                }`}
            >
                {Name}
            </div>
        </button>
    )
}
