import {React} from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';



export default function Homepage ({token}) {
  
  const router = useRouter();
  
  function handleLogout(){
    sessionStorage.removeItem('token')
    router.push('/');
  }

  return(
    <div>
      <h3> Pets do {token.user.user_metadata.full_name}</h3>
      <h4>Meus  Pets</h4>
      <button><Link href ='/SignUpPets'>+</Link></button>
       <button><Link href ='/ListPets'>lista</Link></button>

      <button onClick={handleLogout}>sair</button>
    </div>
  );
  
}
