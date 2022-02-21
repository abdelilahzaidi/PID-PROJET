const tab = document.querySelector(".tab-invoice");
const fetchReq = fetch('/api/invoice/all-invoices').then((res) => res.json());
const data = Promise.all([fetchReq])
const thead = document.createElement("thead")
const th1 = document.createElement("th")
const th2 = document.createElement("th")
const th3 = document.createElement("th")
const th4 = document.createElement("th")
const th5 = document.createElement("th")
const th6 = document.createElement("th")
const th7 = document.createElement("th")
th1.textContent = "Numéro"
th2.textContent = "Date"
th3.textContent = "Montant Total"
th4.textContent = "Nom"
th5.textContent = "Prénom"
th6.textContent = "Détails facture"
th7.textContent = "Payé"
thead.appendChild(th1)
thead.appendChild(th2)
thead.appendChild(th3)
thead.appendChild(th4)
thead.appendChild(th5)
thead.appendChild(th6)
thead.appendChild(th7)
tab.appendChild(thead)

data.then((res) => {
    res[0].forEach(element => {
        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        const td3 = document.createElement("td")
        const td4 = document.createElement("td")
        const td5 = document.createElement("td")
        const td6 = document.createElement("button")
        const td7 = document.createElement("td")

        td1.textContent = element.name
        td2.textContent = element.date_end.split("T")[0]
        td3.textContent = `${element.total_amount} €`
        td4.textContent = `${element.user.last_name}`
        td5.textContent = `${element.user.first_name}`
        td6.textContent = `Details`
        td7.textContent = element.paid ? `Oui` : `Non`
        td6.classList = `btn btn-primary btn-details`
        td6.setAttribute("name","id")
        td6.value = `${element.id}`
        td6.style.margin = ".5rem"
        td6.type = "submit"
        const tr = document.createElement("tr")
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
        tr.appendChild(td7)
        tab.appendChild(tr)
    });
})