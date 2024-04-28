import React, { useState } from 'react'
import { UserService } from '../service/user_service'
import { SignIn_Req } from '../interfaces/user_interface'
import { Popup } from './Popup'
import { Field } from './Field'

interface inputProps {
    isShow: boolean
    openSignUpPopup: () => void
    onClose: () => void
}

export const SignInPopup: React.FC<inputProps> = ({
    isShow,
    openSignUpPopup,
    onClose,
}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const userService = new UserService()
    const [rememberMe, setRememberMe] = useState(false)
    const [signInData, setSignInData] = useState<SignIn_Req>({
        username: '',
        password: '',
    })
    const handleSignIn = () => {
        userService
            .signInUser(signInData)
            .then((response) => {
                if (response.error) {
                    setErrorMessage(response.error)
                } else {
                    onClose
                    if (rememberMe != true) {
                        sessionStorage.setItem('id', response.data?.id || '')
                    } else {
                        localStorage.setItem('id', response.data?.id || '')
                    }
                    window.location.reload()
                }
            })
            .catch((error) => {
                console.error('Error search fetching data:', error)
            })
    }

    return (
        <div>
            <Popup showPopup={isShow} onClose={onClose}>
                <div className="font-roboto text-lavidbrown py-6 px-5">
                    <div className="text-3xl">Sign In</div>
                    <div className="text-base my-3">
                        Doesn't have an account yet?
                        <span
                            className="text-hibiscus underline underline-offset-4"
                            onClick={openSignUpPopup}
                        >
                            Sign Up
                        </span>
                        <form className="mt-3">
                            <Field
                                label="Username"
                                type="text"
                                value={signInData.username}
                                onChange={(e) =>
                                    setSignInData({
                                        ...signInData,
                                        ['username']: e.target.value,
                                    })
                                }
                            />
                            <Field
                                label="Password"
                                type="password"
                                value={signInData.password}
                                onChange={(e) =>
                                    setSignInData({
                                        ...signInData,
                                        ['password']: e.target.value,
                                    })
                                }
                            />
                            <div className="flex item-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 item-center"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <span className="text-sm">Remember me</span>
                            </div>
                            <div className="text-red-600 mt-3">
                                {errorMessage}
                            </div>
                            <button
                                type="button"
                                className="text-2xl text-bonjour bg-lavidbrown rounded-lg w-full py-3 my-4"
                                onClick={handleSignIn}
                            >
                                Sign In
                            </button>
                            <div className="relative">
                                <div className="border-t border-gray-500 my-4"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bonjour px-4 text-gray-500">
                                    or
                                </div>
                            </div>
                            <div className="flex justify-center space-x-2 text-sm">
                                <button className="bg-white border border-lavidbrown w-full py-3 rounded-lg my-4 flex items-center">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                                        className="w-6 m-1.5 mr-3"
                                    ></img>
                                    Sign In with Google
                                </button>
                                <button className="bg-white border border-lavidbrown w-full py-3 rounded-lg my-4 flex items-center">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
                                        className="w-7 m-1.5"
                                    ></img>
                                    Sign In with Facebook
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Popup>
        </div>
    )
}
