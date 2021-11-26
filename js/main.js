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
