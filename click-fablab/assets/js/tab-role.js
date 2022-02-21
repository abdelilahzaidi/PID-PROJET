const tab = document.querySelector(".tab-role");
const fetchReq = fetch('/api/role/all-roles').then((res) => res.json());
const data = Promise.all([fetchReq])
const thead = document.createElement("thead")
const th1 = document.createElement("th")
const th2 = document.createElement("th")
th1.textContent = "Id"
th2.textContent = "Nom"
thead.appendChild(th1)
thead.appendChild(th2)
tab.appendChild(thead)


data.then((res) => {
    res[0].forEach(element => {
        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        const tr = document.createElement("tr")
        td1.textContent = element.id
        td2.textContent = element.role
        tr.appendChild(td1)
        tr.appendChild(td2)
        tab.appendChild(tr)
    });
})