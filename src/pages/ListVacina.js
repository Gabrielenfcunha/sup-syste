import { useRouter } from 'next/navigation';
import React from 'react';
import { postJson } from '@/util/http';
import { Loader } from '@/components/loader';
import Link from "next/link";
import css from "../styles/listVacina.module.scss";

export default function Listvacina() {

  const router = useRouter();
  const [values, setValues] = React.useState([]);

  async function fetchexame() {
    const { data, error } = await postJson('/api/vacina/list', { token });

    if (error) {
      alert('erro');
    } else {
      // remove registros sem pet para evitar erros
      setValues(data.filter(v => v.pet));
    }
  }

  React.useEffect(() => {
    fetchexame();
  }, []);

  return (
    <div className={css["list-vacina"]}>
      <Loader active={!values.length} />
      <h2>Vacina</h2>

      <table>
        <thead>
          <tr>
            <th>Nome do pet</th>
            <th>Vacina</th>
            <th>Marca</th>
            <th>Veterinário</th>
            <th>Dose</th>
            <th>Fabricação</th>
            <th>Vencimento</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {values.length > 0 ? (
            values.map((value) => (
              <tr key={value.id}>
                <td>{value.pet?.name || "—"}</td>
                <td>{value.vacina}</td>
                <td>{value.marca}</td>
                <td>{value.veterinario}</td>
                <td>{value.dose}</td>
                <td>{value.fabricacao}</td>
                <td>{value.vencimento}</td>

                <td>
                  <button
                    className={css["btn-edit"]}
                    onClick={() => router.push(`/edit-vacina/${value.id}`)}
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
                        '/api/vacina/delete',
                        { id: value.id }
                      );

                      if (!error) {
                        fetchexame();
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
              <td className={css['empty']} colSpan="9">
                Nenhuma vacina cadastrada ainda 🐶
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Link href='/Homepage' className={css["btn-back"]}>Voltar</Link>
      <Link href='/SignUpVacina' className={css["btn-back"]}>+</Link>

    </div>
  );
}
