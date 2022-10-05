var URI = "https://hp-api.herokuapp.com/api/characters";

let contenedor = document.getElementById("contenedor");
let personajes = [];
let formulario = document.querySelector("form");


/*-------------funcion not found------------------*/
function notFound(){  
  let div = document.createElement("div") 
  div.innerHTML = `<img src="./assets/logohow.jpg" class="img__notfound" alt="...">
  <p class="card-text">algo</p>`
  contenedor.appendChild(div);
}
/*------------- FIN funcion not found------------------*/
traerDatos(URI);

/*-------------pintarcards------------------*/
function pintarCards(arrayPersonajes) {
  contenedor.innerHTML = "";
  arrayPersonajes.forEach((personaje) => {
    let card = document.createElement("div");
    card.className = "card p-0 bg-dark text-light";
    card.style.width = "20rem";
    card.innerHTML = `<img src="${personaje.image}" class="card-img-top card__image" alt="...">
        <div class="card-body">
          <h2 class="card-title">${personaje.name}</h2>
          <h3 class="card-text">House:${personaje.house}</h3>          
        </div>`;
    contenedor.appendChild(card);
  });
}
/*------------- FIN pintarcards------------------*/

function traerDatos(url) {
  fetch(url)
    .then((response) => response.json())
    .then(data => {
      personajes = data
      let filtro1 = filtrarPorImagenes(personajes)
      pintarCards(filtro1)
    });
}

function filtrarPorImagenes(arrayPersonajes) {
  let filtro = []
  arrayPersonajes.filter(personaje => {
    if (!personaje.image == "") {
      filtro.push(personaje);
    }
  });
  return filtro
}

formulario.addEventListener("click", () => {
  superFiltro()
});


function filtrarPorCasa(arrayPersonajes) {
  let filtro1 = filtrarPorImagenes(arrayPersonajes)
  let checkBoxes = document.querySelectorAll('input[type="checkbox"]');
  let arrayCheckBoxes = Array.from(checkBoxes);
  let inputCheckers = arrayCheckBoxes.filter(checkBox => checkBox.checked);
  let valueCheckers = inputCheckers.map(input => input.value.toLowerCase());
  let filtro = [];
  filtro1.filter(personaje => {
    valueCheckers.forEach(house => {
      if (house == personaje.house.toLowerCase()) {
        filtro.push(personaje);
      }
    });
  });
  console.log(valueCheckers);
  if (!filtro.length) {
    filtro = arrayPersonajes;
  }
  return filtro;
}

/*-------------search------------------*/
let searcher = document.getElementById("searchbox");

searcher.addEventListener("keyup", () => {
  superFiltro()
});


function search(arrayPersonajes) {
  let filtro1 = filtrarPorImagenes(arrayPersonajes)
  let palabras = searcher.value
  console.log(palabras);
  let personajeFiltrado = filtro1.filter(personaje => personaje.name.toLowerCase().includes(palabras.toLowerCase()))
  console.log(personajeFiltrado);
  return personajeFiltrado;
}
/*------------- FIN search------------------*/

/*-------------super filtro------------------*/

function superFiltro(){ 
  let filtroCasa = filtrarPorCasa(personajes);
  let filtradoTexto = search(filtroCasa); 
  if (!filtradoTexto.length){
    notFound()
  }
  pintarCards(filtradoTexto)

}
/*------------- FIN super filtro------------------*/