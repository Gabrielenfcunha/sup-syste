import { useRouter } from 'next/navigation';
import React from 'react';
import { postJson } from '@/util/http';
import { Loader } from '@/components/loader';
import Link from "next/link";
import css from "../styles/listVacina.module.scss";

export default function ListVermifugo() {

  const router = useRouter();
  const [values, setValues] = React.useState([]);

  async function fetchvermifugo() {
    const { data, error } = await postJson('/api/vermifugo/list', {});

    if (error) {
      alert('erro');
    } else {
      // Remove itens sem pet para evitar erros
      setValues(data.filter(v => v.pet));
    }
  }

  React.useEffect(() => {
    fetchvermifugo();
  }, []);

  return (
    <div className={css["list-vacina"]}>
      <Loader active={!values.length} />

      <h2>Vermífugo</h2>

      <table>
        <thead>
          <tr>
            <th>Nome do pet</th>
            <th>Vermífugo</th>
            <th>Tipo vermífugo</th>
            <th>Data</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {values.length > 0 ? (
            values.map((value) => (
              <tr key={value.id}>
                <td>{value.pet?.name || "—"}</td>
                <td>{value.vermifugo}</td>
                <td>{value.tipo_vermifugo}</td>
                <td>{value.data_vermifugo}</td>

                <td>
                  <button
                    className={css["btn-edit"]}
                    onClick={() => router.push(`/edit-vermifugo/${value.id}`)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    className={css["btn-delete"]}
                    onClick={async () => {
                      if (!window.confirm('tem certeza?')) return;

                      const { error } = await postJson(
                        '/api/vermifugo/delete',
                        { id: value.id }
                      );

                      if (!error) fetchvermifugo();
                    }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className={css['empty']}>
                Nenhum vermífugo cadastrado ainda 🐶
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Link href='/Homepage' className={css["btn-back"]}>Voltar</Link>
      <Link href='/SignUpVermifugo' className={css["btn-back"]}>+</Link>
    </div>
  );
}
