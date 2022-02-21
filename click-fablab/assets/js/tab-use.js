const tab = document.querySelector(".tab-use");
const fetchReq = fetch('/api/use/all-uses').then((res) => res.json());
const data = Promise.all([fetchReq])
const thead = document.createElement("thead")
const th1 = document.createElement("th")
const th2 = document.createElement("th")
const th3 = document.createElement("th")
const th4 = document.createElement("th")
const th5 = document.createElement("th")
const th6 = document.createElement("th")
const th7 = document.createElement("th")
th1.textContent = "Id"
th2.textContent = "Date"
th3.textContent = "Durée"
th4.textContent = "Équipement"
th5.textContent = "Email de l'utilisateur"
th6.textContent = "Id Facture"
thead.appendChild(th1)
thead.appendChild(th2)
thead.appendChild(th3)
thead.appendChild(th4)
thead.appendChild(th5)
thead.appendChild(th6)
tab.appendChild(thead)


data.then((res) => {
    res[0].forEach(element => {
        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        const td3 = document.createElement("td")
        const td4 = document.createElement("td")
        const td5 = document.createElement("td")
        const td6 = document.createElement("td")
        const tr = document.createElement("tr")
        td1.textContent = element.id
        td2.textContent = element.date.split("T")[0]
        td3.textContent = element.duration
        td4.textContent = element.equipment.name
        td5.textContent = element.user.email
        td6.textContent = element.invoiceId
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
        tab.appendChild(tr)
    });
})