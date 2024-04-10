import React from 'react'

interface inputProps {
    Topic: string
    Detail: string
    ImgUrl: string
    onClick: () => void
}

export const AdviceBox: React.FC<inputProps> = ({
    Topic,
    Detail,
    ImgUrl,
    onClick,
}) => {
    return (
        <div className="flex justify-center items-center font-roboto">
            <div className="w-7/12 h-3/5 bg-white rounded-lg border border-lavidbrown border-4 flex justify-center items-center px-10 mt-10">
                <div className="grid grid-cols-2">
                    <div className="flex justify-center items-center">
                        <img src={ImgUrl} alt="Image" className="size-64" />
                    </div>
                    <div className="text-lavidbrown">
                        <div className="text-4xl flex justify-center items-center mt-20">
                            {Topic}
                        </div>
                        <div className="text-2xl text-center text-pretty my-20">
                            {Detail}
                        </div>
                        <div className="flex justify-center items-center mb-20">
                            <button
                                className="text-2xl text-bonjour bg-lavidbrown py-5 px-32 h-16 rounded-xl"
                                onClick={onClick}
                            >
                                Start
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
