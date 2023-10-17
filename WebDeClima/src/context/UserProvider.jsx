import React, { useState } from 'react'
import {userContext} from './userContext'

export const UserProvider = () => {
    const [signedUser, setSignedUser] = useState({
        isLog: false,
        userName: "",
        userEmail: "",
        userLocation: ""

    })
  return (

<userContext.Provider
value={
    signedUser
}
>

</userContext.Provider>
  )
}