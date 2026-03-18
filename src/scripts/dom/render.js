import { getUsers } from '../api/read.js';//importando o getUsers

let usersCache = []; //definindo um cache para usuarios, vazio

export function findUserById(id) { //função procura o user pelo id fornecido, usando o cache
  return usersCache.find(
    (user) => user.id === id
  );
}

export async function renderUsers(apiUrl) { //função para renderizar os usuarios; 
  const users = await getUsers(apiUrl);     //Transfere os dados pelo getUsers para o cache (deixa mais facil a leitura
  usersCache = users;                       //                                                e manipulação dos dados)

  const usersSection =
    document.getElementById('users');

  if (users.length === 0) { //se n tiver usuarios, muda o texto para "No users found"
    usersSection.innerHTML =
      '<p class="text-muted">No users found.</p>';
    return;
  }

  usersSection.innerHTML = '';  //se tiver usuarios, deixa a seção limpa, pra no futuro adcionar usuarios

  users.forEach((user) => { //para cada usuario, cria um elemento div, com a classe col-md-3 (bootstrap), e adciona o   
    const userDiv = document.createElement('div');//                                          card do usuario em html
    userDiv.classList.add('col-md-3');

    userDiv.innerHTML = `
      <div class="card user-card h-100"
           id="${user.id}">
        <div class="card-body">
          <h5 class="card-title">
            ${user.name}
          </h5>
          <p class="card-text mb-1">
            <strong>Age:</strong> ${user.age}
          </p>
          <p class="card-text">
            <strong>Email:</strong> ${user.email}
          </p>
        </div>
        <div class="card-footer d-flex gap-2">
          <button data-action="edit">Edit</button>
          <button data-action="delete">Delete</button>
        </div>
      </div>
    `;

    usersSection.appendChild(userDiv); //add o card do usuario como filho do users
  });
}