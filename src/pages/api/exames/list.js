import { supabaseServer as supabase } from "@/util/supabase";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const submitedData = req.body;
  const token = submitedData.token;

  // Verifica usuário autenticado
  const { data: { user }, error: supaError } = await supabase.auth.getUser(token);
  const userId = user?.id;

  if (!userId || supaError) {
    return res.status(403).json({ error: "Usuário não autorizado", data: null });
  }

  // Consulta exames filtrando pelo dono
  const { data, error } = await supabase
    .from('exames')
    .select(`
      id,
      exames,
      data_exames,
      detalhe,
      pet(id, name, dono)
    `)
    .eq('pet.dono', userId);

  return res.status(200).json({ data, error });
}
