export async function createUser( //exportando a function para criar usuários, recebendo um obj da api com info do user
  apiUrl, { name, age, email }
) {
  const response = await fetch(apiUrl, { //faz uma requisição a api
    method: 'POST', //define que o metodo é post (criação)
    headers: {
      'Content-Type': 'application/json'   //define que o conteudo é json, caso fosse sem, a api pode n entender
    },
    body: JSON.stringify({  //define o corpo da requisição, transformando o obj em json
      name,
      age: Number(age),
      email
    }),
  });

  const data = await response.json(); //resposta vira json tarara

  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to create user' //se der erro da msg de erro 
    );
  }

  return data;
}