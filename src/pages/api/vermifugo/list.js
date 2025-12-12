import { supabaseServer as supabase } from "@/util/supabase";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { token } = req.body;

  const { data: { user }, error: supaError } = await supabase.auth.getUser(token);

  if (!user || supaError) {
    return res.status(403).json({ error: supaError, data: null });
  }

  const userId = user.id;

  const { data, error } = await supabase
    .from('vermifugoo')
    .select(`
      id,
      vermifugo,
      data_vermifugo,
      tipo_vermifugo,
      pet(id, name, dono)
    `)
    .filter('pet.dono', 'eq', userId);

  return res.status(200).json({ data, error });
}
