let i = 0;
let video = document.getElementById("video");
let balao = document.getElementById("falas")
video.addEventListener('ended', (e) => {NextStep(); if(i == 1){this.removeEventListener('ended')}})
function NextStep(){
    if(i == 0){
        i=1;
        balao.style.display = 'block';
        video.src = "imgs/gifAgitado.mp4";
        video.play();
        video.loop = true;
        setTimeout(() => {if(i == 1){NextStep()}},4000)
    }
    else if(i == 1){
        i = 2;
        balao.src = 'imgs/fala2.png';
        document.addEventListener('mousedown',(e) => {if(e.button == 0){if(i == 3){this.removeEventListener('mousedown');return;};NextStep(); }})
    }
    else if(i == 2){
        i = 3;
        balao.src = 'imgs/fala3.png';
        setTimeout(() => {if(i == 3){NextStep()}},4000)
    }
    else if(i == 3){
        document.location.href = "fases.html"
    }
    
}
