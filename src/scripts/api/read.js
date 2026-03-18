/* está exportando uma função assincrona que recebe o argumento apiUrl, que é definido no app.js como o endereço url do objeto
- pega as informações da url da api, armazena no response
- tranforma os dados brutos em um json, tornando mais facil a leitura do array
- se der erro, lança um erro  e para tudo*/
export async function getUsers(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to fetch users'
    );
  }

  return data.users;
}