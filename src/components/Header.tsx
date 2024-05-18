import React, { useState, useEffect } from 'react'

import { ProfilePopup } from './ProfilePopup'
import { useNavigate } from 'react-router-dom'
import { SignInPopup } from './SignInPopup'
import { SignUpPopup } from './SignUpPopup'
import { useUtil } from '../utils/useUtil'

export const Header: React.FC = () => {
    const [openProfilePopup, setOpenProfilePopup] = useState(false)
    const [isLogin, setIsLogin] = useState(useUtil.LoginCheck)
    const [signInPopup, setSignInPopup] = useState(false)
    const [signUpPopup, setSignUpPopup] = useState(false)

    useEffect(() => {
        if (
            sessionStorage.getItem('id') == null &&
            localStorage.getItem('id') == null
        ) {
            setIsLogin(false)
        } else {
            setIsLogin(true)
        }
    }, [sessionStorage.getItem('id'), localStorage.getItem('id')])

    const nevigate = useNavigate()

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
                        <button
                            className={`${
                                window.location.pathname == '/' &&
                                'border border-lavidbrown rounded-lg p-2'
                            }`}
                            onClick={() => {
                                nevigate('/')
                            }}
                        >
                            Home
                        </button>
                        <button
                            className={`${
                                window.location.pathname == '/knowledge' &&
                                'border border-lavidbrown rounded-lg p-2'
                            }`}
                            onClick={() => {
                                nevigate('/knowledge')
                            }}
                        >
                            Knowledges
                        </button>
                        <button
                            className={`${
                                (window.location.pathname == '/mix' ||
                                    window.location.pathname ==
                                        '/mixedresult') &&
                                'border border-lavidbrown rounded-lg p-2'
                            }`}
                            onClick={() => {
                                nevigate('/mix')
                            }}
                        >
                            Mix Perfumes
                        </button>
                        <button
                            className={`${
                                (window.location.pathname == '/recommend' ||
                                    window.location.pathname ==
                                        '/questionresult') &&
                                'border border-lavidbrown rounded-lg p-2'
                            }`}
                            onClick={() => {
                                nevigate('/recommend')
                            }}
                        >
                            Recommended
                        </button>
                    </div>
                    <div className="ml-auto mr-6">
                        {isLogin ? (
                            <button>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/scented-secrets-1958e.appspot.com/o/user.png?alt=media&token=447a2546-705f-4cae-86dc-9c607504e0a9"
                                    className="ml-auto size-12"
                                    onClick={() => setOpenProfilePopup(true)}
                                />
                            </button>
                        ) : (
                            <div className="font-roboro ml-auto space-x-10 my-2">
                                <button
                                    type="button"
                                    className="text-lavidbrown"
                                    onClick={() => setSignInPopup(true)}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    className="text-bonjour bg-lavidbrown rounded-lg py-2 px-3"
                                    onClick={() => setSignUpPopup(true)}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <SignInPopup
                    isShow={signInPopup}
                    openSignUpPopup={() => {
                        setSignInPopup(false)
                        setSignUpPopup(true)
                    }}
                    onClose={() => setSignInPopup(false)}
                />
                <SignUpPopup
                    isShow={signUpPopup}
                    openSignInPopup={() => {
                        setSignInPopup(true)
                        setSignUpPopup(false)
                    }}
                    onClose={() => setSignUpPopup(false)}
                />

                <ProfilePopup
                    showPopup={openProfilePopup}
                    onClose={() => setOpenProfilePopup(false)}
                >
                    <div className="font-roboto text-lavidbrown text-base py-6 px-5">
                        <div className="grid place-items-center">
                            <div>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/scented-secrets-1958e.appspot.com/o/user.png?alt=media&token=447a2546-705f-4cae-86dc-9c607504e0a9"
                                    className="ml-auto size-16"
                                />
                            </div>
                            <div>NAME</div>
                        </div>
                        <button
                            className="mr-48"
                            onClick={() => {
                                nevigate('/profile')
                                setOpenProfilePopup(false)
                            }}
                        >
                            Profile
                        </button>
                        <div className="border-t border-gray-500 my-4"></div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('id')
                                sessionStorage.removeItem('id')
                                nevigate('/')
                                setOpenProfilePopup(false)
                                setIsLogin(false)
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
