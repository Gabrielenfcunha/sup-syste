export async function postJson (url, data) {
  const token = JSON.parse(sessionStorage.getItem('token') || "");
  return await (await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...data, token: token?.session?.access_token})
  })).json();
}
