import React, { useState } from 'react'
import { GroupNote } from '../interfaces/perfume_interface'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { NoteCard } from './NoteCard'
import { Popup } from './Popup'
import { useNavigate } from 'react-router-dom'
import { MySlider } from './MySlider'

interface InputProps {
    GroupNotes: GroupNote[] | undefined
}

export const GroupNoteCard: React.FC<InputProps> = ({ GroupNotes }) => {
    const [group, setGroup] = useState('')
    const [openSubmitPopup, setOpenSubmitPopup] = useState(false)
    const nevigate = useNavigate()

    const [answered, setAnswered] = useState<string[]>([])

    const handleSubmitButton = () => {
        nevigate('/mixedresult', { state: { answered } })
    }

    const handleNoteClick = (name: string) => {
        if (answered.includes(name)) {
            const updatedAnswered = answered.filter((item) => item !== name)
            setAnswered(updatedAnswered)
        } else {
            setAnswered([...answered, name])
        }
    }

    return (
        <div className="font-roboto">
            <div className="flex justify-center">
                <div className="text-3xl my-8 text-center">
                    Choosing your favorite scent
                    {group != '' ? (
                        <div className="text-3xl">
                            (You can choose more than 1 scent)
                        </div>
                    ) : null}
                </div>
            </div>
            {group == '' ? (
                <div className="m-32">
                    <MySlider total={GroupNotes?.length || 0}>
                        {GroupNotes?.map((GroupNote, index) => (
                            <div className="px-5">
                                <button
                                    key={index}
                                    className="bg-bonjour border-4 border-lavidbrown rounded-lg px-5 py-8 w-full h-72"
                                    onClick={() => setGroup(GroupNote.name)}
                                >
                                    <div className="flex justify-center mb-4">
                                        <img
                                            src={GroupNote.imgGroupUrl}
                                            className="size-32"
                                        />
                                    </div>
                                    <div className="text-2xl">
                                        {GroupNote.name}
                                    </div>
                                </button>
                            </div>
                        ))}
                    </MySlider>
                </div>
            ) : (
                <div>
                    {GroupNotes?.map((GroupNote, index) => (
                        <div
                            key={index}
                            className={`grid grid-rows-2 grid-cols-4 gap-x-5 gap-y-6 mx-60 ${
                                group == GroupNote.name ? '' : 'hidden'
                            }`}
                        >
                            {GroupNote.notes?.map((note, index) => (
                                <NoteCard
                                    key={index}
                                    Name={note.name}
                                    ImgUrl={note.imgUrl}
                                    isClick={answered.includes(note.name)}
                                    onClick={() => handleNoteClick(note.name)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {group == '' ? null : (
                <div className="flex justify-center text-2xl text-bonjour">
                    <button
                        className="bg-lavidbrown rounded-lg px-40 py-3 mx-2 my-16"
                        onClick={() => setGroup('')}
                    >
                        Back
                    </button>
                    <button
                        onClick={() => setOpenSubmitPopup(true)}
                        className="bg-hibiscus rounded-lg px-40 py-3 mx-2 my-16"
                    >
                        Submit
                    </button>
                    <button className="bg-lavidbrown rounded-lg px-40 py-3 mx-2 my-16">
                        Next
                    </button>
                </div>
            )}

            <Popup
                showPopup={openSubmitPopup}
                onClose={() => setOpenSubmitPopup(false)}
            >
                <div className="text-center px-10 py-24">
                    <div className="text-3xl w-96 mb-24">
                        Are you sure you want to mix perfume?
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
