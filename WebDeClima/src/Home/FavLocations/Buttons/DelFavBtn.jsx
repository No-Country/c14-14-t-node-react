import React, { useContext, useEffect, useState } from 'react'

import { db } from '../../../firebaseConfig/firebase'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import { UserContext } from '../../../context/userContext'

export const DelFavBtn = ({ uid, cityName }) => {
  const [delItem, setDelItem] = useState()
  const { favLocations, setFavLocations } = useContext(UserContext)


  const getLocations = async (uid) => {

    const querySnapshot = await getDocs(collection(db, `/Clientes/${uid}/Favoritos`));


    setFavLocations(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))


  }

  // console.log(uid,cityName);
  const deleteLocation = async (uid, cityName) => {
    getLocations(uid)
    const findFavorite = favLocations.find(element => element.cityName === cityName)
    


    const favoriteDoc = doc(db, `/Clientes/${uid}/Favoritos/${findFavorite.id}`)
    await deleteDoc(favoriteDoc)

            getLocations(uid)

    //   setDelItem(find)



  }


  // useEffect(() => {
  //   getLocations()
  // }, [delItem])


  return (
    <button onClick={() => deleteLocation(uid, cityName)} className='heart_buttons'>
      <img src="./iconos/corazon_fav.png" alt="Agregar a Favoritos" />
    </button>
  )
}
// console.log(querySnapshot.docs.map(doc => doc.data()))


//  // const favoriteDoc = doc(db, `/Clientes/${uid}/Favoritos/`)
//  const querySnapshot = await getDocs(collection(db, `/Clientes/${uid}/Favoritos`));
//  const filteredFavs = querySnapshot.docs.map(doc => doc.data())
//  console.log(filteredFavs.filterdata());
// //     await deleteDoc(favoriteDoc)
// //   getFavLocations()