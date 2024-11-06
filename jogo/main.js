import { Level1 } from "./level1.js";
import { Level2 } from "./level2.js";

// Configuration

var nWidth = screen.width;
var nHeight = screen.height;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = nWidth;
canvas.height = nHeight;

var faseAtual = new Level2(2,canvas);
faseAtual.start();
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(faseAtual.concluido == true){
        localStorage.setItem("fase2",'true');
        window.location.href = "/fases.html";
    }
    faseAtual.update();
    faseAtual.draw();
    requestAnimationFrame(animate);
}

animate();