import { useRouter } from 'next/navigation';
import React from 'react';
import { postJson } from '@/util/http';
import { Loader } from '@/components/loader';
import Link from "next/link";
import css from "../styles/listVacina.module.scss";

export default function ListMedicacao() {

  const router = useRouter();
  const [values, setValues] = React.useState([]);

  async function fetchmedicacao() {
    const { data, error } = await postJson('/api/medicacao/list', {});

    if (error) {
      alert('erro');
    } else {
      // remove medicamentos sem pet associado
      setValues(data.filter(v => v.pet));
    }
  }

  React.useEffect(() => {
    fetchmedicacao();
  }, []);

  return (
    <div className={css["list-vacina"]}>
      <Loader active={!values.length} />

      <h2>Medicação</h2>

      <table>
        <thead>
          <tr>
            <th>Nome do pet</th>
            <th>Medicação</th>
            <th>Quantidade</th>
            <th>Apresentação</th>
            <th>Via Adm.</th>
            <th>Especial</th>
            <th>Tipo</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {values.length > 0 ? (
            values.map((value) => (
              <tr key={value.id}>
                <td>{value.pet?.name || "—"}</td>
                <td>{value.medicamento}</td>
                <td>{value.quantidade}</td>
                <td>{value.apresencao}</td>
                <td>{value.via_admi}</td>
                <td>{value.especial}</td>
                <td>{value.tipo_med}</td>

                <td>
                  <button
                    className={css["btn-edit"]}
                    onClick={() => router.push(`/edit-medicacao/${value.id}`)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    className={css["btn-delete"]}
                    onClick={async () => {
                      if (!window.confirm('Tem certeza?')) return;

                      const { error } = await postJson(
                        '/api/medicacao/delete',
                        { id: value.id }
                      );

                      if (!error) {
                        fetchmedicacao();
                      }
                    }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className={css.empty} colSpan="9">
                Nenhuma medicação cadastrada ainda 🐶
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Link href='/Homepage' className={css["btn-back"]}>Voltar</Link>
      <Link href='/SignUpMedicacao' className={css["btn-back"]}>+</Link>
    </div>
  );
}
