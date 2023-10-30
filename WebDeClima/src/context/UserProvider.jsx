import {UserContext} from './userContext'
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebaseConfig/firebase";

export const UserProvider = ({children}) => {
    const [signedUser, setSignedUser] = useState({
        isLog: false,
        userName: "Ariel",
        userEmail: "",
        userNumber: "",
        userLocation: "Posadas",
        savesLocations: []

    })
    const [favLocations, setFavLocations] = useState([])


    useEffect(() => {   
    
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setSignedUser(user);
        } else {
          setSignedUser(null);
        }
      });
    }, []);


  return (
    <UserContext.Provider 
        value={{signedUser,
                favLocations,
                setFavLocations      
                
                
                }}>
        {children}
    </UserContext.Provider>
  )
}