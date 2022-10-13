import {db} from '../firebase/config'


import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'


export const useAuthentication = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState (null)

    //cleanup
    // deal with memory leak
    const [cancelled, SetCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    }

// Register
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {

            const {user} = await createUserWithEmailAndPassword (
                auth,
                data.email,
                data.password
            )
            
            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user

        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message)
            
            let systemErrorMessage

            if(error.message.includes('Password')) {
                systemErrorMessage = 'A senha precisa ter pelo menos 6 caracteres'
            } else if(error.message.include('email-alredy')) {
                systemErrorMessage = 'E-mail já cadastrado.'
            } else {
                systemErrorMessage = "ocorreu um erro, por favor tente mais tarde."
            }

            setLoading(false)
            setError(systemErrorMessage)
        }

    };

// logout

const logout = () => {

    checkIfIsCancelled()

    signOut(auth)

}

//login

const login = async(data) => {

    checkIfIsCancelled()

    setLoading(true)
    setError(false)

    try {

        await signInWithEmailAndPassword(auth, data.email, data.password)
        setLoading(false)
        
    } catch (error) {

        let systemErrorMessage;
        
        if (error.message.includes('user-not-found')) {
            systemErrorMessage = "usuário não encontrado";

        } else if (error.message.includes('wrong-password')) {
            systemErrorMessage = 'Senha Incorreta';
        } else {
            systemErrorMessage = ' Ocorreu um erro, tente mais tarde.'
        }

        setError(systemErrorMessage)
        setLoading(false)

    }

}

    useEffect (() => {
        return () => SetCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };

}

export default useAuthentication