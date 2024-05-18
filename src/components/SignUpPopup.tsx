import React, { useState } from 'react'
import { Popup } from './Popup'
import { Field } from './Field'
import { SignUp_Req } from '../interfaces/user_interface'
import { UserService } from '../service/user_service'

interface inputProps {
    isShow: boolean
    openSignInPopup: () => void
    onClose: () => void
}

export const SignUpPopup: React.FC<inputProps> = ({
    isShow,
    onClose,
    openSignInPopup,
}) => {
    const [signUpData, setSignUpData] = useState<SignUp_Req>({
        email: '',
        username: '',
        password: '',
    })
    const [errorMessage, setErrorMessage] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')
    const userService = new UserService()
    const handleSignUp = () => {
        if (signUpData.email == '') {
            setErrorMessage('Email required')
        } else if (signUpData.username == '') {
            setErrorMessage('Username required')
        } else if (signUpData.password == '') {
            setErrorMessage('Password required')
        } else if (reEnterPassword == '') {
            setErrorMessage('Re-enter Password required')
        } else if (signUpData.password != reEnterPassword) {
            setErrorMessage('Password not match')
        }

        if (
            signUpData.username != '' &&
            signUpData.password != '' &&
            signUpData.email != '' &&
            reEnterPassword != '' &&
            reEnterPassword == signUpData.password
        ) {
            userService
                .signUpUser(signUpData)
                .then((response) => {
                    if (!response.error) {
                        openSignInPopup()
                    } else {
                        setErrorMessage(response.error)
                    }
                })
                .catch((error) => {
                    console.error('Error search fetching data:', error)
                })
        }
    }

    return (
        <Popup showPopup={isShow} onClose={onClose}>
            <div className="font-roboto text-lavidbrown py-6 px-5">
                <div className="text-3xl mb-4 mr-56">Sign Up</div>
                <Field
                    label="Email"
                    type="email"
                    value={signUpData.email}
                    onChange={(e) =>
                        setSignUpData({
                            ...signUpData,
                            ['email']: e.target.value,
                        })
                    }
                />
                <Field
                    label="Username"
                    type="text"
                    value={signUpData.username}
                    onChange={(e) =>
                        setSignUpData({
                            ...signUpData,
                            ['username']: e.target.value,
                        })
                    }
                />
                <Field
                    label="Password"
                    type="password"
                    value={signUpData.password}
                    onChange={(e) =>
                        setSignUpData({
                            ...signUpData,
                            ['password']: e.target.value,
                        })
                    }
                />
                <Field
                    label="Re-enter Password"
                    type="password"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                />
                <div className="text-red-600 mt-3">{errorMessage}</div>
                <div>
                    <button
                        onClick={handleSignUp}
                        className="text-2xl text-bonjour bg-lavidbrown rounded-lg w-full py-3 my-2"
                    >
                        Sign Up
                    </button>
                </div>
                <div className="text-base my-1">
                    Already signed up?
                    <span
                        className="text-hibiscus underline underline-offset-4"
                        onClick={openSignInPopup}
                    >
                        Sign In
                    </span>
                </div>
            </div>
        </Popup>
    )
}
