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
            let contenedorCarritoLayout = document.createElement("div");
            contenedorCarritoLayout.classList.add("contenedor-carrito-layout")

            let seccionIzquierdaCarrito = document.createElement("div");
            seccionIzquierdaCarrito.classList.add("seccion-izquierda-carrito")

            let listaProductos = document.createElement("div");
            listaProductos.classList.add("lista-items-carrito");
            seccionIzquierdaCarrito.appendChild(listaProductos);

            carrito.forEach((elemento, index) => {
                let itemCarritoLista = document.createElement("div");
                itemCarritoLista.classList.add("item-carrito-lista");
                itemCarritoLista.dataset.productId = elemento.id;

                let btnEliminar = document.createElement("button");
                btnEliminar.innerHTML = '&#10006;';
                btnEliminar.classList.add("btn-eliminar-item")
                btnEliminar.addEventListener("click", () => {
                    eliminarProducto(index);
                    actualizarAgregados();
                });

                let imagenProducto = document.createElement("img")
                imagenProducto.classList.add("imagen-producto");
                imagenProducto.src = elemento.images;
                imagenProducto.alt = elemento.title;

                let infoProductoContainer = document.createElement("div");
                infoProductoContainer.classList.add("info-item-carrito-details");

                let tituloProducto = document.createElement("h3");
                tituloProducto.classList.add("titulo-producto");
                tituloProducto.textContent = elemento.title;

                let precioUnitario = document.createElement("p");
                precioUnitario.classList.add("precio-unitario-item-carrito");
                precioUnitario.textContent = `$${elemento.price.toFixed(2)} c/u`;

                infoProductoContainer.appendChild(tituloProducto);
                infoProductoContainer.appendChild(precioUnitario);

                let btnRestar = document.createElement("button");
                btnRestar.classList.add("btn-cantidad-carrito", "btn-restar");
                btnRestar.textContent = "-";
                btnRestar.addEventListener("click", () => {
                    restarCantidadEnCarrito(elemento, cantidadEnCarrito);
                });

                let cantidadEnCarrito = document.createElement("p");
                cantidadEnCarrito.classList.add("cantidad-en-carrito");
                cantidadEnCarrito.textContent = elemento.cantidad;

                let btnSumar = document.createElement("button");
                btnSumar.classList.add("btn-cantidad-carrito","btn-sumar");
                btnSumar.textContent = "+";
                btnSumar.addEventListener("click", () => {
                    sumarCantidadEnCarrito(elemento, cantidadEnCarrito);
                });

                let wrapperCantidadEnCarrito = document.createElement("div");
                wrapperCantidadEnCarrito.classList.add("wrapper-cantidad");

                wrapperCantidadEnCarrito.appendChild(btnRestar);
                wrapperCantidadEnCarrito.appendChild(cantidadEnCarrito);
                wrapperCantidadEnCarrito.appendChild(btnSumar);

                let precioTotalCalculado = elemento.price * elemento.cantidad;
                let precioProductoTotal = document.createElement("p");
                precioProductoTotal.classList.add("precio-producto-total");
                precioProductoTotal.textContent = `$${precioTotalCalculado.toFixed(2)}`;

                itemCarritoLista.appendChild(btnEliminar);
                itemCarritoLista.appendChild(imagenProducto);
                itemCarritoLista.appendChild(tituloProducto);
                itemCarritoLista.appendChild(precioUnitario);
                itemCarritoLista.appendChild(wrapperCantidadEnCarrito)
                itemCarritoLista.appendChild(precioProductoTotal);

                listaProductos.appendChild(itemCarritoLista);
            });

            let divAccionesInferiorIzquierda = document.createElement("div");
            divAccionesInferiorIzquierda.classList.add("acciones-carrito-inferior-izquierda");
            if (carrito.length) {
                let btnVaciar = document.createElement("button");
                btnVaciar.classList.add("btn-vaciar");
                btnVaciar.textContent = "Vaciar el carrito";
                btnVaciar.addEventListener("click", () => {
                    vaciarCarrito();
            });
            divAccionesInferiorIzquierda.appendChild(btnVaciar);
        }
            seccionIzquierdaCarrito.appendChild(divAccionesInferiorIzquierda);
            
            let seccionDerechaCarrito = document.createElement("div");
            seccionDerechaCarrito.classList.add("seccion-derecha-carrito");

            let cuadroResumen = document.createElement("div");
            cuadroResumen.classList.add("cuadro-resumen-carrito");

            const cantidadTotalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
            const precioTotalCarrito = carrito.reduce((total, producto) => total + (producto.price * producto.cantidad), 0);

            cuadroResumen.innerHTML = `
                <h2>Resumen del Pedido</h2>
                <p><strong>Cantidad total de ítems:</strong> ${cantidadTotalProductos}</p>
                <p><strong>Costo total de la compra:</strong> $${precioTotalCarrito.toFixed(2)}</p>
            `;

            let btnFinalizar = document.createElement("button");
            btnFinalizar.classList.add("btn-finalizar-compra");
            btnFinalizar.textContent = "Finalizar Compra";
            btnFinalizar.addEventListener("click", () => {
                let confirmado = confirm("¿Está seguro que desea finalizar la compra?");
                if (confirmado) {
                    alert("¡Gracias por su compra!");
                    localStorage.removeItem("carrito");
                    carrito = [];
                    window.location.href = "./ecommerce.html";
                }
            });

            cuadroResumen.appendChild(btnFinalizar);
            seccionDerechaCarrito.appendChild(cuadroResumen);

            contenedorCarritoLayout.appendChild(seccionIzquierdaCarrito);
            contenedorCarritoLayout.appendChild(seccionDerechaCarrito);

            seccionProductos.appendChild(contenedorCarritoLayout);
        };
    };

    const productosEnCarrito = (carrito) => {
        let contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = carrito.reduce((total, producto) => {
            return total + producto.cantidad;
        }, 0)
    };

    const restarCantidadEnCarrito = (elemento, cantidadEnCarrito) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const indexProducto = carrito.findIndex(item => item.id === elemento.id);
        if (indexProducto !== -1) {
            if (carrito[indexProducto].cantidad > 1) {
                carrito[indexProducto].cantidad--;
            }
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarProductos();
        };

    const sumarCantidadEnCarrito = (elemento, cantidadEnCarrito) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const indexProducto= carrito.findIndex(item => item.id === elemento.id);
        if (indexProducto !== -1) {
            if (carrito[indexProducto].cantidad < 20){
                carrito[indexProducto].cantidad++;
            } else {
                alert(`No puedes agregar más de 20 unidades de ${elemento.title} al carrito.`);
            };
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarProductos();
    };

    const eliminarProducto = (indice) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(indice, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Eliminando el producto");
        renderizarProductos();
    };

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito");
        alert("Vaciando el carrito");
        renderizarProductos();
    };


    renderizarProductos();



});
