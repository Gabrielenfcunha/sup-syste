
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePubli = process.env.NEXT_PUBLIC_SUPABASE_PUB;

const supabaseSecret = process.env.SUPABASE_SECRET;

export const supabaseClient = createClient ( supabaseUrl , supabasePubli );

export const supabaseServer = supabaseSecret && createClient ( supabaseUrl , supabaseSecret );

if (supabaseServer && supabaseSecret) {
  supabaseServer.query = function (query) {
    return fetch(`${supabaseUrl}/graphql/v1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseSecret
        },
        body: JSON.stringify({ query }),
      })
      .then(async response => {
        const output = await response.json();
        return output;
      })
      .catch(error => console.error('Error:', error));
  }
}