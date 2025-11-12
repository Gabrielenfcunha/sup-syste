
export default function PetList(props) {

  const { values, onChange } = props;

  return <div>
        <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Especie</th>
            <th>Raça</th>
            <th>Castrdo</th>
            <th>Data</th>
            <th>---</th>
          </tr>
        </thead>
        <tbody>
          {values.map((value)=>
            <tr>
              <th>{value.name}</th>
              <th>{value.especie}</th>
              <th>{value.raca}</th>
              <th>{value.castrdo}</th>
              <th>{value.data}</th>
            </tr>         
          )}
           
        </tbody>
      </table>
      <button><Link href ='/Homepage'>Voltar</Link></button>

    </div>
  </div>
}