export async function updateUser(  //função pra atualizar o usuario, recebe o caminho da api, e um obj com as info
  apiUrl, id, { name, age, email } //                                                   necessarias para atualizar
) {
  const response = await fetch(
    `${apiUrl}?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        age: Number(age),
        email
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to update user'
    );
  }

  return data;
}

// PATCH — atualização parcial
export async function patchUser(
  apiUrl, id, fields
) {
  if (fields.age !== undefined) {
    fields.age = Number(fields.age);
  }

  const response = await fetch(
    `${apiUrl}?id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to patch user'
    );
  }

  return data;
}