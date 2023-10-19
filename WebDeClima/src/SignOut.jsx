import { getAuth, signOut } from "firebase/auth";
import {userContext} from './context/userContext'
import { useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const SignOut = () => {
    const auth = getAuth();
    const { signedUser } = useContext(userContext);

    const navigate = useNavigate();

    if (signedUser !== null) {
        signOut(auth).then(() => {
            console.log("Cerraste sesion");
            navigate('/')
            }).catch((error) => {
            console.log("Error: ", error);
        });
    }

   
}
export default SignOut;