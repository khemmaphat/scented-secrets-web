import React, { useState } from 'react'
import { TableButton } from './TableButton'

interface inputProps {
    labels: string[]
}

export const TableButtonContainer: React.FC<inputProps> = ({ labels }) => {
    const [selectedButton, setSelectedButton] = useState<number | null>(null)

    const handleButtonClick = (index: number | null) => {
        setSelectedButton(index)
    }

    return (
        <div className="grid grid-cols-10 mb-16">
            <TableButton
                label="#"
                isClicked={selectedButton === null}
                onClick={() => handleButtonClick(null)}
            />
            {labels?.map((label, index) => (
                <TableButton
                    key={index}
                    label={label}
                    isClicked={selectedButton === index}
                    onClick={() => handleButtonClick(index)}
                />
            ))}
        </div>
    )
}
