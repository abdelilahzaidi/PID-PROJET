const fetchReq = fetch('/api/equipment/all-equipment').then((res) => res.json());
const fetchReq1 = fetch('/api/user/all-users').then((res) => res.json());
const data = Promise.all([fetchReq, fetchReq1])
const equipment = document.querySelector("#machine")
const user = document.querySelector("#user")
const price = document.querySelector("#price")
const button = document.querySelector(".id")
let array;
function changePrice(data) {
    let resultat = array.filter(element => data.value == element.id)
    price.value = resultat[0].price;
    }

data.then((res) =>{

    array = res[0]
    array.forEach(element => {

            let option = document.createElement('option')
            option.value = element.id
            option.textContent = ` ${element.name}`
            equipment.appendChild(option)


    });
    res[1].forEach(element =>{
        let option = document.createElement('option')
        option.value = element.id
        option.textContent = `${element.first_name} ${element.last_name} : ${element.email}`
        user.appendChild(option)
    })


})

