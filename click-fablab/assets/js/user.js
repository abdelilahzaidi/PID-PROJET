const fetchReq = fetch('/api/equipment/all-equipment').then((res) => res.json());
const data = Promise.all([fetchReq])
const equipment = document.querySelector("#machine")
const price = document.querySelector("#price")
const button = document.querySelector(".id")
let array;
function changePrice(data) {
    let resultat = array.filter(element => data.value === element.name)
    price.value = resultat[0].price;
    button.value = resultat[0].id
    }

data.then((res) =>{
    array = res[0];
    array.forEach(element => {

            let option = document.createElement('option')
            option.value = element.name
            option.textContent = ` ${element.name}`
            equipment.appendChild(option)
        

    });


})

