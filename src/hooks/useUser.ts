import {
    Profile_User,
    SignIn_Req,
    SignIn_Res,
    SignUp_Req,
    SignUp_Res,
} from './interfaces/IUser'
import axios from 'axios'

const useUser = () => {
    const base_url = import.meta.env.VITE_SCENTED_SECRETS_API

    var loginRes: SignIn_Res = {
        id: '',
        message: '',
        error: '',
    }
    var signUpRes: SignUp_Res = {
        message: '',
        error: '',
    }
    var profileUser: Profile_User

    const signIn = async (SignInData: SignIn_Req) => {
        try {
            const response = await axios.post(
                `${base_url}/api/login`,
                SignInData,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            if (response.data.error == null && response.data.data != null) {
                loginRes.id = response.data.Message
            } else {
                loginRes.error = response.data.error
            }
        } catch (error) {
            console.error('Sign-in failed:', error)
            throw new Error('Sign-in failed')
        }
    }

    const signUp = async (SignUpData: SignUp_Req) => {
        try {
            const response = await axios.post(
                `${base_url}/api/user`,
                SignUpData,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            if (response.data.error == null && response.data.data != null) {
                signUpRes.message = response.data.Message
            } else {
                signUpRes.error = response.data.error
            }
        } catch (error) {
            console.error('Sign-up failed:', error)
            throw new Error('Sign-up failed')
        }
    }

    const getProfileUser = async (id: string) => {
        try {
            const response = await axios.get(`${base_url}/api/user?id=${id}`, {
                headers: { 'Content-Type': 'application/json' },
            })
            profileUser = response.data.data
        } catch (error) {
            console.error('Get profile failed:', error)
            throw new Error('Get profile failed')
        }
    }

    return { signIn, loginRes, signUp, signUpRes, getProfileUser }
}

export default { useUser }
