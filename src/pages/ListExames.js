import { useRouter } from 'next/navigation';
import React from 'react';
import { postJson } from '@/util/http';
import { Loader } from '@/components/loader';
import Link from "next/link";
import css from "../styles/listVacina.module.scss";

export default function Listexames() {

  const router = useRouter();
  const [values, setValues] = React.useState([]);

  async function fetchexame() {
    const token = localStorage.getItem("token"); // obrigatório

    const { data, error } = await postJson(
      '/api/exames/list',
      { token }
    );

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
      <h2>Exames</h2>

      <table>
        <thead>
          <tr>
            <th>Nome do pet</th>
            <th>Exame</th>
            <th>Data Exame</th>
            <th>Detalhe</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {values.length > 0 ? (
            values.map((value) => (
              <tr key={value.id}>
                <td>{value.pet?.name ?? "—"}</td>
                <td>{value.exames}</td>
                <td>{value.data_exames}</td>
                <td>{value.detalhe}</td>

                <td>
                  <button
                    className={css["btn-edit"]}
                    onClick={() => router.push(`/edit-exames/${value.id}`)}
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
                        '/api/exames/delete',
                        { id: value.id, token: localStorage.getItem("token") }
                      );

                      if (!error) fetchexame();
                    }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className={css['empty']} colSpan="6">
                Nenhum exame cadastrado ainda 🐶
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={css["btn-back"]}>
        <Link href="/Homepage" className={css["btn-b"]}>Voltar</Link>
      </div>

      <div className={css["btn-back"]}>
        <Link href="/SignUpExames" className={css["btn-b"]}>+</Link>
      </div>
    </div>
  );
}
