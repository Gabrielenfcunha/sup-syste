import React, { useState  } from 'react';
import { postJson } from '@/util/http';
import { useRouter } from 'next/navigation';
import css from"../styles/homepage.module.scss"; 
import { Loader } from '@/components/loader';
import { supabaseClient as supabase } from "@/util/supabase";
import Link from "next/link";

export default function Homepage ({token}) {
  
  const router = useRouter();
  const [values, setValues] = React.useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // ⬅ ADICIONE ISSO

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
      <nav className={css.navbar}>  
        {/* BOTÃO HAMBÚRGUER */}
        <div className={css.hamburger}>
          <button className={css.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
        <div className={css.logo}>
          <span>🐾SUP</span>
        </div>
      </nav>

      {/* ==== CONTEÚDO ==== */}
      <div className={css.container}>

        {/* ==== SIDEBAR ==== */}
        <aside className={`${css.sidebar} ${menuOpen ? css.open : ''}`}> 
          <div className={css.profile}>

            <p className={css.name}>{token.user?.user_metadata?.full_name}</p>
          </div>

          <nav className={css.menu}>
            <Link href='/ListPets'>Lista Pets</Link>
            <Link href='/ListVacina'>Vacina</Link>
            <Link href='/ListVermifugo'>Vermifugo</Link>
            <Link href='/ListMedicacao'>Medicação</Link>
            <Link href='/ListExames'>Exames</Link>
            <Link href='/ListConsulta'>Consulta</Link>
            <Link href='/ListConsulta'>Compartilhar</Link>
            <div className={css.logout}>
             <img src="/img/sair.png"  onClick={handleLogout} alt="button" />
            </div>
          </nav>
        </aside>

        {/* ==== MAIN ==== */}
        <main className={css.main}>
          <h2>Meus Pets</h2>
      <div className={css.pets}>
          {values.length > 0 ? (
            values.map((pet) => (
      <div key={pet.id} className={css.petCard}>
        <div className={css.petInfo}>
          <h3>{pet.name}</h3>
          <p><strong>Espécie:</strong> {pet.especie || 'Não informado'}</p>
          <p><strong>Idade:</strong> {calcularIdade(pet.data)}</p>
          <Link href={`list-pets/${pet.id}`} className={css.detailsBtn}> 
            Pet Historico 
          </Link>
        </div>
      </div>
    ))
  ) : (
    <p className={css['empty']}>Nenhum pet cadastrado ainda 🐶</p>
  )}

  <Link href="/SignUpPets" className={css['addCard']}>
    <span>➕</span>
  </Link>
</div>

  

        </main>
      </div>
    </div>
    
  );
  
}