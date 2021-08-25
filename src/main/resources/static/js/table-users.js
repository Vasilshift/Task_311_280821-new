
const a = document.querySelector('.table-users-object')
const requrl = 'http://localhost:8080/api/users'

function rol(u) {
    let userRole = "[";
    for (let i = 0; i < u.roles.length; i++) {
        userRole += u.roles[i].name.substring(5);
        if (i != (u.roles.length - 1)) {
        userRole += ", ";
        }
    }
    userRole += "]";
    return userRole;
}

let allUsers;
fetch('http://localhost:8080/api/users')
    .then(res => res.json())
    .then(data => allUsers = data)
    .then(() => console.log(allUsers))


function createTableUsers(){
    return (
        fetch(requrl).then(
            res => {
                res.json().then(
                    data => {
                        console.log('Display all users from database', data);
                        let temp = "";
                        data.forEach((u) => {
                            temp += '<tr>'
                            temp += '<td>' + u.id + '</td>'
                            temp += '<td>' + u.username + '</td>'
                            temp += "<td>" + u.age + "</td>"
                            temp += "<td>" + u.email + "</td>"
                            temp += "<td>" + rol(u) + "</td>"
                            temp += `<td><a href="#" class="btn btn-primary" data-btn="editUser" data-id='${u.id}'>Edit</a></td>`
                            temp += `<td><a href="#" class="btn btn-danger" data-btn="deleteUser" data-id='${u.id}'>Delete</a></td>`
                            temp += "</tr>"
                        })
                        a.innerHTML = temp;
                    })
            })
    )
}

createTableUsers()

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    if (btnType === 'editUser') {
        const oneUserfromDB = allUsers.find(f => f.id === id)
        modalEditUser.setContent(`
            <div class="update_body">
                <div class="update-content">
                    <div class="form-group">
                        <label for="id">ID</label>
                        <input readonly type="number" th:field="*{id}" id="id" placeholder="${id}">
                        <label for="firstName">Username</label>
                        <input type="text" th:field="*{username}" id="firstName" placeholder="${oneUserfromDB.username}">
                        <label for="age">Age</label>
                        <input type="number" th:field="*{age}" id="age" placeholder="${oneUserfromDB.age}">
                        <label for="email">Email</label>
                        <input type="text" th:field="*{email}" id="email" placeholder="${oneUserfromDB.email}">
                        <label for="selectRoleEd"><b>Role</b></label>
                             <select multiple size="2" class="form-control" id="selectRoleEd" name="role">
                                <option value="1" name="ROLE_ADMIN">ADMIN</option>
                                <option value="2" name="ROLE_USER">USER</option>
                             </select>             
                    </div>
                </div>
            </div>
       `)
        modalEditUser.open()
        console.log('One user from DB: ', oneUserfromDB)
    }
    if (btnType === 'deleteUser') {
        const oneUserfromDB = allUsers.find(f => f.id === id)
        modalDeleteUser.setContent(`
            <div class="update_body">
                <div class="update-content">
                    <div class="form-group">
                        <label for="id">ID</label>
                        <input readonly type="number" th:field="*{id}" id="id" placeholder="${id}">
                        <label for="firstName">Username</label>
                        <input type="text" th:field="*{username}" id="firstName" placeholder="${oneUserfromDB.username}">
                        <label for="age">Age</label>
                        <input type="number" th:field="*{age}" id="age" placeholder="${oneUserfromDB.age}">
                        <label for="email">Email</label>
                        <input type="text" th:field="*{email}" id="email" placeholder="${oneUserfromDB.email}">
                        <label for="selectRoleEd"><b>Role</b></label>
                             <select multiple size="2" class="form-control" id="selectRoleEd" name="role">
                                <option value="1" name="ROLE_ADMIN">ADMIN</option>
                                <option value="2" name="ROLE_USER">USER</option>
                             </select>             
                    </div>
                </div>
                
                <a href="#" class="btn btn-danger delut" data-btn="deleteUser1">Delete</a>
                
                
            </div>
  
<!--    <input type="submit" value="Update User">-->

       `)
        modalDeleteUser.open()
        console.log('One user from DB: ', oneUserfromDB)
    }



})


