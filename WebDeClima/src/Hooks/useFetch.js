import { useEffect, useState } from "react"

export const useFetch = (URL) => {
    const [data, setData] = useState(undefined)
    
    const options = {
        method: 'GET',
        // headers: {
        //   accept: 'application/json',
        //   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmE0ZTcxZDI4NzI1NGJhOTE2N2YzMzJkNDUwMjFlMCIsInN1YiI6IjY0OTM0ZDc1YWY2ZTk0MDEwNmY5OTZmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ri-xn37uFQ0_9P7E5U7-vQvxi0-gP7RmwWaPGlvOJh0'
        // }
      };

    useEffect(() => {
    
        fetch(URL)
        .then(resp => resp.json())
        .then(result => {

                
            setData(result)
            console.log(result);
        }) 
        .catch((error) => {console.log(error)})
        
    }, [URL])
    
    return {data}
}