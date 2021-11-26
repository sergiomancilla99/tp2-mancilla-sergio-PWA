if('serviceWorker' in navigator){
    navigator.serviceWorker.register('service-worker.js').then((message) => {
        console.log("Service Worker esta listo");
    });

} else {
    console.log('SW no es soportado');
}



if(!navigator.onLine) {
    console.log("estoy sin conexion");
}