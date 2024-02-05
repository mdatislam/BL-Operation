import React, { createContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged,
    signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile
} from "firebase/auth";
import auth from '../../firebase.init';
import axios from 'axios';


export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(null)
    const googleProvider = new GoogleAuthProvider();


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const updateUser = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubsCriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log('current user', currentUser)
            //jwt token save to loacal storage
            if (currentUser) {
                axios.post('http://localhost:5000/jwt', {
                    email: currentUser.email
                })
                    .then(data => {
                        console.log(data)
                        const token = data.data.token
                        localStorage.setItem('accessToken', token)
                        setLoading(false)
                    })
                    .catch(error => {
                        console.error('Error generating JWT token:', error);
                        setLoading(false); // Set loading to false even if token generation fails
                    });
            } else {
                localStorage.removeItem('accessToken');
                setLoading(false); // Set loading to false if there is no user
            }
        })
        return () => {
            return unSubsCriber()
        }
    }, [])



    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        googleSignIn,
        updateUser,
        logOut

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;