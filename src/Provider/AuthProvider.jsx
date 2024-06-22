import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false)
    
    // user create
    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // user profile
    const updateUserProfile = (name, photo, email) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            email: email,
            photoURL: photo
        })
    }

    // user signin
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    // user logout
    const logOut = () =>{
        return signOut(auth)
    }

    // user state checking
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email : userEmail};
            setUser(currentUser);
            setLoading(false);
            // if user exists then issue a token
            if(currentUser){               
                axios.post('http://localhost:5000/jwt',loggedUser, {withCredentials : true})
                .then(res => console.log('token response', res.data))
            }
            else{
                axios.post('http://localhost:5000/logout', loggedUser, {
                    withCredentials : true
                })
                .then(res => console.log(res.data))
            }
        })
        return () => {
            return unSubscribe
        }
    },[reload])

    const authInfo = {
        signUp,
        user,
        loading,
        signIn,
        updateUserProfile,
        setReload,
        logOut,
        auth
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;