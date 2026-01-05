function numeroAleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function eleccionJugador(jugada){
    let resultado = ""
    if(jugada == 1){
        resultado = "Atacas con piedras"
    }
    else if(jugada == 2){
        resultado = "Decidiste vivir de papeleo"
    }
    else if(jugada == 3){
        resultado = "Se ve que quieres cortar vidas"
    }
    else{
        resultado = "Pero qué carajos te pasa?"
    }
    return resultado
}

function eleccionIA(pc){
    
    let resultado = ""

    if(pc == 1){
        resultado = "ChatGPT eligió un rocoso monolito"
    }
    else if(pc == 2){
        resultado = "Gemini elige papel :T"
    }
    else if(pc == 3){
        resultado = "Grok elige tijeras :T"
    }
    
    return resultado
}

//Devuelve un número del 0 al 2. Donde 0 = jugador pierde, 1 = jugador empata y 2 = jugador gana
function combate(jugador, pc){
    val = 0

    if(pc == jugador){
        val = 1
    }
    else if( (jugador == 1 && pc == 3)|| (jugador == 2 && pc == 1) || (jugador == 3 && pc == 2)){ //Cual sería el flujo del programa ahí dentro?
        val = 2
    }
    
    return val
}

let jugador = 0
let pc = 0
let ganadas = 0
let perdidas = 0

while(ganadas <2 && perdidas < 2){

    jugador = prompt("Elige un número: \n1.Piedra \n2.Papel   o \n3.Tijera")
    alert(eleccionJugador(jugador))

    pc = numeroAleatorio(1,3)
    alert(eleccionIA(pc)) 
    
    let combateResultado = combate(jugador, pc) //Aqui hice let combate = combate(..).. como combate no existe la consola me dijo que habia un error de referencia Dx

    if( combateResultado == 1){
        alert("Fue un empate")
    }
    else if(combateResultado == 0){
        alert("Robotín te masacró hoy") 
        perdidas += 1
    }
    else if(combateResultado == 2){
        alert("Ganaste")
        ganadas += 1
    }
    else{
        alert("Algo salió mal")
    }

}

if (ganadas> perdidas){
    alert("No lo sabes pero eres un heroe")
}else{
    alert("La IA muestra su supremacia bailandote una L")
}