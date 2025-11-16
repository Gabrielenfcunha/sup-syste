import React from 'react';
import Link from "next/link";
import css from "../styles/homeIndex.module.scss";
 




export default function Index (params) {
  return (
    <div >
      <nav className={css["navbar"]}>
          <div className={css["logo"]}>
            🐾SUP 
          </div>
          <div className={css["menu"]}>
              <Link href='/auth/Login' className={css["signup"]}>Login</Link>
        </div>
      </nav>
      <section className={css["hero"]}>
        <div className={css["text"]}>
          <h1><span>Olá, amigo </span></h1>
          <h2>Seu pet merece esse cuidado VIP!</h2>
          <p>Cadastre-se no SUP e deixe a saúde dele em boas patas!</p>
          <Link href='/auth/SignUp'className={css["btn"]}>Sign Up</Link>
        </div>
       <div className={css["image"]}>
          <img src="/img/pets.png" alt="pets cão e gato" />
        </div>
      </section>
    </div>
  )
}
