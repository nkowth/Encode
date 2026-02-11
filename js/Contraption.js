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

const seccionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let botonFuego
let botonAgua
let botonPlanta

let vidaOponente
let vidaJugador

let ataqueJugador
let personajeJugador

let personajeOponente
let ataqueOponente
let indexPersonajeOponente
let personajeJugadorOBJ

let turno = 0

let opcionDePersonajes
let botones = []
let ataquesJugador = []
let ataquesPersonajeEnemigo = []

let lienzo = mapa.getContext("2d")
let intervalo
let pasos = 5
console.log(mapa)
let altura
let anchoMapa = window.innerWidth - 200

altura = anchoMapa * 600 / 800
const anchoMaximoDelMapa = 1000

if(anchoMapa > anchoMaximoDelMapa){
    anchoMapa = anchoMaximoDelMapa - 20
}

mapa.width = anchoMapa
mapa.height = altura

let mapaBG = new Image()
mapaBG.src = './assets/un-carro-derrotado2.jpg'

class Personaje {
    constructor(nombre, foto, vida, x=20, y=20){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques =[]
        this.x = x
        this.y = y
        this.ancho = 80
        this.alto = 90
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
    
    pintarMokepon(x,y){
        lienzo.drawImage(
            this.mapaFoto, x, y, this.ancho, this.alto
        )
    }
}

let Siel = new Personaje("Siel", "./assets/EJvUVDfWwAc4ERq.png", 3)
let Lark = new Personaje("Lark", "./assets/EJvUVDfWwAc4ERq.png", 3, 400, 280)
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
    seccionVerMapa.style.display = 'none'

    arrPersonajes.forEach((mokepon)=>{
        opcionDePersonajes = `
        <input type="radio" name="personaje" id=${mokepon.nombre}>
                <label class="tarjeta-personaje" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} alt=${mokepon.nombre}>
                </label>
        `
        
        contenedorTarjetas.innerHTML += opcionDePersonajes

    })
    botonPersonajeJugador.addEventListener('click',seleccionarPersonajeJugador)
    
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
        nuevoParrafo.innerHTML = personajeJugador + " ha infligido daño a " + personajeOponente
        vidaOponente.innerHTML = parseInt(vidaOponente.innerHTML) - 1
    }
    else{
        nuevoParrafo.innerHTML = personajeOponente + "-oponente ha infligido daño a " + personajeJugador
        vidaJugador.innerHTML = parseInt(vidaJugador.innerHTML) - 1
    }

    contenedorMensajes.appendChild(nuevoParrafo)

    turno++
}

function numeroAleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function seleccionarAtaqueOponente(){
    let index = numeroAleatorio(0,arrPersonajes[indexPersonajeOponente].ataques.length - 1)
    

    ataqueOponente = arrPersonajes[indexPersonajeOponente].ataques.at(index)
    ataquesPersonajeEnemigo.push(ataqueOponente.nombre)
    console.log(ataquesPersonajeEnemigo)

    let nuevoParrafo = document.createElement("p")
    nuevoParrafo.innerHTML = personajeJugador + " ha atacado con " + ataqueJugador + ". " + personajeOponente + " ha atacado con " + ataqueOponente.nombre
    
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
function seleccionarPersonajeJugador(){
    
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

    personajeJugadorOBJ = arrPersonajes[PersonajesIndex]
    personajeJugador = personajeJugadorOBJ.nombre
    document.getElementById("personaje-jugador").innerHTML = personajeJugador

    seccionVerMapa.style.display = 'flex'
    
    iniciarMapa()

    seleccionarPersonajeOponente()
    generarBotonesPersonaje(PersonajesIndex)

    
    seccionSeleccionarPersonaje.style.display = 'none'
    
}

function seleccionarPersonajeOponente(){
    indexPersonajeOponente = numeroAleatorio(0,arrPersonajes.length - 1)

    personajeOponente = arrPersonajes.at(indexPersonajeOponente).nombre

    document.getElementById("personaje-oponente").innerHTML = personajeOponente
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

function pintarCanvas(){
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    personajeJugadorOBJ.x = personajeJugadorOBJ.x + personajeJugadorOBJ.velocidadX
    personajeJugadorOBJ.y = personajeJugadorOBJ.y + personajeJugadorOBJ.velocidadY
    lienzo.drawImage(mapaBG, 0, 0, mapa.width, mapa.height)
    lienzo.drawImage(personajeJugadorOBJ.mapaFoto, personajeJugadorOBJ.x,personajeJugadorOBJ.y,personajeJugadorOBJ.ancho,personajeJugadorOBJ.alto)
    Lark.pintarMokepon(400, 280)

    if(personajeJugadorOBJ.velocidadX !== 0 || personajeJugadorOBJ.velocidadY !== 0){
        revisarColision(Lark)
    }
}

function moverDerecha() {
    
    personajeJugadorOBJ.velocidadX  = pasos
    pintarCanvas()
}

function moverIzquierda() {
   
    personajeJugadorOBJ.velocidadX  = -pasos
    pintarCanvas()
}

function moverAbajo() {
   
    personajeJugadorOBJ.velocidadY  = pasos
    pintarCanvas()
}

function moverArriba() {
    
    personajeJugadorOBJ.velocidadY  = -pasos
    pintarCanvas()
}

function sePresionaUnaTecla(event){
    
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        default:
            break;
    }
}

function detenerMovimiento(){
    personajeJugadorOBJ.velocidadX = 0
    personajeJugadorOBJ.velocidadY = 0
    pintarCanvas()
}

function iniciarMapa(){
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionaUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function revisarColision(objeto){

    const arribaObjeto = objeto.y
    const abajoObjeto = objeto.y + objeto.alto
    const derechaObjeto = objeto.x + objeto.ancho
    const izquierdaObjeto = objeto.x
    
    const arribaPersonaje = personajeJugadorOBJ.y
    const abajoPersonaje = personajeJugadorOBJ.y + personajeJugadorOBJ.alto
    const derechaPersonaje = personajeJugadorOBJ.x + personajeJugadorOBJ.ancho
    const izquierdaPersonaje = personajeJugadorOBJ.x

    if(
        abajoPersonaje < arribaObjeto ||
        arribaPersonaje > abajoObjeto ||
        derechaPersonaje < izquierdaObjeto ||
        izquierdaPersonaje > derechaObjeto
    ){
        return
    }
    
    detenerMovimiento()
    seccionVerMapa.style.display = 'none'
    seccionSeleccionarAtaque.style.display = 'block'
    seccionCombate.style.display = 'grid'
    seccionMensajes.style.display= 'grid'
}

window.addEventListener('load', iniciarJuego)