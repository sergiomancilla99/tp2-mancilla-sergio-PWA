//http://www.omdbapi.com/?apikey=[yourkey]&
const API_KEY = "d8997827";
const d = document;
// let favArr = [];

let btnBuscar = d.querySelector("#btnBuscar");
let inputPelicula = d.getElementById("pelicula");

/*capturo campos para mostrar la data*/
let mostrarImagen = d.getElementById("imagen");
let mostrarombre = d.getElementById("titulo-pelicula");
let mostrarSinopsis = d.getElementById("sinopsis");
let mostrarRating = d.getElementById("rating");
let mostrarAnio = d.getElementById("anio");
let mostrarDatos = d.querySelectorAll(".datos-pelicula");
let btnFavorito = d.getElementById("btnFavorito");
const spinner = document.getElementById('spinner');
// let btnFavoritoBorrar = d.getElementById("btnFavoritoBorrar");

// btn notifiacion

    function noti(){
        console.log("hola")
        if (!("Notification" in window)) {
            // Check if the browser supports notifications
            alert("This browser does not support desktop notification");
          } else if (Notification.permission === "granted") {
            // Check whether notification permissions have already been granted;
            // if so, create a notification
          
                const notification = new Notification("Hora de comer");
           
            
            // …
          } else if (Notification.permission !== "denied") {
            // We need to ask the user for permission
            Notification.requestPermission().then((permission) => {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                const notification = new Notification("Hi there!");
                // …
              }
            });
          }
    }
const btnNotif = d.querySelector(".notificacion");

btnNotif.addEventListener('click', (ev) => {
    console.log("aca");
    noti();
});

//----------------- BUSCAR PELICULA -------------------------------
btnBuscar.addEventListener('click', (ev) => {
    ev.preventDefault();
    showSpinner();
    console.log("ta bien",inputPelicula.value);

    buscarPelicula();
    console.log(mostrarDatos);
    mostrarDatos[0].style.display = "block";
    mostrarDatos[1].style.display = "block";
    // console.log(inputPelicula.value);
});

// ----------------- AGREGAR a FAVORITOS -------------------------
btnFavorito.addEventListener('click', (ev) => {
   agregarFavorito(JSON.parse(localStorage.getItem('busqueda')));
   // btnFavorito.setAttribute("disabled", "");
   // btnFavoritoBorrar.style.display = "block";

});



function buscarPelicula() {
    fetch(`https://www.omdbapi.com/?apikey=d8997827&t=${inputPelicula.value}&plot=full`)
        .then(response => response.json())
        .then(rta => {
            if(rta.Response !== "False"){
                console.log("bien",rta);

               /* let ul = d.createElement("ul");
                ul.className = 'list-unstyled';

                // <li> para el titulo
                let liTitulo = d.createElement("li");
                liTitulo.className = 'm-4';
                liTitulo.innerHTML = rta.Title;
                ul.appendChild(liTitulo);

                // <li> para la imagen
                let liImagen = d.createElement("li");
                liImagen.className = 'm-4';
                let imagen = d.createElement("img");
                imagen.src = rta.Poster;
                liImagen.appendChild(imagen);
                ul.appendChild(liImagen);

                // <li> para el titulo
                let liSinopsis = d.createElement("li");
                liSinopsis.className = 'm-4';
                liSinopsis.innerHTML = rta.Plot;
                ul.appendChild(liSinopsis);

                // <li> para el score
                let liScore = d.createElement("li");
                liScore.className = 'm-4';
                liScore.innerHTML = rta.Ratings[0].Value;
                ul.appendChild(liScore);*/

                mostrarImagen.src = rta.Poster;
                mostrarombre.innerHTML = rta.Title;
                mostrarSinopsis.innerHTML = rta.Plot;
                mostrarRating.innerHTML = rta.Ratings[0].Value;
                mostrarAnio.innerHTML = rta.Year;
                localStorage.setItem('busqueda', JSON.stringify(rta));
                // btnFavoritoBorrar.setAttribute("data-id", rta.imdbID);
                showSpinner();

            } else {
                console.log("Algo salio mal",rta);
                alert("algo salio mal, intente buscar de nuevo");

            }

        })
        .catch(function () {
            console.log("Algo salio mal!");
        });
}

function agregarFavorito(data) {
    let favArr = JSON.parse(localStorage.getItem('favoritos')) || [];
    console.log(favArr);
    console.log(favArr.findIndex(pelicula => pelicula.imdbID === data.imdbID));
    if(favArr.length === 0) {
        favArr.push(data);
        console.log("000");
    }
    else if(favArr.length >= 0){
        if(favArr.findIndex(pelicula => pelicula.imdbID === data.imdbID) !== -1){
            console.log("ya existe en favoritos.");
            alert("Ya existe en la lista de favoritos");

        } else {
            favArr.push(data);
        }
    }

    localStorage.setItem('favoritos', JSON.stringify(favArr));
}

window.addEventListener("offline", event => {
    let estado = document.getElementById("estado-conexion");
    estado.innerHTML = "Offline";
    estado.className = "offline";
    console.log("Estoy offline");
});

window.addEventListener("online", event => {
    let estado = document.getElementById("estado-conexion");
    estado.innerHTML = "Online";
    estado.className = "online";
    console.log("estoy online");
})

function showSpinner() {
    spinner.classList.toggle('d-none');
}

