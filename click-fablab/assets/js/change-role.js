const tab = document.querySelector(".tab-use");
const fetchReq = fetch('/api/user/all-users').then((res) => res.json());
const fetchReq1 = fetch('/api/role/all-roles').then((res) => res.json());
const data = Promise.all([fetchReq,fetchReq1])
const user = document.querySelector("#user")
const role = document.querySelector("#role")

data.then((res) => {
    res[0].forEach(element => {
        let option = document.createElement('option');
        option.value = element.id;
        option.textContent = `${element.first_name} ${element.last_name} : ${element.email}`
        user.appendChild(option)
    });
    res[1].forEach(element => {
        let option = document.createElement('option');
        option.value = element.id;
        option.textContent = `${element.role}`
        role.appendChild(option)
    });

})