const tab = document.querySelector(".tab-user");
const fetchReq = fetch('/api/user/all-users').then((res) => res.json());
const data = Promise.all([fetchReq])
const thead = document.createElement("thead")
const th1 = document.createElement("th")
const th2 = document.createElement("th")
const th3 = document.createElement("th")
const th4 = document.createElement("th")
const th5 = document.createElement("th")
const th6 = document.createElement("th")
const th7 = document.createElement("th")
th1.textContent = "Prénom"
th2.textContent = "Nom"
th3.textContent = "E-mail"
th4.textContent = "Role"
thead.appendChild(th1)
thead.appendChild(th2)
thead.appendChild(th3)
thead.appendChild(th4)
tab.appendChild(thead)

data.then((res) => {
    res[0].forEach(element => {
        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        const td3 = document.createElement("td")
        const td4 = document.createElement("td")
        const td5 = document.createElement("button")
        const td6 = document.createElement("button")
        let el_role = " "
        element.roles.forEach(role =>{
            el_role = el_role + ' ' + role.role
        })
        td1.textContent = element.first_name
        td2.textContent = element.last_name
        td3.textContent = element.email
        td4.textContent = el_role
        td5.textContent = `Facture`
        td5.classList = `btn btn-primary btn-details`
        td5.setAttribute("name","id")
        td5.value = `invoice:${element.id}`
        td5.style.margin = ".5rem"
        td5.type = "submit"
        td6.textContent = `Utilisation`
        td6.classList = `btn btn-primary btn-details`
        td6.setAttribute("name","id")
        td6.value = `use:${element.id}`
        td6.style.margin = ".5rem"
        td6.type = "submit"
        const tr = document.createElement("tr")
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
        tab.appendChild(tr)
    });
})