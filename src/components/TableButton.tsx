import React from 'react'

interface InputProps {
    label: string
    isClicked: boolean
    onClick: () => void
}

export const TableButton: React.FC<InputProps> = ({
    label,
    isClicked,
    onClick,
}) => {
    return (
        <div
            className={`text-base flex justify-center rounded-lg py-2 ${
                isClicked ? 'bg-lavidbrown text-bonjour' : ''
            }`}
        >
            <button className="w-full h-8" onClick={onClick}>
                {label}
            </button>
        </div>
    )
}
