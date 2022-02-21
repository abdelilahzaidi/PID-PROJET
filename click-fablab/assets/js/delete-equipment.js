const fetchReq = fetch('/api/equipment/all-equipment').then((res) =>
  res.json()
);
const data = Promise.all([fetchReq]);
const equipment = document.querySelector('#equipment');
const button = document.querySelector('.id');
function changeId(data) {
  let result = array.filter((element) => data.value === element.name);
  button.value = result[0].id;
}

data.then((res) => {
  array = res[0];
  array.forEach((element) => {
    let option = document.createElement('option');
    option.value = element.name;
    option.textContent = ` ${element.name}`;
    equipment.appendChild(option);
  });
});
