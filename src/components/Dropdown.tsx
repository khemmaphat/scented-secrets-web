import React from 'react'

interface DataItem {
    label: string
    value: number
}

interface InputProps {
    value: number
    start: number
    end: number
    disabled: boolean
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const generateArray = (start: number, end: number): DataItem[] => {
    const dataItems: DataItem[] = []

    for (let i = start; i <= end; i++) {
        const label = i < 10 ? `0${i}` : `${i}` // Add leading zero if value < 10
        dataItems.push({
            label,
            value: i,
        })
    }

    return dataItems
}

export const Dropdown: React.FC<InputProps> = ({
    value,
    start,
    end,
    disabled,
    onChange,
}) => {
    const dataItems = generateArray(start, end)

    return (
        <div className="mr-6">
            <select
                className="text-base text-venus rounded-lg bg-bonjour border-b border-venus w-full p-2"
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                {dataItems.map((dataItem) => (
                    <option key={dataItem.value} value={dataItem.value}>
                        {dataItem.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
