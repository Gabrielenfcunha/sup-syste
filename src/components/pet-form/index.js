
export default function PetForm(props) {

  const { values, onChange } = props;

  return <div>
    <input
          placeholder='Name'
          name='name'
          value={values['name']}
          onChange={onChange}
         />
         <input
          placeholder='Especie'
          name='especie'
          value={values['especie']}
          onChange={onChange}
         />
       <input
          placeholder='Castrado'
          name='castrdo'
          value={values['castrdo']}
          onChange={onChange}
         />
         <input
          placeholder='Raça'
          name='raca'
          value={values['raca']}
          onChange={onChange}
         />

         <input
          name='data'
          value={values['data']}
          onChange={onChange}
          type='date'
         />
  </div>
}
