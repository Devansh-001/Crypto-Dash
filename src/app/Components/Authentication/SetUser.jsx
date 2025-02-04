"use client";  // Ensures this component is executed client-side

import { setUser } from '@/redux/coinSlice';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../../../../firebaseConfig';
import { useDispatch } from 'react-redux';

const SetUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Dispatch only the serializable data (like uid, email, displayName)
                dispatch(setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    image: user.photoURL
                }));
            } else {
                dispatch(setUser(null));  // Clear user state when no user is authenticated
            }
        });

        return () => unsubscribe();  // Clean up the listener on component unmount
    }, [dispatch]);

    return <div></div>;
};

export default SetUser;
