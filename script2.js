
sessionStorage.setItem("fase1","false");
sessionStorage.setItem("fase2","false");
let fase1 = localStorage.getItem("fase1");
let fase2 = localStorage.getItem("fase2");
if(fase1 == 'true'){
    document.getElementById("fase1").innerHTML += `<img class="icon" src="imgs/concluido.png" />` 
};
if(fase2 == 'true'){
   document.getElementById("fase2").innerHTML += `<img class="icon" src="imgs/concluido.png" />` 
};


function ComecarFase(id){
    if(id == 1){
        window.location.href = "jogo/fase1.html";
    }
    else if(id == 2){
        window.location.href = "jogo/fase2.html";
    } 
}