const contenedorTarjetas = document.getElementById("productos-container")
const botonesCategorias = document.querySelectorAll(".boton-categoria")

let productos = []

 
// URL del archivo JSON
const url = '../data/articulos.json'

// Usamos fetch para obtener los datos desde el archivo JSON
fetch(url)
  .then(response => response.json())
  .then(data => {
    productos = data; // Guardamos los productos obtenidos en la variable global
    crearTarjetasProductosInicio(productos);
  })
  .catch(error => console.error('Error al cargar los datos del JSON:', error))

/** Crea las tarjetas de productos teniendo en cuenta la lista obtenida del JSON */
function crearTarjetasProductosInicio(productos) {
  const carpetas = {
    "perros": "alimentoPerroAdulto",
    "gatos": "alimentoGato",
    "accesorios": "accesorios"
  }

  contenedorTarjetas.innerHTML = "" // Limpiar contenedor antes de cargar los productos

  productos.forEach(producto => {
    const nuevaCarpeta = carpetas[producto.categoria.id] // Obtiene la carpeta correspondiente
    const nuevoArticulo = document.createElement("div")
    nuevoArticulo.classList = "tarjeta-producto"
    nuevoArticulo.innerHTML = `
        <img src="../assets/${nuevaCarpeta}/${producto.rutaImagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <h5>${producto.descripcion}</h5>
        <p>$${producto.precio}</p>
        <h5>Quedan ${producto.stock} unidades</h5>
        <button>Añadir al carrito</button>
    `
    contenedorTarjetas.appendChild(nuevoArticulo)
    nuevoArticulo.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto))
  }) 
}

//Fitrado de productos por categoria correspondiente
botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {

    botonesCategorias.forEach(boton => boton.classList.remove("active"))
    e.currentTarget.classList.add("active")

    if(e.currentTarget.id !=="todos"){
      const productosFiltrados = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
      crearTarjetasProductosInicio(productosFiltrados)
    }else{
      crearTarjetasProductosInicio(productos)
    }
  })
})    


