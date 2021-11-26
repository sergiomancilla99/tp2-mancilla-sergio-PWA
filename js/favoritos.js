const d = document;
let cardsFav = document.getElementById("cards-favoritos");

document.addEventListener("DOMContentLoaded",(ev) => {
    let favoritos = JSON.parse(localStorage.getItem("favoritos"));

    favoritos.forEach( function (el) {
        let divCard = d.createElement("div");
        divCard.className = "card col-8 col-sm-3 m-3";
        cardsFav.appendChild(divCard);

        let img = d.createElement("img");
        img.src = el.Poster;
        img.className = "img-fluid card-img-top";
        divCard.appendChild(img);

        let divCardBody = d.createElement("div");
        let titulo = d.createElement("h2");
        titulo.className = "text-dark"
        titulo.innerHTML = el.Title;
        divCardBody.appendChild(titulo);
        divCard.appendChild(divCardBody);

        let divCardBody2 = d.createElement("div");
        let btnEliminar = d.createElement("button");
        btnEliminar.className = " btn btn-danger w-100 btnBorrar";
        btnEliminar.setAttribute("data-id", el.imdbID);
        btnEliminar.id = el.imdbID;
        btnEliminar.innerHTML = "Eliminar";

        divCardBody2.appendChild(btnEliminar);
        divCard.appendChild(divCardBody2);

    })
    let btnFavoritoBorrar = d.querySelectorAll(".btnBorrar");
    console.log(btnFavoritoBorrar);

// ----------------- ELIMINAR DE FAVORITOS -------------------------
    btnFavoritoBorrar.forEach( function (el)  {
       el.addEventListener("click", (ev) => {
           borrarPelicula(ev.target.getAttribute("data-id"));
           console.log(ev.target.parentNode.parentNode);
           ev.target.parentNode.parentNode.remove();

       })

    });

    function borrarPelicula(id){
        let favArr = JSON.parse(localStorage.getItem('favoritos'));
        let peliculaIdArr = favArr.findIndex(element => element.imdbID === id);
        // console.log("--->elima",peliculaIdArr);
        favArr.splice(peliculaIdArr, 1);
        localStorage.setItem("favoritos", JSON.stringify(favArr));

    }


});

