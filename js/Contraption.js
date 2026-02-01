const botonPersonajeJugador = document.getElementById("boton-seleccionar")
const botonReiniciar = document.getElementById("boton-reiniciar")

const seccionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const seccionReiniciar = document.getElementById("reiniciar")
const seccionSeleccionarPersonaje  = document.getElementById("seleccionar-personaje")
const seccionCombate = document.getElementById("combate")
const seccionMensajes = document.getElementById("mensajes")

const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorBotones = document.getElementById("contenedor-botones")
const contenedorMensajes = document.getElementById("mensajes-container")

let botonFuego
let botonAgua
let botonPlanta

let vidaOponente
let vidaJugador

let ataqueJugador
let personajeJugador

let mascotaOponente
let ataqueOponente
let indexMascotaOponente

let turno = 0

let opcionDeMokepones
let botones = []
let ataquesJugador = []
let ataquesPersonajeEnemigo = []

class Personaje {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques =[]
    }
    
}

let Siel = new Personaje("Siel", "./assets/EJvUVDfWwAc4ERq.png", 3)
let Lark = new Personaje("Lark", "./assets/EJvUVDfWwAc4ERq.png", 3)
let Rook = new Personaje("Rook", "./assets/EJvUVDfWwAc4ERq.png", 3)
let Kow = new Personaje("Kow", "./assets/EJvUVDfWwAc4ERq.png", 3)

Siel.ataques.push(
    {nombre:'Agua', id: 'boton-agua'},
    {nombre:'Fuego', id: 'boton-fuego'},
    {nombre:'Planta', id: 'boton-planta'},
    {nombre:'Agua', id: 'boton-agua'}
)

Lark.ataques.push(
    {nombre:'Agua', id: 'boton-agua'},
    {nombre:'Fuego', id: 'boton-fuego'},
    {nombre:'Planta', id: 'boton-planta'}
)

Rook.ataques.push(
    {nombre:'Agua', id: 'boton-agua'},
    {nombre:'Fuego', id: 'boton-fuego'},
    {nombre:'Planta', id: 'boton-planta'}
)

Kow.ataques.push(
    {nombre:'Agua', id: 'boton-agua'},
    {nombre:'Fuego', id: 'boton-fuego'},
    {nombre:'Planta', id: 'boton-planta'}
)

let arrPersonajes = []

arrPersonajes.push(Siel, Lark, Rook, Kow)

function iniciarJuego(){

    seccionSeleccionarAtaque.style.display = 'none'
    seccionReiniciar.style.display = 'none'
    seccionCombate.style.display = 'none'
    seccionMensajes.style.display = 'none'

    arrPersonajes.forEach((mokepon)=>{
        opcionDeMokepones = `
        <input type="radio" name="personaje" id=${mokepon.nombre}>
                <label class="tarjeta-personaje" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} alt=${mokepon.nombre}>
                </label>
        `
        
        contenedorTarjetas.innerHTML += opcionDeMokepones

    })
    botonPersonajeJugador.addEventListener('click',seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)

    vidaOponente = document.getElementById("hp-oponente")
    vidaJugador = document.getElementById("hp-jugador")
}

function resultadoJuego(){
    let resultado = document.getElementById("resultado-parrafo")
    
    if(parseInt(vidaOponente.innerHTML) <= 0){
        //nuevoParrafo.innerHTML = "Ganaste"
        //resultado.appendChild(nuevoParrafo)
        resultado.innerHTML = "Ganaste"
        deshabilitarBotones()
        seccionReiniciar.style.display = 'block'
    }
    else if(parseInt(vidaJugador.innerHTML) <= 0){
        //nuevoParrafo.innerHTML = "Perdiste"
        //resultado.appendChild(nuevoParrafo)
        resultado.innerHTML = "Perdiste"
        deshabilitarBotones()
        seccionReiniciar.style.display = 'block'
    }
    else{
        //nuevoParrafo.innerHTML = "Continua"
        //resultado.appendChild(nuevoParrafo)
        resultado.innerHTML = "Continua"
        rehabilitarBotones()
    }
   

}


function resultadoCombate(){

    let nuevoParrafo = document.createElement("p")
    let aJugador = ataquesJugador[turno]
    let aOponente = ataquesPersonajeEnemigo[turno]

    if (aJugador == aOponente){
        nuevoParrafo.innerHTML = "Ha sido un empate"
    }
    else if((aJugador == "Fuego" && aOponente == "Planta") || (aJugador == "Agua" && aOponente== "Fuego") || (aJugador == "Planta" && aOponente == "Agua")){
        nuevoParrafo.innerHTML = personajeJugador + " ha infligido daño a " + mascotaOponente
        vidaOponente.innerHTML = parseInt(vidaOponente.innerHTML) - 1
    }
    else{
        nuevoParrafo.innerHTML = mascotaOponente + "-oponente ha infligido daño a " + personajeJugador
        vidaJugador.innerHTML = parseInt(vidaJugador.innerHTML) - 1
    }

    contenedorMensajes.appendChild(nuevoParrafo)

    turno++
}

function numeroAleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function seleccionarAtaqueOponente(){
    let index = numeroAleatorio(0,arrPersonajes[indexMascotaOponente].ataques.length - 1)
    

    ataqueOponente = arrPersonajes[indexMascotaOponente].ataques.at(index)
    ataquesPersonajeEnemigo.push(ataqueOponente.nombre)
    console.log(ataquesPersonajeEnemigo)

    let nuevoParrafo = document.createElement("p")
    nuevoParrafo.innerHTML = personajeJugador + " ha atacado con " + ataqueJugador + ". " + mascotaOponente + " ha atacado con " + ataqueOponente.nombre
    
    contenedorMensajes.appendChild(nuevoParrafo)

    iniciarPelea()
    //resultadoCombate()
    //resultadoJuego()
}

function iniciarPelea(){
    let turnosMaximo = 3
    if(ataquesJugador.length%turnosMaximo == 0){
        for(let i = 0; i<turnosMaximo;i++){
            resultadoCombate()
        }
        resultadoJuego()
    }
}

function generarBotonesPersonaje(indice){
    arrPersonajes[indice].ataques.forEach((ataque)=>{
            contenedorBotones.innerHTML += `<button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`
        })
        
    //Honestamente es más facil usar el nombre como su id
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonPlanta = document.getElementById("boton-planta")
    botones = document.querySelectorAll('.BAtaque')

    botonFuego.addEventListener('click', ()=>{ataqueJugador = "Fuego"; botonFuego.disabled = true})
    botonAgua.addEventListener('click', ()=>{ataqueJugador = "Agua"; botonAgua.disabled = true})
    botonPlanta.addEventListener('click', ()=>{ataqueJugador = "Planta"; botonPlanta.disabled = true})

    secuenciaAtaque()
}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e)=>{
            if(e.target.textContent === 'Agua'){
                ataquesJugador.push('Agua')
                ataqueJugador = 'Agua'
                boton.style.background = 'aquamarine'
                boton.disabled = true
            }
            else if(e.target.textContent === 'Fuego'){
                ataquesJugador.push('Fuego')
                ataqueJugador = "Fuego"
                boton.style.background = 'aquamarine'
                boton.disabled = true
            }
            else if(e.target.textContent === 'Planta'){
                ataquesJugador.push('Planta')
                ataqueJugador = "Planta"
                boton.style.background = 'aquamarine'
                boton.disabled = true
            }
            console.log(ataquesJugador)
            seleccionarAtaqueOponente()
        })
    })
}
function seleccionarMascotaJugador(){
    
    let PersonajesIndex
    
    let inputSiel = document.getElementById(arrPersonajes[0].nombre)
    let inputLark = document.getElementById(arrPersonajes[1].nombre)
    let inputRook = document.getElementById(arrPersonajes[2].nombre)
    let inputKow = document.getElementById(arrPersonajes[3].nombre)

    if( inputLark.checked ){
        alert("Seleccionaste a Lark")
        PersonajesIndex = 1
    }
    else if( inputSiel.checked ){
        alert("Seleccionaste a Siel")
        PersonajesIndex = 0
    }
    else if( inputRook.checked ){
        alert("Seleccionaste a Rook")
        PersonajesIndex = 2
    }
    else if( inputKow.checked ){
        alert("Seleccionaste a Kow")
        PersonajesIndex = 3
    }
    else{
        alert("Deberías seleccionar a alguien")
        return
    }

    personajeJugador = arrPersonajes[PersonajesIndex].nombre
    document.getElementById("mascota-jugador").innerHTML = personajeJugador

    seleccionarMascotaOponente()
    generarBotonesPersonaje(PersonajesIndex)

    seccionSeleccionarAtaque.style.display = 'block'
    seccionSeleccionarPersonaje.style.display = 'none'
    seccionCombate.style.display = 'grid'
    seccionMensajes.style.display= 'grid'
}

function seleccionarMascotaOponente(){
    indexMascotaOponente = numeroAleatorio(0,arrPersonajes.length - 1)


    mascotaOponente = arrPersonajes.at(indexMascotaOponente).nombre

    document.getElementById("mascota-oponente").innerHTML = mascotaOponente
}

function deshabilitarBotones(){
    botonAgua.disabled = true
    botonPlanta.disabled = true
    botonFuego.disabled = true
    botones.forEach((boton)=>boton.disabled=false)
}

function rehabilitarBotones(){
    botonAgua.disabled = false
    botonPlanta.disabled = false
    botonFuego.disabled = false
    botones.forEach((boton)=>boton.disabled=false)
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener('load', iniciarJuego)