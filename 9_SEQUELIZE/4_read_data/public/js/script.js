document.addEventListener('DOMContentLoaded', async () => {
    const tbody = document.querySelector('#tbody');

    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    console.log(users);

    users.forEach(user => {
        tbody.innerHTML += `
        <tr>
            <th scope="row">${user.id}</th>
            <td>${user.name}</td>
            <td>${user.occupation}</td>
        </tr>`;
    });
});