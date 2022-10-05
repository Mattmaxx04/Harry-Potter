var URI = "https://hp-api.herokuapp.com/api/characters";

let contenedor = document.getElementById("contenedor");
let personajes = [];
let formulario = document.querySelector("form");


/*-------------funcion not found------------------*/

/*------------- FIN funcion not found------------------*/
traerDatos(URI);

/*-------------pintarcards------------------*/
function pintarCards(arrayPersonajes) {
  contenedor.innerHTML = "";
  if (!arrayPersonajes.length){
    
    notFound()
  }else{
  div.innerHTML =""    
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
  pintarCards(filtradoTexto)
}
/*------------- FIN super filtro------------------*/

/*------------- funcion not found------------------*/
let notFoundDiv = document.getElementById("notFound")
let div = document.createElement("div") 

function notFound(){  
  
  div.innerHTML = `<div class="wrapper">  
  <div class="cloud cloud-1"></div>
  <div class="cloud cloud-2"></div>
  <div class="cloud cloud-3"></div>
  <div class="cloud cloud-4"></div>
  <div class="containerharry">
  <h5>can't find what you're looking for?</h5>
    <div class="broom"></div>
    <div class="harry">
      <div class="cloak"></div>
      <div class="leg"></div>
      <div class="face">
        <div class="hair-1"></div>
        <div class="hair-2"></div>
        <div class="hair-3"></div>
        <div class="glasses"></div>
        <div class="eye"></div>
        <div class="scar"></div>
        <div class="mouth"></div>
        
      </div>
    </div>
    
  </div>
 
</div>`
  notFoundDiv.appendChild(div);
}