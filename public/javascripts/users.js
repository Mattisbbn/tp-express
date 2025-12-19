async function getUsers() {
  const response = await fetch("/api/users", { method: "GET" });
  const responseJson = await response.json();
  const users = responseJson.data;

  return users;
}

const tableBody = document.querySelector("#table-body")

async function fillTable() {
  const users = await getUsers();

 users.forEach(user => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <th scope="row">${user.id}</th>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <a href="/admin/dashboard/user/${user.id}">
          <i class="fa-solid fa-eye"></i>
        </a>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

fillTable();