// PUT — atualização completa
export async function updateUser(  //função pra atualizar o usuario, recebe o caminho da api, e um obj com as info
  apiUrl, id, { name, age, email } //                                                   necessarias para atualizar
) {
  const response = await fetch( //faz uma requisição para a api
    `${apiUrl}?id=${id}`, {     //indica o caminho da api, e o id do usuario que vai ser atualizado
      method: 'PUT',            //utiliza o metodo put, pra atualiza completin
      headers: {
        'Content-Type': 'application/json'  //especifica que o conteudo éjson pra api entender
      },
      body: JSON.stringify({    //transforma o obj em json
        name,
        age: Number(age),       //informa que a idade é numero e n string
        email
      }),
    }
  );

  const data = await response.json(); //resposta da api vira json tarara

  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to update user' //msg de erro tarara
    );
  }

  return data;
}

// PATCH — atualização parcial
export async function patchUser( //função pra atualizar parcialmente
  apiUrl, id, fields             //recebe o endereço da api, o id do user e um obj com dados que vao mudar
) {
  if (fields.age !== undefined) {
    fields.age = Number(fields.age); //define que a idade é number se a idade for enviada
  }

  const response = await fetch( //vai na api com o id do user
    `${apiUrl}?id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields),
    }
  );

  const data = await response.json(); //resposta da api vira json tarara

  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to patch user' //msg de erro tarara
    );
  }

  return data;
}