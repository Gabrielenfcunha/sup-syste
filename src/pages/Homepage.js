import React, { useState  } from 'react';
import { postJson } from '@/util/http';
import { useRouter } from 'next/navigation';
import css from"../styles/homepage.module.scss"; 
import { supabaseClient as supabase } from "@/util/supabase";
import Link from "next/link";

export default function Homepage ({token}) {
  
  const router = useRouter();
  const [values, setValues] = React.useState([]);

  function handleLogout(){
    sessionStorage.removeItem('token')
    router.push('/');
  }
  async function fetchPets() {
      const {data, error} = await postJson(
        '/api/pets/list',
        {}
      );
  
      if (error) {
        alert('erro')
      } else {
        setValues(data);
      }
    }
    
    React.useEffect(_ => {
      fetchPets();
    }, []);

function calcularIdade(dataNascimento) {
  if (!dataNascimento) return "Desconhecida";

  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  // Se o pet ainda não fez aniversário esse ano
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  if (idade < 1) {
    // Se tiver menos de um ano, calcula em meses
    const meses =
      (hoje.getFullYear() - nascimento.getFullYear()) * 12 +
      hoje.getMonth() -
      nascimento.getMonth();
    return `${meses} ${meses === 1 ? "mês" : "meses"}`;
  }

  return `${idade} ${idade === 1 ? "ano" : "anos"}`;
}


  return(
 <div className={css.homepage}>

      {/* ==== NAVBAR ==== */}
      <nav className={css['navbar']}>
        <div className={css['logo']}>
          <span>🐾SUP</span>
        </div>

        <div className={css['search']}>
          <input type="text" placeholder="Pesquisar..." />
          <button>
            <i className={css["fas fa-search"]}></i>
          </button>
        </div>
      </nav>

      {/* ==== CONTEÚDO ==== */}
      <div className={css['container']}>

        {/* ==== SIDEBAR ==== */}
        <aside className={css['sidebar']}>
          <div className={css['profile']}>
            <div className={css['avatar']}>
              <i className="fas fa-user-circle"></i>
            </div>
            <p className={css['name']}>{token.user?.user_metadata?.full_name}</p>
          </div>

          <nav className={css['menu']}>
            <Link href='/ListPets' >Lista Pets</Link>
            <Link href='/ListVacina' >Lista Vacina</Link>
            <Link href='/SignUpVacina' >Criar Vacina</Link>
            <button className={css['logout']} onClick={handleLogout}>Sair</button>
          </nav>
        </aside>

        {/* ==== MAIN ==== */}
        <main className={css['main']}>
          <h2>Meus Pets</h2>

          <div className={css['pets']}>
  {values.length > 0 ? (
    values.map((pet) => (
      <div key={pet.id} className={css['petCard']}>
        <div className={css['petImage']}>
          {/* Se tiver imagem no banco */}
          {pet.image_url ? (
            <img src={pet.image_url} alt={pet.name} />
          ) : (
            <span className={css['noImage']}>🐾</span>
          )}
        </div>

        <div className={css['petInfo']}>
          <h3>{pet.name}</h3>
          <p><strong>Espécie:</strong> {pet.especie || 'Não informado'}</p>
          <p><strong>Idade:</strong> {calcularIdade(pet.data)}</p>
          {/* <Link href={`/pets/${pet.id}`} className={css['detailsBtn']}> */}
            Ver detalhes
          {/* </Link> */}
        </div>
      </div>
    ))
  ) : (
    <p className={css['empty']}>Nenhum pet cadastrado ainda 🐶</p>
  )}

  <Link href="/SignUpPets" className={css['addCard']}>
    <span>+</span>
  </Link>
</div>

  

        </main>
      </div>
    </div>
    // <div className={css["homepage"]} >
    //   <h3> Bem vindo {token.user?.user_metadata?.full_name}</h3>
    //   <h4>Meus  Pets</h4>
    //   <div className={css["button-group"]}>
    //       <Link href ='/SignUpPets'className={css["btn"]}>+</Link>
    //       <Link href ='/ListPets' className={css["btn"]}>lista</Link>
    //       <Link href ='/ListVacina' className={css["btn"]}>lista vacina </Link>
    //       <Link href ='/SignUpVacina' className={css["btn"]}>criar  vacina </Link>
    //   </div>
    //   <button className={css["logout"]} onClick={handleLogout}>sair</button>
    // </div>
  );
  
}
