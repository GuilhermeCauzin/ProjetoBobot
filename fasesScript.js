
let fase1 = localStorage.getItem("fase1");
let fase2 = localStorage.getItem("fase2");
let fase3 = localStorage.getItem("fase3");
if(fase1 == 'true'){
    document.getElementById("fase1").innerHTML += `<img class="icon" src="imgs/concluido.png" />` 
}
else{
    document.querySelector("#fase2 .bloqueado").style.display = "block";
}
if(fase2 == 'true'){
   document.getElementById("fase2").innerHTML += `<img class="icon" src="imgs/concluido.png" />` 
}
else{
    document.querySelector("#fase3 .bloqueado").style.display = "block";
}
if(fase3 == 'true'){
   document.getElementById("fase3").innerHTML += `<img class="icon" src="imgs/concluido.png" />` 
}


function ComecarFase(id){
    if(id == 1 && fase1 == 'false'){
        window.location.href = "jogo/fase1.html";
    }
    else if(id == 2 && fase2 == 'false' && fase1 == 'true'){
        window.location.href = "jogo/fase2.html";
    } 
    else if(id == 3 && fase3 == 'false' && fase2 == 'true'){
        window.location.href = "jogo/fase3.html";
    } 
}

let reiniciar = document.getElementById("reiniciar");
reiniciar.addEventListener('click', (e)=>{
    window.location.href = "/index.html"
})