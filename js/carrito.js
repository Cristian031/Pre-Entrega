const contenedorTarjetas = document.getElementById("carrito-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage */
function crearTarjetasProductosCarrito() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("articulos"));
    // Mapeo de categorías a carpetas de imágenes
    const carpetas = {
        "perros": "alimentoPerroAdulto",
        "gatos": "alimentoGato",
        "accesorios": "accesorios"
    };

    if (productos && productos.length > 0) {
        productos.forEach((producto) => {
            const nuevoArticulo = document.createElement("div");
            nuevoArticulo.classList = "tarjeta-producto";
            
            // Obtiene la carpeta correspondiente a la categoría del producto
            const carpetaImagen = carpetas[producto.categoria.id];
            const rutaImagen = `../assets/${carpetaImagen}/${producto.rutaImagen}`;

            nuevoArticulo.innerHTML = `
                <img src="${rutaImagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <div>
                    <button>-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button>+</button>
                </div>
            `;
            contenedorTarjetas.appendChild(nuevoArticulo);
            nuevoArticulo
                .getElementsByTagName("button")[0]
                .addEventListener("click", (e) => {
                    const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
                    cantidadElement.innerText = restarAlCarrito(producto);
                    crearTarjetasProductosCarrito();
                    actualizarTotales();
                });
                nuevoArticulo
                .getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
                    cantidadElement.innerText = agregarAlCarrito(producto);
                    actualizarTotales();
                });
        });
    }
    revisarMensajeVacio();
    actualizarTotales();
    actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("articulos"));
    let cantidad = 0;
    let precio = 0;
    if (productos && productos.length > 0) {
        productos.forEach((producto) => {
            cantidad += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
    }
    cantidadElement.innerText = cantidad;
    precioElement.innerText = precio;
    if (precio === 0) {
        reiniciarCarrito();
        revisarMensajeVacio();
    }
}

document.getElementById("reiniciar").addEventListener("click", () => {
    contenedorTarjetas.innerHTML = "";
    reiniciarCarrito();
    revisarMensajeVacio();
});

/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem("articulos"));
    carritoVacioElement.classList.toggle("escondido", productos);
    totalesContainer.classList.toggle("escondido", !productos);
}

document.getElementById("comprar").addEventListener("click", function() {
    const carrito = JSON.parse(localStorage.getItem("articulos")) || [];
    
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'No tienes productos en el carrito para comprar.',
        });
        return;
    }

    // Construimos el mensaje que se enviará por WhatsApp
    let mensaje = "Hola Huellitas, quiero comprar los siguientes productos:<br>";
    carrito.forEach(item => {
        mensaje += `- ${item.cantidad} x ${item.nombre} ($${item.precio} c/u)<br>`;
    });

    // Calcula el total del precio
    const total = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
    mensaje += `<br>Total a pagar: $${total.toFixed(2)}`;

    // Muestra el formulario en un SweetAlert2
    Swal.fire({
        title: 'Completa tus datos',
        html: `
            <div>${mensaje}</div>
            <input id="nombre" class="swal2-input" placeholder="Nombre y apellido">
            <select id="medioPago" class="swal2-select">
                <option value="" disabled selected>Selecciona medio de pago</option>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
            </select>
            <select id="tipoEntrega" class="swal2-select">
                <option value="" disabled selected> Selecciona tipo de entrega</option>
                <option value="local">Retiro en local</option>
                <option value="domicilio">Entrega de domicilio</option>
            </select>
            <input id="direccion" class="swal2-input" placeholder="Domicilio" style="display: none;">
            <input id="observacion" class="swal2-input" placeholder="información adicional">
            <div id="qrContainer" style="display: none;">
                <!--<p>Escanea el código QR para pagar:</p>
                <img id="qrImage" src="ruta/al/tu/codigo-qr.png" alt="Código QR" />-->
                <p>Utiliza el alias para abonar tu compra: <strong>laura.451.clean</strong></p>
            </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const nombre = document.getElementById('nombre').value;
            const direccion = document.getElementById('direccion').value;
            const medioPago = document.getElementById('medioPago').value;
            const tipoEntrega = document.getElementById('tipoEntrega').value;
            const observacion = document.getElementById('observacion').value; // Captura la observación

            if (!nombre || !medioPago || !tipoEntrega || (tipoEntrega === 'domicilio' && !direccion)) {
                Swal.showValidationMessage('Por favor completa todos los campos');
            }
            return { nombre, direccion, medioPago, tipoEntrega, observacion }; // Asegúrate de devolver también la observación
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { nombre, direccion, medioPago, tipoEntrega, observacion } = result.value;

            // Mensaje final para WhatsApp
            let mensajeWhatsApp = `Hola Huellitas, quiero comprar los siguientes productos:\n`;
            carrito.forEach(item => {
                mensajeWhatsApp += `- ${item.cantidad} x ${item.nombre} ($${item.precio} c/u)\n`;
            });
            mensajeWhatsApp += `\nTotal a pagar: $${total.toFixed(2)}\n`;
            mensajeWhatsApp += `Nombre del comprador: ${nombre}\n`;
            mensajeWhatsApp += `Dirección del comprador: ${direccion}\n`;
            mensajeWhatsApp += `Medio de pago: ${medioPago}\n`;
            mensajeWhatsApp += `Tipo de entrega: ${tipoEntrega}\n`;
            mensajeWhatsApp += `Observación: ${observacion}`; // Asegúrate de incluir la observación

            // Reemplaza el número de teléfono por el de la empresa
            const numeroWhatsApp = "+5492616959919"; // Reemplaza con el número de WhatsApp de la empresa

            // Construimos la URL de WhatsApp
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;

            // Abre WhatsApp en una nueva pestaña
            window.open(urlWhatsApp, '_blank');

            Swal.fire(`¡Gracias ${nombre}!`, `Tu pedido ha sido enviado a WhatsApp.`, 'success');
        }
    });

    
    document.getElementById('medioPago').addEventListener('change', function() {
        const qrContainer = document.getElementById('qrContainer');
        qrContainer.style.display = this.value === 'tarjeta' ? 'block' : 'none';
    });
    document.getElementById('tipoEntrega').addEventListener('change', function() {
      const direccionInput = document.getElementById('direccion');
      direccionInput.style.display = this.value === 'domicilio' ? 'block' : 'none';
  });
});
