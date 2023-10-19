/* import Mapa from './components/pages/mapas/mapas'
import Clima from './components/pages/clima/clima'
import ServiceLocation from './service/service-location' */
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Home = () => {
    const { signedUser} = useContext(UserContext)
    console.log(signedUser);

    return (
        <div className="row container Home">
            <h1>Hola {signedUser.userName}</h1>
            {/* <Mapa />
            <Clima /> */}
        </div>
    )
}

export default Home;