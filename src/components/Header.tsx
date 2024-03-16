import React, { useState, useEffect } from 'react'
import { Popup } from './Popup'
import { SignIn_Req, SignUp_Req } from '../hooks/interfaces/IUser'
import { Field } from './Field'
import useUser from '../hooks/useUser'
import { ProfilePopup } from './ProfilePopup'

export const Header: React.FC = () => {
    const [openSignInPopup, setOpenSignInPopup] = useState(false)
    const [openSignUpPopup, setOpenSignUpPopup] = useState(false)
    const [openProfilePopup, setOpenProfilePopup] = useState(false)
    const [signInData, setSignInData] = useState<SignIn_Req>({
        username: '',
        password: '',
    })
    const [signUpData, setSignUpData] = useState<SignUp_Req>({
        email: '',
        username: '',
        password: '',
    })
    const [reEnterPassword, setReEnterPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        if (
            sessionStorage.getItem('id') == null &&
            localStorage.getItem('id') == null
        ) {
            setIsLogin(false)
        } else {
            setIsLogin(true)
        }
    }, [isLogin])
    const { signIn, loginRes, signUp, signUpRes } = useUser.useUser()

    const handleSignIn = async () => {
        await signIn(signInData)
        if (
            loginRes.id != '' &&
            signInData.username != '' &&
            signInData.password != '' &&
            rememberMe == true
        ) {
            localStorage.setItem('id', loginRes?.id || '')
            setOpenSignInPopup(false)
            location.reload()
        } else if (signInData.username == '' && signInData.password == '') {
            setErrorMessage('Username required and Password required')
        } else if (signInData.username == '') {
            setErrorMessage('Username Required')
        } else if (signInData.password == '') {
            setErrorMessage('Password required')
        } else if (loginRes.error != '') {
            setErrorMessage(loginRes?.error || '')
        } else {
            sessionStorage.setItem('id', loginRes?.id || '')
            setOpenSignInPopup(false)
            location.reload()
        }
    }

    const handleSignUp = async () => {
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
            await signUp(signUpData)
            if (signUpRes.message != '') {
                setOpenSignUpPopup(false)
                setOpenSignInPopup(true)
            } else {
                setErrorMessage(signUpRes?.error || '')
            }
        }
    }

    return (
        <>
            <nav className="bg-bonjour text-lavidbrown p-4">
                <div className="flex justify-start">
                    <div className="font-roboto m-2.5">
                        <a
                            href="/"
                            className="text-2xl text-lavidbrown border-2 border-lavidbrown py-2 pl-2"
                        >
                            SCENTED
                        </a>
                        <a
                            href="/"
                            className="text-2xl text-bonjour bg-lavidbrown border-2 border-lavidbrown py-2 pr-2"
                        >
                            SECRETS
                        </a>
                    </div>

                    <div className="font-roboto text-base space-x-10 ml-16 py-4">
                        <a href="/" className="">
                            Home
                        </a>
                        <a href="/about" className="">
                            Perfumes
                        </a>
                        <a href="/mix" className="">
                            Mix Perfumes
                        </a>
                        <a href="/recommend" className="">
                            Recommended
                        </a>
                    </div>
                    <div className="ml-auto mr-6">
                        {isLogin ? (
                            <button>
                                <img
                                    src="https://cdn.discordapp.com/attachments/1108674012361543770/1213420793405513818/image.png?ex=65fea3ad&is=65ec2ead&hm=ea60728b593189ef0dfa3897e9cf150002cbe578c17567e1179422c2297c0642&"
                                    className="ml-auto size-12"
                                    onClick={() => setOpenProfilePopup(true)}
                                />
                            </button>
                        ) : (
                            <div className="font-roboro ml-auto space-x-10 my-2">
                                <button
                                    type="button"
                                    className="text-lavidbrown"
                                    onClick={() => setOpenSignInPopup(true)}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    className="text-bonjour bg-lavidbrown rounded-lg py-2 px-3"
                                    onClick={() => setOpenSignUpPopup(true)}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <Popup
                    showPopup={openSignInPopup}
                    onClose={() => setOpenSignInPopup(false)}
                >
                    <div className="font-roboto text-lavidbrown py-6 px-5">
                        <div className="text-3xl">Sign In</div>
                        <div className="text-base my-3">
                            Doesn't have an account yet?
                            <span
                                className="text-hibiscus underline underline-offset-4"
                                onClick={() => {
                                    setOpenSignInPopup(false)
                                    setOpenSignUpPopup(true)
                                }}
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
                                        onChange={() =>
                                            setRememberMe(!rememberMe)
                                        }
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
                <Popup
                    showPopup={openSignUpPopup}
                    onClose={() => setOpenSignUpPopup(false)}
                >
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
                                onClick={() => {
                                    setOpenSignInPopup(true)
                                    setOpenSignUpPopup(false)
                                }}
                            >
                                Sign In
                            </span>
                        </div>
                    </div>
                </Popup>
                <ProfilePopup
                    showPopup={openProfilePopup}
                    onClose={() => setOpenProfilePopup(false)}
                >
                    <div className="font-roboto text-lavidbrown text-base py-6 px-5">
                        <div className="grid place-items-center">
                            <div>
                                <img
                                    src="https://cdn.discordapp.com/attachments/1108674012361543770/1213420793405513818/image.png?ex=65fea3ad&is=65ec2ead&hm=ea60728b593189ef0dfa3897e9cf150002cbe578c17567e1179422c2297c0642&"
                                    className="ml-auto size-16"
                                />
                            </div>
                            <div>NAME</div>
                        </div>
                        <a href="/profile" className="mr-48">
                            Profile
                        </a>
                        <div className="border-t border-gray-500 my-4"></div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('id')
                                sessionStorage.removeItem('id')
                                location.reload()
                            }}
                            className="text-hibiscus"
                        >
                            Sign out
                        </button>
                    </div>
                </ProfilePopup>
            </nav>
        </>
    )
}
