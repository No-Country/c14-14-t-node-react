/* import Mapa from './components/pages/mapas/mapas'
import Clima from './components/pages/clima/clima'
import ServiceLocation from './service/service-location' */

import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useFetch } from "../Hooks/useFetch";

const URL = "http://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=Posadas&days=1&aqi=no&alerts=no"
const Home = () => {
   
    const { signedUser } = useContext(UserContext)

    const { data } = useFetch(URL)
   
    console.log(data);
    
    return (
        <div className="row container Home">
            <h1>Hola {signedUser.userName}!</h1>
            <div>

                {
                    (data !== undefined) ?
                        <div>
                           
                            <h5>{data.location.name}</h5>
                            <h5>{data.location.region}</h5>
                            <span>{data.location.localtime}</span>
                        </div>
                        : "holis"
                }
            </div>
            {/* <Mapa />
            <Clima /> */}
        </div>
    )
}

export default Home;