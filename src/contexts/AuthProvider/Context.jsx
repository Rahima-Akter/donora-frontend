import { createContext, useEffect, useState } from "react";
import auth from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
const Context = ({ children }) => {

    const [collection, setCollection] = useState(0);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    // create user with email and pass
    const signin = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // goggleSignIn
    const googleProvider = new GoogleAuthProvider()
    const googleSingnIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // log put
    const logOut = () => {
        setLoading(false)
        return signOut(auth)
    }

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(false)
            }
        });

        return () => {
            unsubscribe()
        };

    }, [])


    const authInfo = {
        logIn,
        signin,
        googleSingnIn,
        logOut,
        user,
        setUser,
        loading,
        setLoading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Context;