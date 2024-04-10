import React, { useEffect, useState } from 'react'
import { QuestionResponse } from '../interfaces/question_interface'
import { useNavigate } from 'react-router-dom'
import { Popup } from './Popup'

interface InputProps {
    Questions: QuestionResponse[] | undefined
}

export const Questions: React.FC<InputProps> = ({ Questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedChoice, setSelectedChoice] = useState('')
    const [answered, setAnswered] = useState<{ [key: number]: string }>({})
    const [openSubmitPopup, setOpenSubmitPopup] = useState(false)
    const nevigate = useNavigate()

    const handleChoiceClicked = (choice: string) => {
        setSelectedChoice(choice)
    }
    const handleNextClicked = () => {
        if (Questions && currentQuestion === (Questions?.length ?? 0) - 1) {
            setOpenSubmitPopup(true)
        } else {
            setCurrentQuestion(currentQuestion + 1)
        }
    }
    const handleSubmitButton = () => {
        nevigate('/result')
    }

    useEffect(() => {
        setAnswered({ ...answered, [currentQuestion]: selectedChoice })
    }, [selectedChoice])

    return (
        <div className="font-roboto text-lavidbrown flex justify-center">
            <div className="container max-w-3xl">
                <div className="text-4xl text-center mb-8">
                    Find the right for you
                </div>
                <div className="relative">
                    {Questions?.map((question, index) => (
                        <div
                            key={index}
                            className={`absolute ${
                                currentQuestion === index ? '' : 'hidden'
                            } w-full`}
                        >
                            <div className="text-3xl text-center bg-white mx-20 py-10 rounded-lg">
                                {question.name}
                            </div>
                            <div className="flex justify-center mt-3 mb-12">
                                <div className="text-venus text-xl">{`(${
                                    currentQuestion + 1
                                } / ${Questions.length})`}</div>
                            </div>

                            <div className="grid grid-rows-5 gap-y-3 mb-16">
                                {question.choice ? (
                                    question.choice.map(
                                        (choice, choiceIndex) => (
                                            <button
                                                key={choiceIndex}
                                                className={`bg-white text-2xl text-left pl-3 py-2 rounded-lg ${
                                                    answered[
                                                        currentQuestion
                                                    ] === choice
                                                        ? 'border-2 border-lavidbrown'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    handleChoiceClicked(choice)
                                                }
                                            >
                                                {choice}
                                            </button>
                                        )
                                    )
                                ) : (
                                    <input
                                        type="text"
                                        className="bg-white py-5 rounded-lg pl-5"
                                    />
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-x-3">
                                <button
                                    onClick={() =>
                                        setCurrentQuestion(currentQuestion - 1)
                                    }
                                    className="bg-lavidbrown text-bonjour text-xl py-3 rounded-lg"
                                    disabled={currentQuestion === 0}
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => handleNextClicked()}
                                    className={`text-bonjour text-xl py-3 rounded-lg ${
                                        currentQuestion === Questions.length - 1
                                            ? 'bg-hibiscus'
                                            : 'bg-lavidbrown'
                                    }`}
                                >
                                    {currentQuestion === Questions.length - 1
                                        ? `Submit`
                                        : `Next`}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Popup
                showPopup={openSubmitPopup}
                onClose={() => setOpenSubmitPopup(false)}
            >
                <div className="text-center px-10 py-24">
                    <div className="text-3xl w-96 mb-24">
                        Are you sure you want to predict perfume?
                    </div>
                    <div className="grid grid-rows-2 gap-y-4 text-2xl text-bonjour">
                        <button
                            className="bg-lavidbrown rounded-xl py-4"
                            onClick={() => handleSubmitButton()}
                        >
                            Confirm
                        </button>
                        <button
                            className="bg-venus rounded-xl py-4"
                            onClick={() => setOpenSubmitPopup(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Popup>
        </div>
    )
}
