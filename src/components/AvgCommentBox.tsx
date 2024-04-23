import React from 'react'

interface InputProps {
    AvgRating: number
    LikeRating: number
    OkRating: number
    DislikeRating: number
}

export const AvgCommentBox: React.FC<InputProps> = ({
    AvgRating,
    LikeRating,
    OkRating,
    DislikeRating,
}) => {
    const generateRatingStars = (rating: number) => {
        const stars = []
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(
                    <svg
                        key={i}
                        className="w-4 h-4 text-bonjour me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                )
            } else {
                stars.push(
                    <svg
                        key={i}
                        className="w-4 h-4 text-gray-400 me-1 rounded"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                )
            }
        }
        return stars
    }

    const likePer = (LikeRating * 100).toFixed(0)
    const okPer = (OkRating * 100).toFixed(0)
    const dislikePer = (DislikeRating * 100).toFixed(0)

    return (
        <div className="font-roboto bg-lavidbrown text-bonjour flex items-center p-10 m-12">
            <div>
                <div>
                    <div className="text-xl">Average Rating</div>
                </div>
                <div className="flex items-center">
                    <div className="text-3xl">{AvgRating.toFixed(2)}</div>
                    <div className="ml-4">
                        <div className="flex">
                            {generateRatingStars(AvgRating)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="ml-16">
                <div className="text-xl">Do you like the smell?</div>
                <div className="flex items-center">
                    <span className="text-base w-16">Like</span>
                    <div className="w-56 h-1.5 bg-gray-400 rounded-full">
                        <div
                            style={{ width: `${likePer}%` }}
                            className="h-1.5 bg-bonjour rounded-full"
                        ></div>
                    </div>
                    <span className="ml-5">{likePer}%</span>
                </div>
                <div className="flex items-center">
                    <span className="text-base w-16">Ok</span>
                    <div className="w-56 h-1.5 bg-gray-400 rounded-full">
                        <div
                            style={{ width: `${okPer}%` }}
                            className="h-1.5 bg-bonjour rounded-full"
                        ></div>
                    </div>
                    <span className="ml-5">{okPer}%</span>
                </div>
                <div className="flex items-center">
                    <span className="text-base w-16">Dislike</span>
                    <div className="w-56 h-1.5 bg-gray-400 rounded-full">
                        <div
                            style={{ width: `${dislikePer}%` }}
                            className="h-1.5 bg-bonjour rounded-full"
                        ></div>
                    </div>
                    <span className="ml-5">{dislikePer}%</span>
                </div>
            </div>
        </div>
    )
}
