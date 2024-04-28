//import React from 'react'

import { useEffect, useState } from 'react'
import { AdviceBox } from '../components/AdviceBox'
import { Questions } from '../components/Questions'
import { QuestionServiceArray } from '../service/question_service'
import { QuestionResponse } from '../interfaces/question_interface'
import { SignInPopup } from '../components/SignInPopup'
import { useUtil } from '../utils/useUtil'
import { SignUpPopup } from '../components/SignUpPopup'

export const Recommend = () => {
    const [state, setState] = useState('Advice')
    const [questionResponse, setQuestionResponse] =
        useState<QuestionResponse[]>()
    const questionApi = new QuestionServiceArray()
    useEffect(() => {
        questionApi
            .getQuestions()
            .then((response) => {
                setQuestionResponse(response.data)
            })
            .catch((error) => {
                console.error('Error fetching perfume detail data:', error)
            })
    }, [])

    const [isLogin, setIsLogin] = useState(useUtil.LoginCheck())
    const [signUpPopup, setSignUpPopup] = useState(false)
    return (
        <div>
            {state === 'Advice' && (
                <AdviceBox
                    Topic="Recommended"
                    Detail="We will take you to choose the right perfume for you based on your favorite activities."
                    ImgUrl="https://firebasestorage.googleapis.com/v0/b/scented-secrets-1958e.appspot.com/o/perfume-spray-container.png?alt=media&token=1ece03e5-28b0-4097-a6fc-9edf61bbe85e"
                    onClick={() => setState('Question')}
                />
            )}
            {state === 'Question' && (
                <div>
                    <Questions Questions={questionResponse} />
                </div>
            )}
            <SignInPopup
                isShow={!isLogin}
                openSignUpPopup={() => {
                    setSignUpPopup(true)
                    setIsLogin(true)
                }}
                onClose={() => {}}
            />
            <SignUpPopup
                isShow={signUpPopup}
                openSignInPopup={() => {
                    setSignUpPopup(false)
                    setIsLogin(false)
                }}
                onClose={() => {}}
            />
        </div>
    )
}
