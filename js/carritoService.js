const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto){
  // Reviso si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("articulos"));
  let cantidadProductoFinal;

  // Si no hay localstorage lo creo
  if(!memoria || memoria.length === 0) {
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      localStorage.setItem("articulos",JSON.stringify([nuevoProducto]));
      actualizarNumeroCarrito();
      cantidadProductoFinal = 1;
  }
  else {
      // Si hay localstorage me fijo si el artículo ya está ahí
      const indiceProducto = memoria.findIndex(articulo => articulo.id === producto.id);
      const nuevaMemoria = memoria;

      // Si el producto no está en el carrito lo agrego
      if(indiceProducto === -1){
          const nuevoProducto = getNuevoProductoParaMemoria(producto);
          nuevaMemoria.push(nuevoProducto);
          cantidadProductoFinal = 1;
      } else {
          // Si el producto está en el carrito le agrego 1 a la cantidad.
          nuevaMemoria[indiceProducto].cantidad++;
          cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
      }
      localStorage.setItem("articulos",JSON.stringify(nuevaMemoria));
      actualizarNumeroCarrito();
  }
  Swal.fire({
    toast: true,
    position: 'top-end', // Cambia la posición si lo deseas ('top-end', 'top-right', 'top-left', 'bottom-end', 'bottom-right', 'bottom-left', 'center')
    icon: 'success',
    title: `${producto.nombre} ha sido agregado al carrito.`,
    showConfirmButton: false,
    timer: 3000 // Duración en milisegundos (3 segundos en este caso)
});

  return cantidadProductoFinal;
}


/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("articulos"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(articulo => articulo.id === producto.id)
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1)
  };
  localStorage.setItem("articulos",JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("articulos"));
  if(memoria && memoria.length > 0){
    cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}

/** Reinicia el carrito */
function reiniciarCarrito(){
  localStorage.removeItem("articulos");
  actualizarNumeroCarrito();
}


actualizarNumeroCarrito();