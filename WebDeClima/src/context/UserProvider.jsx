import React, { useState } from 'react'
import {UserContext} from './UserContext'

export const UserProvider = ({children}) => {
    const [signedUser, setSignedUser] = useState({
        isLog: false,
        userName: "Ariel",
        userEmail: "",
        userLocation: "Posadas",
        savesLocations: []

    })
  return (

<UserContext.Provider
value={{
  signedUser
  
}}
>
{children}
</UserContext.Provider>
  )
}