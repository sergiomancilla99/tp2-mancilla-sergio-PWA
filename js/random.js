const d = document;

document.addEventListener("DOMContentLoaded", (ev) => {
   let btnRandom = d.getElementById("btnRandom");
   let favoritosArr = JSON.parse(localStorage.getItem("favoritos")) || [];
   let imagen = d.getElementById("imagen");
   let titulo = d.getElementById("titulo");
   let rating = d.getElementById("rating");
   let divCard = d.getElementById("randomPeli");

   btnRandom.addEventListener("click", (ev) => {
       if(favoritosArr.length > 0){
           let nroRandom = Math.floor(Math.random()* favoritosArr.length);
           console.log("random",favoritosArr[nroRandom]);

           imagen.src = favoritosArr[nroRandom].Poster;
           titulo.innerHTML = favoritosArr[nroRandom].Title;
           rating.innerHTML = favoritosArr[nroRandom].Ratings[0].Value;
           // divCard.style.display = "block";
       } else {
           console.log("Todavia no tiene peliculas agregas en favoritos");
           alert("Primero debe agregar peliculas a favoritos..");
       }

   });


});