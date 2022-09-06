let chisato = document.getElementById("chisato");
let bullet = document.getElementById("bullet");
let startBtn = document.querySelector(".start");
let reset = document.querySelector(".reset");
let segundos = 4;


function jump() {
    if(chisato.classList != "animate") {
        chisato.classList.add("animate");
    }
    chisato.classList.add("animate");
    setTimeout(function(){
        chisato.classList.remove("animate")
    },500)
}

let checkDead = setInterval(function(){
    let chisatopTop =
    parseInt(window.getComputedStyle(chisato).getPropertyValue("top"));
    let bulletLeft =
    parseInt(window.getComputedStyle(bullet).getPropertyValue("left"));
    if(bulletLeft<20 && bulletLeft>0 && chisatopTop>=170) {
        bullet.style.animation = "none";
        bullet.style.display = "none";
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You lose, now Chisato is dead, and its all your fault ;_;'
          })
    }
},10);

startBtn.addEventListener('click', startGame)

function startGame(){
    setTimeout(function(){
        bullet.classList.toggle('animate-bullet')
    },3000)

    cargarSegundo()
    setInterval(cargarSegundo, 1000)
}

function cargarSegundo() {
    let txtSegundos;

    if(segundos < 0){
        segundos = 3;
    }

    if(segundos <= 0){
        return;
    }else{
        txtSegundos = segundos;
    }
    document.getElementById('segundos').innerHTML = txtSegundos;
    segundos --;
}

reset.addEventListener('click', ()=>{
    location.reload();
})