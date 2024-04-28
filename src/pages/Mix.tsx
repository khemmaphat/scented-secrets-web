import { useEffect, useState } from 'react'
import { AdviceBox } from '../components/AdviceBox'
import { GroupNoteCard } from '../components/GroupNoteCard'
import { GroupNote } from '../interfaces/perfume_interface'
import { PerfumeServiceArray } from '../service/perfume_service'
import { useUtil } from '../utils/useUtil'
import { SignInPopup } from '../components/SignInPopup'
import { SignUpPopup } from '../components/SignUpPopup'

export const Mix = () => {
    const [state, setState] = useState('Advice')
    const [groupNoteResponse, setGroupNoteResponse] = useState<GroupNote[]>()

    const perfumeApi = new PerfumeServiceArray()

    useEffect(() => {
        perfumeApi
            .getAllGroupNote()
            .then((response) => {
                setGroupNoteResponse(response.data)
            })
            .catch((error) => {
                console.error('Error fetching Group detail data:', error)
            })
    }, [])

    const [isLogin, setIsLogin] = useState(useUtil.LoginCheck())
    const [signUpPopup, setSignUpPopup] = useState(false)
    return (
        <div>
            {state === 'Advice' ? (
                <AdviceBox
                    Topic="Mix Perfumes"
                    Detail=" The feature allows you to experiment with mixing perfumes by yourself for a new experience and to find the right fragrance for you."
                    ImgUrl="https://firebasestorage.googleapis.com/v0/b/scented-secrets-1958e.appspot.com/o/perfume-spray-container.png?alt=media&token=1ece03e5-28b0-4097-a6fc-9edf61bbe85e"
                    onClick={() => setState('ChooseGroupPurfume')}
                />
            ) : (
                <GroupNoteCard GroupNotes={groupNoteResponse} />
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
