const tab = document.querySelector(".tab-equipment");



const fetchReq = fetch('/api/equipment/all-equipment').then((res) => res.json());

const data = Promise.all([fetchReq])
const utilisateur = document.createElement("h2")
const thead = document.createElement("thead")
const th1 = document.createElement("th")
const th2 = document.createElement("th")
const th3 = document.createElement("th")
th1.textContent = "Nom"
th2.textContent = "Prix"
th3.textContent = "Disponibilité"
thead.appendChild(th1)
thead.appendChild(th2)
tab.appendChild(thead)


data.then((res) => {
    res[0].forEach(element => {
        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        const td3 = document.createElement("td")
        const tr = document.createElement("tr")
        td1.textContent = element.name
        td2.textContent = element.price
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tab.appendChild(tr)
    });
})