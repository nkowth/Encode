let personajeJugador
let ataqueJugador

let mascotaOponente
let ataqueOponente

let vidaOponente
let vidaJugador

let botonReiniciar

let seccionSeleccionarAtaque
let seccionReiniciar
let seccionSeleccionarPersonaje
let seccionMensajes

let contenedorMensajes

function iniciarJuego(){

    contenedorMensajes = document.getElementById("mensajes-container")

    seccionSeleccionarPersonaje = document.getElementById("seleccionar-personaje")

    seccionSeleccionarAtaque= document.getElementById("seleccionar-ataque")
    seccionSeleccionarAtaque.style.display = 'none'

    seccionReiniciar = document.getElementById("reiniciar")
    seccionReiniciar.style.display = 'none'

    seccionCombate = document.getElementById("combate")
    seccionCombate.style.display = 'none'

    seccionMensajes = document.getElementById("mensajes")
    seccionMensajes.style.display = 'none'

    

    let botonPersonajeJugador = document.getElementById("boton-seleccionar")
    botonPersonajeJugador.addEventListener('click',seleccionarMascotaJugador)

    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener('click', ()=>{ataqueJugador = "Fuego"; alert(ataqueJugador); seleccionarAtaqueOponente()})

    let botonAgua = document.getElementById("boton-agua")
    botonAgua.addEventListener('click', ()=>{ataqueJugador = "Agua"; alert(ataqueJugador); seleccionarAtaqueOponente()})

    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.addEventListener('click', ()=>{ataqueJugador = "Tierra"; alert(ataqueJugador); seleccionarAtaqueOponente()})

    botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener('click', reiniciarJuego)

    vidaOponente = document.getElementById("hp-oponente")
    vidaJugador = document.getElementById("hp-jugador")
}

function resultadoJuego(){
    let resultado = document.getElementById("resultado")
    let nuevoParrafo = document.createElement("p")
    
    if(parseInt(vidaOponente.innerHTML) == 0){
        nuevoParrafo.innerHTML = "Ganaste"
        resultado.appendChild(nuevoParrafo)
        deshabilitarBotones()
        seccionReiniciar.style.display = 'block'
    }
    else if(parseInt(vidaJugador.innerHTML) == 0){
        nuevoParrafo.innerHTML = "Perdiste"
        resultado.appendChild(nuevoParrafo)
        deshabilitarBotones()
        seccionReiniciar.style.display = 'block'
    }
   

}

function resultadoCombate(){

    let nuevoParrafo = document.createElement("p")
    
    if (ataqueJugador == ataqueOponente){
        nuevoParrafo.innerHTML = "Ha sido un empate"
    }
    else if((ataqueJugador == "Fuego" && ataqueOponente == "Tierra") || (ataqueJugador == "Agua" && ataqueOponente== "Fuego") || (ataqueJugador == "Tierra" && ataqueOponente == "Agua")){
        nuevoParrafo.innerHTML = personajeJugador + " ha infligido daño a " + mascotaOponente
        vidaOponente.innerHTML = parseInt(vidaOponente.innerHTML) - 1
    }
    else{
        nuevoParrafo.innerHTML = mascotaOponente + " ha infligido daño a " + personajeJugador
        vidaJugador.innerHTML = parseInt(vidaJugador.innerHTML) - 1
    }

    contenedorMensajes.appendChild(nuevoParrafo)
}

function numeroAleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function seleccionarAtaqueOponente(){
    let index = numeroAleatorio(0,2)
    let ataqueTipo = ["Fuego","Agua","Tierra"]

    ataqueOponente = ataqueTipo.at(index)

    let nuevoParrafo = document.createElement("p")
    nuevoParrafo.innerHTML = personajeJugador + " ha atacado con " + ataqueJugador+ ". " + mascotaOponente + " ha atacado con " + ataqueOponente
    
    contenedorMensajes.appendChild(nuevoParrafo)

    resultadoCombate()
    resultadoJuego()
}

function seleccionarMascotaJugador(){
    
    let Personajes = ["Lark", "Siel", "Medio", "Rhok"]
    let PersonajesIndex
    let inputLark = document.getElementById(Personajes[0])
    let inputSiel = document.getElementById(Personajes[1])
    let inputMedio = document.getElementById(Personajes[2])
    let inputRhok = document.getElementById(Personajes[3])

    if( inputLark.checked ){
        alert("Seleccionaste a Lark")
        PersonajesIndex = 0
    }
    else if( inputSiel.checked ){
        alert("Seleccionaste a Siel")
        PersonajesIndex = 1
    }
    else if( inputMedio.checked ){
        alert("Seleccionaste a Medio")
        PersonajesIndex = 2
    }
    else if( inputRhok.checked ){
        alert("Seleccionaste a Rhok")
        PersonajesIndex = 3
    }
    else{
        alert("Deberías seleccionar a alguien")
        return
    }

    personajeJugador = Personajes[PersonajesIndex]
    document.getElementById("mascota-jugador").innerHTML = personajeJugador

    seleccionarMascotaOponente()

    seccionSeleccionarAtaque.style.display = 'block'
    seccionSeleccionarPersonaje.style.display = 'none'
    seccionCombate.style.display = 'grid'
    seccionMensajes.style.display= 'grid'
}

function seleccionarMascotaOponente(){
    let index = numeroAleatorio(0,3)

    let Personajes = ["Lark", "Siel", "Medio", "Rhok"]

    mascotaOponente = Personajes.at(index)

    document.getElementById("mascota-oponente").innerHTML = mascotaOponente
}

function deshabilitarBotones(){
    let botonPersonajeJugador = document.getElementById("boton-seleccionar")
    let botonFuego = document.getElementById("boton-fuego")
    let botonAgua = document.getElementById("boton-agua")
    let botonTierra = document.getElementById("boton-tierra")

    botonPersonajeJugador.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    botonFuego.disabled = true
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener('load', iniciarJuego)