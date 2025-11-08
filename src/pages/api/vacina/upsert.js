// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabaseServer as supabase } from "@/util/supabase";

export default async function handler(req, res) {
   if (req.method === 'POST') {
    const submitedData = req.body; // Automatically parsed JSON

    const token = submitedData.token;
    const { data: { user }, error:supaError } = await supabase.auth.getUser(token);

    const userId = user?.id;

    if (!userId || supaError) {
      res.status(403).json({ error: supaError, data: null });
    }

    delete submitedData.token;
    
    const {data, error} = await supabase
      .from('vacina')
      .upsert(submitedData);

    res.status(200).json({ data, error });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }

  res.status(200).json({ error: 123, data: null });
}