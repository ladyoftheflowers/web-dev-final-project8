import { fetchUsers, postUser, deleteUser } from '../api_client.mjs'

//delete user 
window.delUser = async (id) => {
    await deleteUser(id);

    if (!alert(`User with id ${id} deleted!`)) { window.location.reload(); }

    return false;
}

$(document).ready(async function () {
    //users table
    const usersTable = $('#users-table-body');

    if (usersTable != null) {
        const users = await fetchUsers();

        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            usersTable.append(
                `
                <tr>
                    <td>${user._id}</td>
                    <td>${user.username}</td>
                    <td>${user.admin}</td>
                    <!-- <td><a href="#" class="edit">edit..</a></td> -->
                    <td><a href="#" class="delete" onclick="delUser('${user._id}')">delete..</a></td>
                </tr>
                `
            );
        }
    }

});

const form = document.querySelector("#create-user-form");

async function createUser() {
    const formData = new FormData(form);

    try {
        const newUser = await postUser(
            formData.get("username"),
            formData.get("email"),
            formData.get("password"),
            formData.get("admin") == "on"
        );
        alert(`User ${newUser.username} created!`);
    } catch (err) {
        alert(`Could not add user: ${err}`);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    createUser();
});