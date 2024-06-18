document.addEventListener("DOMContentLoaded", function() {
    function cargarContenido(url, push = true) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById("contenido").innerHTML = data;
                window.scrollTo(0, 0);
                if (push) {
                    history.pushState({url: url}, null, url.substring(url.lastIndexOf('/') + 1));
                }
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }

    // Manejar los eventos de navegación del historial
    window.onpopstate = function(event) {
        if (event.state && event.state.url) {
            cargarContenido(event.state.url, false);
        }
    };

    // Al inicio cargar página principal
    cargarContenido("./Pages/inicio.html", false);
    document.querySelector(".inicio").classList.add("active");

    // Carga la página que ha sido clicada en el header
    document.querySelectorAll("header nav ul li a").forEach(enlace => {
        enlace.addEventListener("click", function(event) {
            document.querySelectorAll("header nav ul li a").forEach(link => {
                link.classList.remove("active");
            });

            enlace.classList.add("active");
            event.preventDefault();
            const href = enlace.getAttribute("href");
            cargarContenido(href);
        });
    });

    // Carga la página que ha sido clicada en el footer
    document.querySelectorAll("footer nav ul li a").forEach(enlace => {
        enlace.addEventListener("click", function(event) {
            document.querySelectorAll("footer nav ul li a").forEach(link => {
                link.classList.remove("active");
            });

            enlace.classList.add("active");
            event.preventDefault();
            const href = enlace.getAttribute("href");
            cargarContenido(href);
        });
    });

    // Navegación entre discos y sus detalles
    document.getElementById("contenido").addEventListener("click", function(event) {
        const enlaceAlbum = event.target.closest(".album a");
        if (enlaceAlbum) {
            event.preventDefault();
            cargarContenido(enlaceAlbum.getAttribute("href"));
        }
    });
});