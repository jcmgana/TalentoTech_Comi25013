document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    const renderizarProductos = () => {
        url = "https://dummyjson.com/products/category/groceries";

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let contenedorProductos = document.getElementById("contenedor-productos");
                for (const producto of data.products){
                    let tarjetaProducto = document.createElement("article");
                    tarjetaProducto.classList.add("tarjeta-producto");

                    let imagenProducto = document.createElement("img")
                    imagenProducto.classList.add("imagen-producto");
                    imagenProducto.src = producto.images[0];
                    imagenProducto.alt = producto.description;

                    let tituloProducto = document.createElement("h3");
                    tituloProducto.classList.add("titulo-producto");
                    tituloProducto.textContent = producto.title;

                    let precioProducto = document.createElement("p");
                    precioProducto.classList.add("precio-producto");
                    precioProducto.textContent = `$${producto.price}`;

                    let wrapperContador = document.createElement("div");
                    wrapperContador.classList.add("wrapper-contador");

                    let btnRestar = document.createElement("button");
                    btnRestar.classList.add("btn-restar");
                    btnRestar.textContent = "-";
                    btnRestar.addEventListener("click", () => {
                        restarContador(contadorProducto);
                    })

                    let contadorProducto = document.createElement("p");
                    contadorProducto.classList.add("contador-producto");
                    contadorProducto.textContent = "1";

                    let btnSumar = document.createElement("button");
                    btnSumar.classList.add("btn-sumar");
                    btnSumar.textContent = "+";
                    btnSumar.addEventListener("click", () => {
                        sumarContador(contadorProducto);
                    });

                    let btnAgregar = document.createElement("button");
                    btnAgregar.classList.add("boton-agregar");
                    btnAgregar.textContent = "Agregar al carrito";
                    btnAgregar.addEventListener("click", () => {
                        let cantidadSeleccionada = parseInt(contadorProducto.textContent);
                        let productoParaCarrito = { ...producto, cantidad: cantidadSeleccionada };
                        alert(`${producto.title} x ${cantidadSeleccionada} agregado(s) al carrito.`);
                        agregarProducto(productoParaCarrito);
                        actualizarAgregados();
                        contadorProducto.textContent = "1";
                    });
                
                    wrapperContador.appendChild(btnRestar);
                    wrapperContador.appendChild(contadorProducto);
                    wrapperContador.appendChild(btnSumar);

                    tarjetaProducto.appendChild(imagenProducto);
                    tarjetaProducto.appendChild(tituloProducto);
                    tarjetaProducto.appendChild(precioProducto);
                    tarjetaProducto.appendChild(wrapperContador);
                    tarjetaProducto.appendChild(btnAgregar);

                    contenedorProductos.appendChild(tarjetaProducto);
                }
            })
            .catch((err) => console.error("Error: ", err));
    };

    const agregarProducto = (productoParaCarrito) => {
        const productoExistente = carrito.find(item => item.id === productoParaCarrito.id);
        if (productoExistente) {
            productoExistente.cantidad += productoParaCarrito.cantidad;
            if (productoExistente.cantidad > 20) {
                productoExistente.cantidad = 20;
            }
        } else {
            carrito.push(productoParaCarrito);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    const restarContador = (contadorProducto) => {
        let valor = parseInt(contadorProducto.textContent);
        if (valor > 1) {
            contadorProducto.textContent = valor - 1; 
        }
    }

    const sumarContador = (contadorProducto) => {
            let valor = parseInt(contadorProducto.textContent);
            if (valor < 20) {
                contadorProducto.textContent = valor + 1;
            } else {
            contadorProducto.textContent = `${valor} (máx)`;
            setTimeout(() => {
                contadorProducto.textContent = valor;
            }, 1000);
            }
        };

    const actualizarAgregados = () => {
        const contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = carrito.reduce((total, producto) => {
            return total + producto.cantidad;
        }, 0);
    };

    renderizarProductos();
    actualizarAgregados();
});
