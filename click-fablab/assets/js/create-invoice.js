const fetchReq = fetch('/api/user/all-users').then((res) => res.json());
const data = Promise.all([fetchReq])
const user = document.querySelector("#user")
data.then((res) =>{
res[0].forEach(element => {
    let option = document.createElement('option')
    option.value = element.id
    option.textContent = `${element.first_name} ${element.last_name} : ${element.email}`
    user.appendChild(option)
});
})