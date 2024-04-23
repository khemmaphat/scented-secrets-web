import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { QuestionService } from '../service/question_service'
import { QuestionResultResponse } from '../interfaces/question_interface'

export const QuestionResult = () => {
    const location = useLocation()
    const answered = location.state.answered

    function connectObjectValue(obj: { [key: number]: string }): string {
        const values = []
        for (const key in obj) {
            values.push(obj[key])
        }
        return values.join(',')
    }

    const [perfumeResultDetail, setPerfumeResultDetail] =
        useState<QuestionResultResponse>()

    const questionService = new QuestionService()
    useEffect(() => {
        questionService
            .getResultQuestion(connectObjectValue(answered))
            .then((resposne) => {
                setPerfumeResultDetail(resposne.data)
            })
            .catch((error) => {
                console.error('Error fetching perfume detail data:', error)
            })
    }, [])

    const nevigate = useNavigate()
    return (
        <div className="flex justify-center">
            <div className="container font-roboto text-lavidbrown text-center text-3xl">
                <div className="mb-8">You suit the smell</div>
                <div className="mb-8 flex justify-center">
                    <img src={perfumeResultDetail?.imgUrl} />
                </div>
                <div className="font-bold mb-8">
                    <div> {perfumeResultDetail?.brand} </div>
                    <div> {perfumeResultDetail?.name} </div>
                </div>
                <div className="mb-5">
                    Characteristics of perfumes that can be mixed
                </div>
                <div className="text-xl mb-10">
                    <div>
                        Top Notes :
                        <span>{perfumeResultDetail?.notes.topNotes}</span>
                    </div>
                    <div>
                        Middle Notes :
                        <span>{perfumeResultDetail?.notes.middleNotes}</span>
                    </div>
                    <div>
                        Bottom Notes :
                        <span>{perfumeResultDetail?.notes.baseNotes}</span>
                    </div>
                </div>

                <div className="mb-5"> Description for this perfume </div>
                <div className="text-xl text-balance mx-96 mb-10">
                    {perfumeResultDetail?.description}
                </div>
                <div className="px-96">
                    <button
                        className="bg-lavidbrown py-3 px-10 rounded-lg w-full flex justify-between"
                        onClick={() => {
                            nevigate(
                                `/perfumedetail-${perfumeResultDetail?.perfumeId}`,
                                {
                                    state: {
                                        Id: perfumeResultDetail?.perfumeId,
                                    },
                                }
                            )

                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth', // Optional: Adds smooth scrolling effect
                            })
                        }}
                    >
                        <span className="text-bonjour">Detail</span>
                        <span className="text-bonjour">&rarr;</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
