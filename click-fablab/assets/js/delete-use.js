
const use = document.querySelector('#use');
const button = document.querySelector('.id');
function changeId(data) {
  let result = array.filter((element) => data.value === element.name);
  button.value = result[0].id;
}

data.then((res) => {
  array = res[0];
  array.forEach((element) => {
    let option = document.createElement('option');
    option.value = element.id;
    option.textContent = ` ${element.id}`;
    use.appendChild(option);
  });
});


function btnClick() {
    if (!validData())
        return false;
}
