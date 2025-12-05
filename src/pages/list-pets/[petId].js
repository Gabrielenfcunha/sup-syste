
import PetForm from "@/components/pet-form";
import ExamesForm from "@/components/exames-form";
import VermifugoForm from "@/components/vermifugo-form";
import MedicaForm from "@/components/medicacao-form";
import VacinaForm from "@/components/vacina-form";
import ConsultaForm from "@/components/consulta-form";
import { postJson } from "@/util/http";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import css from "../../styles/listVacina.module.scss"


export default function BlogPostPage(props) {
  const router = useRouter();

  const petId = router.query.petId;
  const [values, setValues] = React.useState(null);
                 
                                   // PET
  async function fetchPet() {
    const { data, error } = await postJson("/api/pets/find", {id: petId});

    if (error) {
      alert("erro");
    } else {
      setValues(data);
    }
  }
                                        // VERMIFUGO
    async function fetchVermufugo() {
      const { data, error } = await postJson("/api/vermifugo/find", {id: petId});
  
      if (error) {
        alert("erro");
      } else {
        setValues(data);
      }
    }
    // Medicação
  async function fetchMedicacao() {
    const { data, error } = await postJson("/api/medicacao/find", {id: petId});

    if (error) {
      alert("erro");
    } else {
      setValues(data);
    }
  } 
// VACINA
  async function fetchVacina() {
    const { data, error } = await postJson("/api/vacina/find", {id: petId});

    if (error) {
      alert("erro");
    } else {
      setValues(data);
    }
  }
  async function fetchExames() {
    const { data, error } = await postJson("/api/exames/find", {id: petId});

    if (error) {
      alert("erro");
    } else {
      setValues(data);
    }
  }
  async function fetchConsulta() {
    const { data, error } = await postJson("/api/consulta/find", {id: petId});

    if (error) {
      alert("erro");
    } else {
      setValues(data);
    }
  }
  React.useEffect((_) => {
    if (petId) 
      fetchVacina();
      fetchPet();
      fetchVermufugo();
      fetchMedicacao();
      fetchExames();
      fetchConsulta();
  }, [petId]);

 return (
    <div  className={css["list-vacina"]}>
      <PetForm
       loading={!(petId && values)}
       values={values}
      />
      <VermifugoForm
       loading={!(petId && values)}
       values={values}
      />
      <MedicaForm
       loading={!(petId && values)}
       values={values}
      />
      <VacinaForm
       loading={!(petId && values)}
       values={values}
      />
      <ExamesForm
       loading={!(petId && values)}
       values={values}
       />
      <ConsultaForm
       loading={!(petId && values)}
       values={values}
       />
      <Link href ='/Homepage' className={css["btn-back"]}>Voltar</Link>
    </div>
  );
}
