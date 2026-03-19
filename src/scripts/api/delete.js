export async function deleteUser(apiUrl, id) { //ecportando a função pra deletar user
  const response = await fetch( //define no response a resposta da api, usando o 
    `${apiUrl}?id=${id}`,       //caminho da api com o id do user e usando delete
    { method: 'DELETE' }
  );

  const data = await response.json(); //transforma a resposta da api em json pra 
                                      // deixar mais facil a leitura para o js
  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to delete user' //msg de erro tarara
    );
  }

  return data;
}