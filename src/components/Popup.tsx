import React from 'react'

interface PopupProps {
    showPopup: boolean
    onClose: () => void
    children: React.ReactNode
}

export const Popup: React.FC<PopupProps> = ({
    showPopup,
    onClose,
    children,
}) => {
    return (
        // backdrop
        <div
            onClick={onClose}
            className={`
        fixed inset-0 flex justify-center items-center z-40
        ${showPopup ? 'visible bg-black/50' : 'invisible'}
      `}
        >
            <div
                className="bg-bonjour rounded-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}
