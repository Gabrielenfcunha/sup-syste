import "@/styles/globals.css";
import React, { useState ,useEffect } from 'react';

export default function App({ Component, pageProps }) {

  const[token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() =>{
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [] )

  return <Component {...pageProps} setToken={setToken} token={token} />;
}
