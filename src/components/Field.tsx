import React from 'react'

interface FieldProps {
    label: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Field: React.FC<FieldProps> = ({
    label,
    type,
    value,
    onChange,
}) => {
    return (
        <div>
            <div className="text-sm">{label}</div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="text-sm rounded-lg bg-white border border-venus py-3 px-2 w-full mb-4"
                placeholder={`${label}...`}
            />
        </div>
    )
}
