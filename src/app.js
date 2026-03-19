//importando as funções dos outros arqvs
import { createUser } from './scripts/api/create.js';
import { renderUsers, findUserById  } from './scripts/dom/render.js';
import { deleteUser } from './scripts/api/delete.js';
import { updateUser, patchUser } from './scripts/api/update.js';

const apiUrl = 'http://localhost:8000/api/users'; //definindo a url da api
const form = document.getElementById('create-user-form'); //definindo o form
const formTitle = document.getElementById('form-title'); //definindo o titulo do form, ou edição ou criação
const submitBtn = form.querySelector('button[type="submit"]'); //definindo o botão de envio
const cancelBtn = document.getElementById('cancel-edit'); //definindo o botão de cancelamento
const usersSection = document.getElementById('users'); //definindo a seção dos usuários
const formError = document.getElementById('form-error'); //definindo o erro do formulário

//Estados de edição
let editingId = null; //inicializando o id de edição para quando o usuario editar, o id do alvo da edição se torne esse
let originalUser = null; //usuario original, para caso cancele a edição


// Quando o DOM estiver pronto, renderiza
document.addEventListener(//quando
  'DOMContentLoaded', //a pagina carregar
  () => renderUsers(apiUrl)//renderiza os usuarios pela api
);
;

// adquire o usuario do card mais proximo do botao clocado, encontrando o id e procurando na api pelo user com esse id
function getUserFromCard(button) {
  const card = button.closest('.user-card');
  return findUserById(Number(card.id));
}

// modo de edição, 
function enterEditMode(user) {
  editingId = user.id;    //determina que o id do usuario é o id sendo editado
  originalUser = { ...user };  //envia a uma array as informações do usuario (caso cancele a edição, tds as info ficam 
                               //                                  armazenadas aqui, pra voltar a ser igual ao original)
  // Preenche o formulário, mudando os valores para o respectivo no user
  document.getElementById('name').value
    = user.name;
  document.getElementById('age').value
    = user.age;
  document.getElementById('email').value
    = user.email;

  // Muda a interface, mudando o titulo do form e o texto do botao, e deixando o botão de cancelar visível
  formTitle.textContent = 'Edit User';
  submitBtn.textContent = 'Update';
  cancelBtn.style.display = '';

  // Foca no primeiro campo:
  document.getElementById('name').focus();
}

//saindo do modo de editção
function exitEditMode() {
  editingId = null; //torna o id de edição nulo dnv
  originalUser = null;  //e o user tbm nulo dnv
  formTitle.textContent = 'Create User'; //o titulo do form volta a ser oq era
  submitBtn.textContent = 'Create';      //o texto do botão volta a ser oq era 
  cancelBtn.style.display = 'none';      //o botao de cancelar ganha display none (some)
  form.reset();
}

//funçao de erro
function showError(message) {           
  formError.textContent = message;
  formError.classList.remove('d-none');
}

//funçao de esconder erro
function hideError() {
  formError.classList.add('d-none');
  formError.textContent = '';
}

usersSection.addEventListener('click',
  async (event) => {
    const { target } = event;

    if (target.dataset.action === 'edit') {
      enterEditMode(getUserFromCard(target));
    }

    if (target.dataset.action === 'delete') {
      const user = getUserFromCard(target);

      if (!confirm(
        'Are you sure you want to '
        + 'delete this user?'
      )) return;

      try {
        await deleteUser(apiUrl, user.id);

        if (editingId === user.id)
          exitEditMode();

        renderUsers(apiUrl);
      } catch (error) {
        showError(error.message);
      }
    }
  }
);
form.addEventListener('submit',
  async (event) => {
    event.preventDefault();

    const name =
      document.getElementById('name').value;
    const age =
      document.getElementById('age').value;
    const email =
      document.getElementById('email').value;

    hideError();

    try {
      if (editingId !== null) {
        // === MODO EDIÇÃO ===

        // Descobre o que mudou:
        const changed = {};
        if (name !== originalUser.name)
          changed.name = name;
        if (Number(age) !== originalUser.age)
          changed.age = age;
        if (email !== originalUser.email)
          changed.email = email;

        // Nada mudou? Sai da edição.
        if (Object.keys(changed).length === 0) {
          exitEditMode();
          return;
        }

        // Todos mudaram → PUT (completo)
        // Alguns mudaram → PATCH (parcial)
        const allChanged =
          Object.keys(changed).length === 3;

        if (allChanged) {
          await updateUser(
            apiUrl, editingId,
            { name, age, email }
          );
        } else {
          await patchUser(
            apiUrl, editingId, changed
          );
        }
      } else {
        // === MODO CRIAÇÃO ===
        await createUser(
          apiUrl, { name, age, email }
        );
      }

      exitEditMode();
      renderUsers(apiUrl);
    } catch (error) {
      showError(error.message);
    }
  }
)
cancelBtn.addEventListener(
  'click', exitEditMode
);
