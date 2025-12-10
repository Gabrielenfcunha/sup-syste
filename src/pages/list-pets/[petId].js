import { postJson } from "@/util/http";
import { useRouter } from "next/router";
import React from "react";
import css from "../../styles/historico.module.scss"
import Link from "next/link";
import QRCode from "react-qr-code";

export default function BlogPostPage(props) {
  const router = useRouter();

  const petId = router.query.petId;
  const [values, setValues] = React.useState({});
  const [isClient, setIsClient] = React.useState(false);
                 
  // PET
  async function fetchPet() {
    const { data, error } = await postJson("/api/externo/" + petId);

    if (error) {
      alert("erro");
    } else {
      setValues(curValues => {
        return { ...curValues, pet: data };
      });
    }
  }

  React.useEffect(() => {
    async function loadData() {
      await fetchPet();
    }

    if (petId) {
      loadData();
    }
  }, [petId]);

  // EXTRA: evita erro quando ainda não carregou
  const pet = values.pet || {};

  React.useEffect(_ => {
    setIsClient(true);
  }, []);

  return (
    <div className={css["signup-container"]}>
      <div className={css["card"]}>

        <h2 className={css["title"]}>Informações do Pet 🐾</h2>

        <div className={css["section"]}>
          <h3>Dados Gerais</h3>
          <p><strong>ID:</strong> {pet.id}</p>
          <p><strong>Nome:</strong> {pet.name}</p>
          <p><strong>Espécie:</strong> {pet.especie}</p>
          <p><strong>Raça:</strong> {pet.raca}</p>
          <p><strong>Sexo:</strong> {pet.sexo}</p>
          <p><strong>Castrado:</strong> {pet.castrdo}</p>
        </div>

        <div className={css["section"]}>
          <h3>Vacinas 💉</h3>
          {pet.vacina?.map((v) => (
            <div key={v.id}>
              <p><strong>Vacina:</strong> {v.vacina}</p>
              <p><strong>Marca:</strong> {v.marca}</p>
              <p><strong>Veterinário:</strong> {v.veterinario}</p>
              <p><strong>Fabricação:</strong> {v.fabricacao}</p>
              <p><strong>Vencimento:</strong> {v.vencimento}</p>
              <p><strong>Dose:</strong> {v.dose}</p>
              <br />
            </div>
          ))}
        </div>

        <div className={css["section"]}>
          <h3>Exames 🧪</h3>
          {pet.exames?.map((e) => (
            <div key={e.id}>
              <p><strong>Exame:</strong> {e.exames}</p>
              <p><strong>Data:</strong> {e.data_exames}</p>
              <p><strong>Detalhes:</strong> {e.detalhe}</p>
              <br />
            </div>
          ))}
        </div>

        <div className={css["section"]}>
          <h3>Consultas 🩺</h3>
          {pet.consulta?.map((c) => (
            <div key={c.id}>
              <p><strong>Consulta:</strong> {c.consulta}</p>
              <p><strong>Data:</strong> {c.data_consulta}</p>
              <p><strong>Horário:</strong> {c.horaio}</p>
              <p><strong>Veterinário:</strong> {c.veterinario}</p>
              <p><strong>Local:</strong> {c.local}</p>
              <p><strong>Detalhes:</strong> {c.detalhes}</p>
              <br />
            </div>
          ))}
        </div>

        <div className={css["section"]}>
          <h3>Vermífugo 🐛</h3>
          {pet.vermifugoo?.map((v) => (
            <div key={v.id}>
              <p><strong>Vermífugo:</strong> {v.vermifugo}</p>
              <p><strong>Data:</strong> {v.data_vermifugo}</p>
              <p><strong>Tipo:</strong> {v.tipo_vermifugo}</p>
              <br />
            </div>
          ))}
        </div>

        <div className={css["section"]}>
          <h3>Medicamentos 💊</h3>
          {pet.medicamento?.map((m) => (
            <div key={m.id}>
              <p><strong>Medicamento:</strong> {m.medicamento}</p>
              <p><strong>Quantidade:</strong> {m.quantidade}</p>
              <p><strong>Apresentação:</strong> {m.apresencao}</p>
              <p><strong>Via:</strong> {m.via_admi}</p>
              <p><strong>Especial:</strong> {m.especial}</p>
              <p><strong>Tipo:</strong> {m.tipo_med}</p>
              <br />
            </div>
          ))}
        </div>
      <div className={css["btn-back"]}>
            <Link href ='/Homepage'className={css["btn"]}
  >Voltar</Link>
     </div>
      </div>

      <div className={css["borda"]}>
        {
          isClient &&
            <QRCode
              value={location?.href || "no url"}
            />
        }
     </div>
    </div>
  );
}
