import { Level1 } from "./level1.js";

// Configuration

var nWidth = screen.width;
var nHeight = screen.height;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = nWidth;
canvas.height = nHeight;

var faseAtual = new Level1(1,canvas);
faseAtual.start();
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(faseAtual.concluido == true){
        localStorage.setItem("fase1",'true');
        window.location.href ="/BoBot/fases.html";
    }
    faseAtual.update();
    faseAtual.draw();
    requestAnimationFrame(animate);
}

animate();