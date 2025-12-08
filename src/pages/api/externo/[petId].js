// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabaseServer as supabase, supabaseServer } from "@/util/supabase";

export default async function handler(req, res) {
   if (req.method === 'POST' ||true) {
    const petId = req.query.petId;
    // const submitedData = req.body; // Automatically parsed JSON

    // const token = submitedData.token;
    // const id = submitedData.id;
    // const { data: { user }, error:supaError } = await supabase.auth.getUser(token);

    // const userId = user?.id;

    // if (!userId || supaError) {
    //   res.status(403).json({ error: supaError, data: null });
    // }

    const { data, error } = await supabaseServer
      .from('pets')
      .select(`
        id,
        especie,
        raca,
        castrdo,
        name,
        sexo,
        dono,
        vacina (id, vacina,marca,veterinario,fabricacao,vencimento,dose),
        exames (id, exames,data_exames,detalhe),
        consulta (id, consulta,data_consulta,detalhes,horaio,veterinario,local),
        vermifugoo (id, vermifugo,data_vermifugo,tipo_vermifugo),
        medicamento (id, medicamento,quantidade,apresencao,via_admi,especial,tipo_med)
      `)
      .eq('id', petId)
      .limit(1);

    res.status(200).json({ data: data?.[0], error });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }

  res.status(200).json({ error: 123, data: null });
}
