import React from 'react'

export const HomeMap = () => {
  return (
    <div style={{width: "38%",border: "1px solid grey",height: "350px", borderRadius: "10px", display: "flex",alignItems: "center", justifyContent: "center",backgroundColor: "gray"}}>
      <iframe src="https://mapa.tutiempo.net/#-24.52713;-43.59375;2" 
        style={{width: "150%",border: "1px solid grey",height: "350px", borderRadius: "10px", display: "flex",alignItems: "center", justifyContent: "center"}}
      ></iframe>
      {/*<iframe src="https://mapa.tutiempo.net/#-38.27269;-52.73437;3" ></iframe>Muestra mapa mas enfocado en bs as*/}
    </div>
  )
}
