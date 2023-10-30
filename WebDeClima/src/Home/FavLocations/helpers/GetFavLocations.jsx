import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig/firebase";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";


export const GetFavLocations = ({uid}) => {
  const { favLocations,setFavLocations } = useContext(UserContext)

 const getLocation = async(uid) =>  {
  const querySnapshot = await getDocs(collection(db, `/Clientes/${uid}/Favoritos`));
   // console.log(querySnapshot);
            
              setFavLocations(querySnapshot.docs.map(doc => ({id: doc.id,...doc.data()}) ))
                
            }
           
           

  return (
    <button onClick={()=>getLocation(uid)} className="btn btn-outline-secondary">Actualizar</button>
  )

  }
