// Array de productos disponibles en la cafetería
let menuCafeteria = [
    { id: 1, nombre: "1- Cucha de polar grande 1.10mts * 1.00mts", precio: 25000 },
    { id: 2, nombre: "2- Bolsa de alimento Eukanuba 20kg", precio: 55000 },
    { id: 3, nombre: "3- Combo correa + pechera reforzada", precio: 20000 },
    { id: 4, nombre: "4- Dentalife higiene canina", precio: 8500 }
    
]

// Variables para manejar el estado del pedido
let pedido = []

// Función para obtener el elemento del DOM por ID de manera abreviada
const getElement = id => document.getElementById(id)

// Función para mostrar el menú de la cafetería
function mostrarMenu() {
    let menu = "Menú de Cafetería:\n\n"
    menuCafeteria.forEach(producto => {
        menu += `${producto.nombre} - $${producto.precio.toFixed(2)}\n`
    })
    return menu
}

// Función para generar el recibo del pedido
function generarRecibo(pedido) {
    let total = 0
    let recibo = "Recibo del Pedido:\n\n"
    pedido.forEach(item => {
        let producto = menuCafeteria.find(prod => prod.nombre === item.nombre)
        recibo += `${item.nombre} - $${producto.precio.toFixed(2)}\n`
        total += producto.precio
    });
    recibo += `\nTotal: $${total.toFixed(2)}`
    return recibo
}

// Función para realizar el pedido
function realizarPedido() {
    let continuar = true

    while (continuar) {
        let idProducto = prompt("Por favor, ingrese el ID del producto que desea (1, 2 o 3):");
        if (idProducto) {
            // Buscar cualquier producto que contenga la entrada del usuario (insensible a mayúsculas/minúsculas)
            let encontrado = menuCafeteria.find(prod => prod.id === parseInt(idProducto))

            if (encontrado) {
                pedido.push({ nombre: encontrado.nombre })
                let opcion = prompt("¿Desea agregar otro producto? Y/N:")
                // Verificar que la opción ingresada sea válida (y/Y o n/N)
                 while (opcion.toLowerCase() !== 'y' && opcion.toLowerCase() !== 'n') {
                    alert("Respuesta no válida. Por favor, ingrese 'Y' para sí o 'N' para no.")
                    opcion = prompt("¿Desea agregar otro producto? Y/N:")
                }
                if (opcion.toLowerCase() !== 'y') {
                    continuar = false
                }
            } else {
                alert("Producto no encontrado en el menú. Por favor, ingrese un producto válido.")
            }
        } else {
            continuar = false
        }
    }

    alert(generarRecibo(pedido))
}


// Función principal que inicializa el simulador
function iniciarSimulador() {
    let verMenuBtn = getElement('verMenuBtn')
    let realizarPedidoBtn = getElement('realizarPedidoBtn')

    verMenuBtn.addEventListener('click', function() {
        alert(mostrarMenu())
    })

    realizarPedidoBtn.addEventListener('click', function() {
        pedido = [] // Reinicia el pedido cada vez que se realiza un nuevo pedido
        realizarPedido()
    })
}

// Llamada a la función principal para iniciar el simulador
document.addEventListener('DOMContentLoaded', function() {
    iniciarSimulador()
})