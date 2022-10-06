var URI = "https://hp-api.herokuapp.com/api/characters";

let contenedor = document.getElementById("contenedor");
let personajes = [];
let formulario = document.querySelector("form");

traerDatos(URI);

/*-------------pintarcards------------------*/
function pintarCards(arrayPersonajes) {
  contenedor.innerHTML = "";
  if (!arrayPersonajes.length) {
    notFound();
  } else {
    div.innerHTML = "";
    arrayPersonajes.forEach((personaje) => {
      let imagen = imagenDefecto()
      function imagenDefecto(){
        if (personaje.image == "" ){
          return "../assets/dementor.png"
        }else{ 
          return personaje.image
        }
      }
      console.log(personaje.image)
      let card = document.createElement("div");
      card.className = "card text-light";
      card.style.width = "20rem";
      card.innerHTML = `<div class="imgbox">
      <img src="${imagen}" alt="...">
    </div>

      <div class="content">
        <h4>${personaje.name}</h4>
        <p> House:${personaje.house}</p>
        <p> Specie:${personaje.species}</p>
        <p> Actor:${personaje.actor}</p>
        <p> Patronus:${personaje.patronus}</p>
        <p> Wand:</p>
        <ul>
          <li>Wood:${personaje.wand.wood}</li>
          <li>Core:${personaje.wand.core}</li>
          <li>Length:${personaje.wand.length}</li>
        </ul>
       
       
      </div>
    </div>`;
      contenedor.appendChild(card);
    });
  }
}
/*------------- FIN pintarcards------------------*/
/*<img src="${imagen}" class="card-img-top card__image" alt="...">
        <div class="card-body">
          <h2 class="card-title">${personaje.name}</h2>
          <h3 class="card-text">House:${personaje.house}</h3>          
        </div>*/


/*------------- Funcion Fetch------------------*/
function traerDatos(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      personajes = data;;
      pintarCards(personajes);
    });
}
/*------------- Fin funcion Fetch------------------*/

/*-------------Filtrar por casa------------------*/
formulario.addEventListener("click", () => {
  superFiltro();
});

function filtrarPorCasa(arrayPersonajes) {
  let checkBoxes = document.querySelectorAll('input[type="checkbox"]');
  let arrayCheckBoxes = Array.from(checkBoxes);
  let inputCheckers = arrayCheckBoxes.filter((checkBox) => checkBox.checked);
  let valueCheckers = inputCheckers.map((input) => input.value.toLowerCase());
  let filtro = [];
  arrayPersonajes.filter((personaje) => {
    valueCheckers.forEach((house) => {
      if (house == personaje.house.toLowerCase()) {
        filtro.push(personaje);
      }
    });
  });
  if (!filtro.length) {
    filtro = arrayPersonajes;
  }
  return filtro;
}

/*-------------filtro por search------------------*/
let searcher = document.getElementById("searchbox");

searcher.addEventListener("keyup", () => {
  superFiltro();
});

function search(arrayPersonajes) {
  let palabras = searcher.value;

  let personajeFiltrado = arrayPersonajes.filter((personaje) =>
    personaje.name.toLowerCase().includes(palabras.toLowerCase())
  );

  return personajeFiltrado;
}
/*------------- FIN search------------------*/

/*-------------super filtro------------------*/

function superFiltro() {
  let filtroCasa = filtrarPorCasa(personajes);
  let filtradoTexto = search(filtroCasa);
  pintarCards(filtradoTexto);
}
/*------------- FIN super filtro------------------*/

/*------------- funcion not found------------------*/
let notFoundDiv = document.getElementById("notFound");
let div = document.createElement("div");

function notFound() {
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
 
</div>`;
  notFoundDiv.appendChild(div);
}

/*------------- FIN funcion not found------------------*/
