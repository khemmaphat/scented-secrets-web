import React, { useRef, useState } from 'react'
import Slider, { Settings } from 'react-slick'

interface MySliderProps {
    children: React.ReactNode
    total: number
}

export const MySlider: React.FC<MySliderProps> = ({ children, total }) => {
    const slider = useRef<Slider>(null)

    const settings: Settings = {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        arrows: false,
    }

    const [currentSlide, setCurrentSlide] = useState(1)

    return (
        <div className="relative">
            <div className="mx-10">
                <Slider ref={slider} {...settings}>
                    {children}
                </Slider>
            </div>

            <button
                className={`absolute top-1/2 left-2 transform -translate-y-1/2 ${
                    currentSlide == 1 ? 'hidden' : ''
                } `}
                onClick={() => {
                    slider.current?.slickPrev()
                    setCurrentSlide(currentSlide - 1)
                }}
            >
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/scented-secrets-1958e.appspot.com/o/arrow.png?alt=media&token=8ef17faf-124e-4e51-bdf3-5daaebf84d32"
                    className="size-16 transform scale-x-[-1]"
                />
            </button>
            <button
                className={`absolute top-1/2 right-2 transform -translate-y-1/2 ${
                    currentSlide === parseInt((total / 4).toFixed(2))
                        ? 'hidden'
                        : ''
                }`}
                onClick={() => {
                    slider.current?.slickNext()
                    setCurrentSlide(currentSlide + 1)
                }}
            >
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/scented-secrets-1958e.appspot.com/o/arrow.png?alt=media&token=8ef17faf-124e-4e51-bdf3-5daaebf84d32"
                    className="size-16"
                />
            </button>
        </div>
    )
}
