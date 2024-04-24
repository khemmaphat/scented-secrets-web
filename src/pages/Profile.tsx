//import React from 'react'

import { useEffect, useState } from 'react'
import { Dropdown } from '../components/Dropdown'
import { UserResponse } from '../interfaces/user_response'
import { UserService } from '../service/user_service'
import { useUtil } from '../utils/useUtil'

export const Profile = () => {
    const [user, setUser] = useState<UserResponse>()
    const [isEdit, setIsEdit] = useState(false)

    const userApi = new UserService()
    useEffect(() => {
        var id = localStorage.getItem('id') || sessionStorage.getItem('id')

        userApi
            .getUserById(id)
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                console.error('Error fetching user data:', error)
            })
    }, [])

    const formatDate = useUtil.formatDate(user?.birthday || new Date())
    const [birthdayTemp, setBirthdayTemp] = useState({
        day: formatDate.day,
        month: formatDate.month,
        year: formatDate.year,
    })

    const handleEdit = async () => {
        if (isEdit != true) {
            setIsEdit(true)
        } else {
            setUser({
                ...user,
                birthday: useUtil.formatDate_DB(
                    birthdayTemp.day,
                    birthdayTemp.month,
                    birthdayTemp.year
                ),
            })
            var id = sessionStorage.getItem('id') || localStorage.getItem('id')
            setUser({
                ...user,
                birthday: useUtil.formatDate_DB(
                    birthdayTemp.day,
                    birthdayTemp.month,
                    birthdayTemp.year
                ),
            })
            await userApi.updateUser(id, user)
        }
    }

    return (
        <div className="bg-bonjour flex justify-center py-10 px-96">
            <div className="container bg-white rounded-xl font-roboto text-lavidbrown px-16 py-16">
                <div className="text-3xl">Personal information</div>
                <div className="flex justify-center my-10">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/scented-secrets-1958e.appspot.com/o/user.png?alt=media&token=447a2546-705f-4cae-86dc-9c607504e0a9"
                        className="size-32"
                    />
                </div>
                <form>
                    <div className="grid grid-cols-2 gap-2 mb-5">
                        <div className="mr-6">
                            <div className="text-sm">Username</div>
                            <input
                                type="text"
                                className="text-base text-venus rounded-lg bg-bonjour border-b border-venus w-full p-2"
                                value={user?.username || ''}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        username: e.target.value,
                                    })
                                }
                                disabled={!isEdit}
                            />
                        </div>
                        <div></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-5">
                        <div className="mr-6">
                            <div className="text-sm">First name</div>
                            <input
                                type="text"
                                className="text-base text-venus rounded-lg bg-bonjour border-b border-venus w-full p-2"
                                value={user?.firstName || ''}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        firstName: e.target.value,
                                    })
                                }
                                disabled={!isEdit}
                            />
                        </div>
                        <div>
                            <div className="text-sm">Last name</div>
                            <input
                                type="text"
                                className="text-base text-venus rounded-lg bg-bonjour border-b border-venus w-full p-2"
                                value={user?.lastName || ''}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        lastName: e.target.value,
                                    })
                                }
                                disabled={!isEdit}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-5">
                        <div className="mr-6">
                            <div className="text-sm">Telephone Number</div>
                            <input
                                type="text"
                                className="text-base text-venus rounded-lg bg-bonjour border-b border-venus w-full p-2"
                                value={user?.telephone || ''}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        telephone: e.target.value,
                                    })
                                }
                                disabled={!isEdit}
                            />
                        </div>
                        <div>
                            <div className="text-sm">
                                Description about yourself
                            </div>
                            <input
                                type="text"
                                className="text-base text-venus rounded-lg bg-bonjour border-b border-venus w-full p-2"
                                value={user?.description || ''}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        description: e.target.value,
                                    })
                                }
                                disabled={!isEdit}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4">
                        <div>
                            <div className="text-sm">Birthday</div>
                            <Dropdown
                                value={birthdayTemp.day}
                                start={1}
                                end={31}
                                disabled={!isEdit}
                                onChange={(e) =>
                                    setBirthdayTemp({
                                        ...birthdayTemp,
                                        day: parseInt(e.target.value),
                                    })
                                }
                            />
                        </div>
                        <div>
                            <div className="text-sm">Month</div>
                            <Dropdown
                                value={birthdayTemp.month}
                                start={1}
                                end={12}
                                disabled={!isEdit}
                                onChange={(e) =>
                                    setBirthdayTemp({
                                        ...birthdayTemp,
                                        month: parseInt(e.target.value),
                                    })
                                }
                            />
                        </div>
                        <div>
                            <div className="text-sm">Year</div>
                            <Dropdown
                                value={birthdayTemp.year}
                                start={1950}
                                end={2024}
                                disabled={!isEdit}
                                onChange={(e) =>
                                    setBirthdayTemp({
                                        ...birthdayTemp,
                                        year: parseInt(e.target.value),
                                    })
                                }
                            />
                        </div>
                        <div>
                            <div className="text-sm">Gender</div>
                            <div className="mr-5 text-base text-venus rounded-lg bg-bonjour border-b border-venus p-2">
                                <select
                                    className="w-full bg-bonjour"
                                    value={user?.gender}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            gender: e.target.value,
                                        })
                                    }
                                    disabled={!isEdit}
                                >
                                    <option key="Male" value="Male">
                                        Male
                                    </option>
                                    <option key="Female" value="Female">
                                        Female
                                    </option>
                                    <option
                                        key="Not specified"
                                        value="Not specified"
                                    >
                                        Not specified
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="text-2xl text-bonjour w-96 bg-lavidbrown rounded-lg py-3 my-5"
                            onClick={handleEdit}
                        >
                            {isEdit ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
