//Algoritmo con condional: Habilitación de edad
function verificarEdad(edad) {
    if (edad >= 18) {
        return "¡Bienvenido a nuestro sitio!. Disfruta tu visita."
    } else {
        return "¡Acceso denegado!. Eres menor de edad no cumples con las normas de nuestro sitio."
    }
}

// Función para generar la tabla de multiplicar de un número dado
function generarTablaMultiplicar(numero) {
    let tabla = ""
    for (let i = 1; i <= 10; i++) {
        tabla += `${numero} x ${i} = ${numero * i}\n`
    }
    return tabla
}

// Función principal que interactúa con el usuario para verificar edad
function iniciarVerificacionEdad() {
    alert("Bienvenido al verificador de edad. Por favor, ingrese su edad para continuar.")
    let entrada = prompt("Por favor, ingrese su edad:")

    if (entrada !== null && !isNaN(parseInt(entrada))) {
        let edad = parseInt(entrada)
        let mensaje = verificarEdad(edad)
        alert(mensaje)
    } else {
        alert("Ingreso inválido. Por favor, ingrese un número válido para su edad.")
    }
}
//--------------------------------------------------------------------------------------------
// Función principal que interactúa con el usuario para generar tabla de multiplicar
function iniciarGeneracionTabla() {
    let entrada = prompt("Por favor, ingrese un número:")

    if (entrada !== null && !isNaN(parseInt(entrada))) {   //Valida la entrada
        let numero = parseInt(entrada)
        let tabla = generarTablaMultiplicar(numero)
        alert(`Tabla de multiplicar de ${numero}:\n\n${tabla}`)

        let opcion = prompt("Quiere intentar con otro número? Y/N:")
        if(opcion === 'Y' | opcion === 'y'){
            iniciarGeneracionTabla()
        }else{
            iniciarSimulador()
        }        
    } else {
        alert("Ingreso inválido. Por favor, ingrese un número válido.")
    }
}
//--------------------------------------------------------------------------------------------

// Función principal que interactúa con el usuario para el simulador interactivo
function iniciarSimulador() {
    let opcion = ""

    while (opcion !== '3') {
        opcion = prompt("Bienvenido al simulador interactivo. Elija una opción para continuar:\n\n1. Verificación de Edad\n2. Generación de Tabla de Multiplicar\n3. Salir")
        switch (opcion) {
            case '1':
                iniciarVerificacionEdad()
                break
            case '2':
                iniciarGeneracionTabla()
                break
            case '3':
                alert("Gracias por usar el simulador interactivo. ¡Hasta luego!")
                break
            default:
                alert("Opción inválida. Por favor, ingrese 1, 2 o 3 según la opción que desea ejecutar.")
                break
        }
    }
}
// Llamada a la función principal
iniciarSimulador()