import React from 'react'

interface InputProps {
    name: string
    rating: number
    comment: string
}

export const CommentBox: React.FC<InputProps> = ({ name, rating, comment }) => {
    const generateRatingStars = (rating: number) => {
        const stars = []
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(
                    <svg
                        key={i}
                        className="w-4 h-4 text-hibiscus me-1"
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

    return (
        <div className="font-roboto text-base bg-white border-2 border-lavidbrown rounded-lg px-5 pt-5 pb-10 mx-3 h-44">
            <div className="flex">
                <svg
                    fill="#512940"
                    className="w-10 h-10 text-lavidbrown me-1 rounded"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M85.333 512C85.333 276.358 276.358 85.333 512 85.333c235.639 0 426.667 191.025 426.667 426.667 0 235.639-191.027 426.667-426.667 426.667C276.358 938.667 85.333 747.64 85.333 512zM512 128c-212.077 0-384 171.923-384 384 0 142.135 77.222 266.231 192 332.629V628.62c0-77.474 45.885-144.23 111.962-174.575-38.129-25.737-63.201-69.344-63.201-118.808 0-79.108 64.131-143.238 143.24-143.238s143.236 64.13 143.236 143.238c0 49.463-25.071 93.071-63.202 118.808 66.078 30.345 111.966 97.101 111.966 174.575v216.009c114.778-66.398 192-190.494 192-332.629 0-212.077-171.921-384-384-384zm149.333 737.882V628.621c0-82.475-66.859-149.333-149.333-149.333s-149.333 66.859-149.333 149.333v237.261C408.572 885.278 459.034 896 512 896s103.428-10.722 149.333-30.118zM512 234.667c-55.543 0-100.573 45.027-100.573 100.571S456.457 435.81 512 435.81c55.543 0 100.57-45.028 100.57-100.572S567.544 234.667 512 234.667z"></path>
                </svg>
                <div className="ml-2">
                    <div>{name}</div>
                    <div className="flex">{generateRatingStars(rating)}</div>
                </div>
            </div>

            <div className="mt-5">"{comment}"</div>
        </div>
    )
}
