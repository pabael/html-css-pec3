document.addEventListener("DOMContentLoaded", function() {
    function cargarContenido(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById("contenido").innerHTML = data;
                window.scrollTo(0, 0);
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }

    //Al inicio cargar página principal
    cargarContenido("./Pages/inicio.html");
    document.querySelector(".inicio").classList.add("active");

    //Carga la página que ha sido clicada en el header
    document.querySelectorAll("header nav ul li a").forEach(enlace => {
        enlace.addEventListener("click", function(event) {
            document.querySelectorAll("header nav ul li a").forEach(link => {
                link.classList.remove("active");
            });

            enlace.classList.add("active");
            event.preventDefault(); 
            cargarContenido(enlace.getAttribute("href"));
            
        });
    });
    
    //Al clicar en el icono de la cabecera, carga la página principal
    document.querySelector(".title").addEventListener("click", function(event) {
        document.querySelectorAll("header nav ul li a").forEach(link => {
            link.classList.remove("active");
        });
        document.querySelector(".inicio").classList.add("active");
        event.preventDefault();
        cargarContenido("./Pages/inicio.html");
    });

    //Navegación entre discos y sus detalles
    document.getElementById("contenido").addEventListener("click", function(event) {
        const enlaceAlbum = event.target.closest(".album a");
        if (enlaceAlbum) {
            event.preventDefault();
            cargarContenido(enlaceAlbum.getAttribute("href"));
        }
    });
});
