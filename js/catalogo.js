const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en bicicletas.js */
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevoArticulo = document.createElement("div");
    nuevoArticulo.classList = "tarjeta-producto"
    nuevoArticulo.innerHTML = `
        <img src="../assets/alimentoPerroAdulto/${producto.rutaImagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <p>${producto.categoria}</p>
        <h5>Quedan ${producto.stock} unidades</h5>
        <button>Añadir al carrito</button>
    `
    contenedorTarjetas.appendChild(nuevoArticulo);
    nuevoArticulo.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
  });
}
crearTarjetasProductosInicio(articulos);
