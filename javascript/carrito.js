document.addEventListener("DOMContentLoaded", () => {

    const renderizarProductos = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        productosEnCarrito(carrito);

        let seccionProductos = document.getElementById("lista-carrito");
        seccionProductos.innerHTML = "";

        if (!carrito.length){
            let mensajeContenedor = document.createElement("div");
            mensajeContenedor.classList.add("carrito-vacio");


            let mensajeCarrito = document.createElement("p");
            mensajeCarrito.classList.add("mensaje-carrito");
            mensajeCarrito.textContent = "El carrito está vacío";
            let volverTienda = document.createElement("a");
            volverTienda.href = "./ecommerce.html";
            volverTienda.classList.add("btn-volver-tienda");
            volverTienda.textContent = "Volver a la tienda";
        
            mensajeContenedor.appendChild(mensajeCarrito);
            mensajeContenedor.appendChild(volverTienda);
            seccionProductos.appendChild(mensajeContenedor);

        } else {
            carrito.forEach((elemento, index) => {
                let tarjetaProducto = document.createElement("article");
                tarjetaProducto.classList.add("tarjeta-producto");

                let imagenProducto = document.createElement("img")
                imagenProducto.classList.add("imagen-producto");
                imagenProducto.src = elemento.images;
                imagenProducto.alt = elemento.description;

                let tituloProducto = document.createElement("h3");
                tituloProducto.classList.add("titulo-producto");
                tituloProducto.textContent = elemento.title;

                let precioProducto = document.createElement("p");
                precioProducto.classList.add("precio-producto");
                precioProducto.textContent = `$${elemento.price}`;

                let btnEliminar = document.createElement("button");
                btnEliminar.classList.add("btn-eliminar-carrito")
                btnEliminar.textContent = "Eliminar";
                btnEliminar.addEventListener("click", () => {
                    alert(`${elemento.title} eliminado del carrito.`);
                    eliminarProducto(index);
                    actualizarAgregados();
                });

                tarjetaProducto.appendChild(imagenProducto);
                tarjetaProducto.appendChild(tituloProducto);
                tarjetaProducto.appendChild(precioProducto);
                tarjetaProducto.appendChild(btnEliminar);

                seccionProductos.appendChild(tarjetaProducto);
            });
            renderizarBotones();
            renderizarResumen();
        };
    };

    const renderizarBotones = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let divAcciones = document.getElementById("acciones-carrito");
        divAcciones.innerHTML = "";

        if (carrito.length){
            let btnVaciar = document.createElement("button");
            btnVaciar.classList.add("btn-vaciar");
            btnVaciar.textContent = "Vaciar el carrito";

            btnVaciar.addEventListener("click", () => {
                vaciarCarrito()
            })

            let btnFinalizar = document.createElement("button");
            btnFinalizar.classList.add("btn-finalizar");
            btnFinalizar.textContent = "Finalizar compra";

            btnFinalizar.addEventListener("click", () => {
                let confirmado = confirm("¿Está seguro que desea finalizar la compra?")
                if (confirmado){
                    alert("¡Gracias por su compra!")
                    localStorage.removeItem("carrito");
                    window.location.href = "./ecommerce.html";
                }else{
                    return
                }
            });

            divAcciones.appendChild(btnVaciar);
            divAcciones.appendChild(btnFinalizar);
        }
    };

    const renderizarResumen = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const resumenCarrito = document.getElementById("resumen-carrito");
        resumenCarrito.classList.add("resumen-carrito");
        resumenCarrito.innerHTML = "";

        if(!carrito.length) return;
        const cantidadProductos = carrito.length;
        const precioTotal = carrito.reduce((total,producto) => total + producto.price, 0);

        resumenCarrito.innerHTML = `
            <p><strong>Cantidad de productos:</strong> ${cantidadProductos}</p>
            <p><strong>Precio total:</strong> $${precioTotal.toFixed(2)}</p>
        `;
    };


    const productosEnCarrito = (carrito) => {
        let contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = carrito.length;
    };

    const eliminarProducto = (indice) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(indice, 1);

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Eliminando el producto");
        renderizarProductos();
        renderizarBotones();
        renderizarResumen();
    };

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito");
        alert("Vaciando el carrito");
        renderizarProductos();
        renderizarBotones();
        renderizarResumen();
    };


    renderizarProductos();
    renderizarResumen();
    renderizarBotones();


});
