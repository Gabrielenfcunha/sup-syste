// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabaseServer as supabase } from "@/util/supabase";
import { postJson } from '@/util/http';

export default async function handlerDelete(req, res) {
   if (req.method === 'POST') {
    const submitedData = req.body; // Automatically parsed JSON

    const token = submitedData.token;
    const { data: { user }, error:supaError } = await supabase.auth.getUser(token);

    const userId = user?.id;

    if (!userId || supaError) {
      res.status(403).json({ error: supaError, data: null });
    }

    if (!(await belongsToUser(submitedData.id, userId))) {
      return res.status(405).json({ error: 'Not Allowed' });
    }
    
    const {data, error} = await supabase
    .from('medicamento')
    .delete()
    .eq('id', submitedData.id)  // ou o campo que identifica a vacina
    ; 

    res.status(200).json({ data, error });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }

  res.status(200).json({ error: 123, data: null });
}

async function belongsToUser (vacId, userId) {
  const {data, error} = await supabase
    .from('medicamento')
    .select('id, pet(dono)')
    .eq('id', vacId)
    .eq('pet.dono', userId);

  if (error) {
    console.error(error);
    return false;
  }

  if (data.length) {
    return true;
  }

  return false;
}