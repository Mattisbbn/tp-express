const userId = window.location.pathname.split("/").pop();

const idDom = document.querySelector('#id')
const nameDom = document.querySelector('#name')
const emailDom = document.querySelector('#email')
const roleDom = document.querySelector('#role')


async function getUser() {
  const response = await fetch("/api/user/" + userId, { method: "GET" });
  const responseJson = await response.json();
  const users = responseJson.data;

  return users;
}

async function fillPage(){
    const user = await getUser()

    idDom.innerHTML = user.id
    nameDom.innerHTML = user.name
    emailDom.innerHTML = user.email
    roleDom.innerHTML = user.role
}

fillPage()