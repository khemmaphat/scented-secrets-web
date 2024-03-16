import React from 'react'

interface PopupProps {
    showPopup: boolean
    onClose: () => void
    children: React.ReactNode
}

export const ProfilePopup: React.FC<PopupProps> = ({
    showPopup,
    onClose,
    children,
}) => {
    return (
        // backdrop
        <div
            onClick={onClose}
            className={`
        fixed z-40 inset-0 top-0 right-0  flex justify-end
        ${showPopup ? 'visible bg-black/20' : 'invisible'}
      `}
        >
            <div
                className="bg-bonjour rounded-lg h-56 mt-20 mr-10"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}
