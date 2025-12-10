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
          <h2>Mantenha a carteirinha sempre Atualizada!</h2>
          <p>Cadastre-se no SUP e deixe a saúde dele em boas patas!</p>
          <Link href='/auth/SignUp'className={css["btn"]}>Sign Up</Link>
        </div>
       <div className={css["image"]}>
          <img src="/img/pets.png" alt="pets cão e gato" />
        </div>
      </section>
      <div className={css["vacina-card"]} >
  <h2>Esquema de Vacinação</h2>

  <div className={css["dose"]}>
    <h3>1ª Dose</h3>
    <p>45 dias de vida</p>
    <span>Vacinas V3, V8 ou V11</span>
  </div>

  <div className={css["dose"]}>
    <h3>2ª Dose</h3>
    <p>21 dias após primeira dose</p>
    <span>Vacinas V3, V8 ou V11</span>
  </div>

  <div className={css["dose"]}>
    <h3>3ª Dose</h3>
    <p>21 dias após segunda dose</p>
    <span>Vacinas V3, V8 ou V11</span>
  </div>

  <div className={css["dose"]}>
    <h3>4ª Dose (Opcional)</h3>
    <p>21 dias após terceira dose</p>
    <span>Vacinas V3, V8 ou V11</span>
  </div>

  <div className={css["dose"]}>
    <h3>5 a 6 meses de vida</h3>
    <span>Vacina Antirrábica Cães e Gatos</span>
  </div>

  <div className={css["reforco"]}>
    <h3>Reforço Anual</h3>
    <span>Vacinas V3, V8 ou V11 + Antirrábica</span>
  </div>
</div>
<div className={css["info-card"]}>
  <h2>Informações Diversas</h2>

  <div className={css["info-item"]}>
    <h3>Castração</h3>
    <p>Consultar médico veterinário.</p>
  </div>

  <div className={css["info-item"]}>
    <h3>1ª Tosa</h3>
    <p>A partir do 3º mês de vida.</p>
  </div>

  <div className={css["info-item"]}>
    <h3>Queda de dentes de leite</h3>
    <p>Ocorre entre quatro a cinco meses.</p>
  </div>

  <div className={css["info-item"]}>
    <h3>Duração de gestação das cadelas</h3>
    <p>58 a 62 dias.</p>
  </div>

  <div className={css["info-item"]}>
    <h3>Desmame da ninhada</h3>
    <p>Entre 30 e 45 dias de vida.</p>
  </div>

  <div className={css["info-item"]}>
    <h3>Primeiro cio da cadela</h3>
    <p>Entre o 6º e 12º mês.</p>
  </div>

  <div className={css["info-item"]}>
    <h3>Frequência do Cio</h3>
    <p>Aproximadamente de 6 em 6 meses.</p>
  </div>
</div>

    </div>
  )
}
