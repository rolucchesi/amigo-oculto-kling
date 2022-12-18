const btnNew = document.querySelector('#btn-new')
const btnHow = document.querySelector('#btn-tutorial')
const btnStart = document.querySelector('#btn-start')
const modal = document.querySelector('.modal-how')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.close-modal')
const telaJogo = document.querySelector('.tela-jogo')
const palavraAtual = document.querySelector('.palavra-atual')
const btnAcerto = document.querySelector('#btn-acerto')
const btnPular = document.querySelector('#btn-pular')
const btnPausar = document.querySelector('#btn-pausar')
var respostaUsuario = document.getElementById('fresposta').value
$(document).ready(function(){
    $("#fresposta").change( function() {
        respostaUsuario = $("#fresposta").val();
        // alert($("#fresposta").val())
    });
});
//const respostaUsuario = document.forms["myForm"]["fresposta"].value
// function valorReposta(){
//     var respostaUsuario = document.getElementById('fresposta').value;
//     alert(respostaUsuario);
// }
//respostaUsuario.onchange = valorReposta;
//respostaUsuario.onblur = valorReposta;
let jogoIniciado = false
let jogoPausado = false
let palavraAleatoria
const arrayPalavrasAtual = []
const arrayAcertos = []
const numPalavras = 4;
let indexPalavraAtual = 0;
const timeRodada = 60;
let timeLeft = 60;
let countdownTimer;
let marcadorAtual = document.querySelector(`#marcador-word-${indexPalavraAtual}`)
let marcadoresAll = document.querySelectorAll('.marcador-word')

const listaPerguntas = [
    {word:'Qual ano do 1° amigo oculto?',categoria:'2011'},
    {word:'Apelido do Vieguinhas',categoria:'Tilt'},
    {word:'Sobremesa favorita do Alexandre',categoria:'Pudim'},
    {word:'O que Matheus Ramos come no microondas',categoria:'Pedra'},
    {word:'Nome do melhor grupo do mundo',categoria:'Kling'},
];


btnNew.addEventListener('click', function() {
    jogoIniciado = false;
    timeLeft = 45;
    document.getElementById("timer").innerHTML = timeRodada;
    telaJogo.classList.remove('hidden')
    gerarArrayPalavras(numPalavras)
    inicializarArrayAcertos(numPalavras)
    palavraAtual.textContent = "Clique Play para Iniciar"
    marcadorAtual.style.border = "0.5px solid";
    indexPalavraAtual = 0
    marcadorAtual = document.querySelector(`#marcador-word-0`)
    marcadorAtual.style.border = "3px solid";
    marcadoresAll.forEach(function(marca){marca.style.backgroundColor = 'lightgray'})
    document.querySelector('#div-btn-start').classList.remove('hidden')
    document.querySelector('#div-btn-play').classList.add('hidden')
    document.querySelector('.play-screen').classList.remove('hidden')
    document.querySelector('.win-screen').classList.add('hidden')
});

btnStart.addEventListener('click',function() {
    jogoIniciado = true
    document.querySelector('#div-btn-start').classList.add('hidden')
    document.querySelector('#div-btn-play').classList.remove('hidden')
    // console.log(arrayPalavrasAtual[indexPalavraAtual])
    palavraAtual.textContent = arrayPalavrasAtual[indexPalavraAtual]
    marcadorAtual.style.border = "3px solid";
    inicializarArrayAcertos(numPalavras)
    iniciarCronometro()
    // countdownTimer()

})

btnAcerto.addEventListener('click', function() {
    if(validarResposta()){
        arrayAcertos[indexPalavraAtual] = 'acerto'
        if (!arrayAcertos.includes('neutro')) {
            endGame()
            return
        }
        marcadorAtual.style.backgroundColor = 'green'
        // marcadorAtual.style.border = "0.5px solid";
        passarProximaPalavra()
    }

    
    // console.log(arrayAcertos)

})

btnPular.addEventListener('click', function() {
    // indexPalavraAtual >= arrayPalavrasAtual.length - 1? indexPalavraAtual = 0 : indexPalavraAtual++
    // palavraAtual.textContent = arrayPalavrasAtual[indexPalavraAtual]
    // marcadorAtual.style.border = "0.5px solid";
    // marcadorAtual = document.querySelector(`#marcador-word-${indexPalavraAtual}`)
    // marcadorAtual.style.border = "3px solid";
    passarProximaPalavra()
})


const gerarPalavraAleatoria = function (n) {
    palavraAleatoria = listaPerguntas[n].word
   return arrayPalavrasAtual.includes(palavraAleatoria) ?  gerarPalavraAleatoria(): palavraAleatoria
};

const gerarArrayPalavras = function (n) {
    arrayPalavrasAtual.length = 0
    for (let i = 0;i<n;i++){
        arrayPalavrasAtual.push(gerarPalavraAleatoria(i))
    }
}

const inicializarArrayAcertos = function (n){
    arrayAcertos.length = 0
    for (let i = 0;i<n;i++){
        arrayAcertos.push('neutro')
    }
}

const endGame = function (){
        document.querySelector('.play-screen').classList.add('hidden')
        document.querySelector('.win-screen').classList.remove('hidden')
        document.querySelector('.win-screen h2').textContent = `O seu score final foi de: ${contarAcertos()}/${numPalavras}`
        jogoIniciado = false
}

const contarAcertos = function (){
    return arrayAcertos.reduce((acc,cur) => {
        if (cur === 'acerto') {acc++}
        return acc 
    },0)
}

const passarProximaPalavra = function (){
    if (!jogoIniciado) {return}
    marcadorAtual.style.border = "0.5px solid";
    do {
        indexPalavraAtual >= arrayPalavrasAtual.length - 1? indexPalavraAtual = 0 : indexPalavraAtual++
    } while (arrayAcertos[indexPalavraAtual] !== 'neutro')
    palavraAtual.textContent = arrayPalavrasAtual[indexPalavraAtual]
    marcadorAtual = document.querySelector(`#marcador-word-${indexPalavraAtual}`)
    marcadorAtual.style.border = "3px solid";
}

const validarResposta = function (){
    //return 0
    console.log(respostaUsuario)
    console.log(listaPerguntas[indexPalavraAtual].categoria)
    return (respostaUsuario === listaPerguntas[indexPalavraAtual].categoria)

}

function iniciarCronometro() {
    clearInterval(countdownTimer);
    countdownTimer = setInterval(function(){
        if(timeLeft <= 0){
          clearInterval(countdownTimer);
          document.getElementById("timer").innerHTML = timeLeft;
          endGame();    
        } else if (!jogoIniciado) {
            document.getElementById("timer").innerHTML = timeRodada;
        }else {
          document.getElementById("timer").innerHTML = timeLeft;
          timeLeft -= 1;
        }
    }, 1000);
}

btnHow.addEventListener('click',function(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
})

const closeModal = function() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal()
    }
})

