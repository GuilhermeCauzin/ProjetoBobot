import { Circulo } from "./circulo.js";
import { Game } from "./game.js";
import { Object } from "./object.js";
import { Player } from "./player.js";

export class Level1{
    constructor(index, canvas){
        this.index = index;
        this.name = "Nivel1 - Movimentar-se";
        this.objetivo = "Aprender a se movimentar";
        this.descricao = "Ande com o BoB pressionando as teclas:";
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.game = new Game(canvas.width, canvas.height,this.context);
        this.objects = [];
        this.concluido = false;

        this.imgSeta1 = document.getElementById("sEsquerda");
        this.imgSeta2 = document.getElementById("sDireita");
    }
    start(){
        this.game.Player = new Player(this.game,10,700,1.5);
        var obj1 = new Object(this.game,500, 700+(this.game.Player.height/2), null, new Circulo(40,0,"Red"), "1", false, null);
        var obj2 = new Object(this.game,1000, 700+(this.game.Player.height/2), null, new Circulo(40,0,"Blue"), "2", false, null);
        var obj3 = new Object(this.game,1500, 700+(this.game.Player.height/2), null, new Circulo(40,0,"Green"), "3", false, null);
        this.game.objects.push(obj1, obj2, obj3);

        let bar = document.getElementById("bar");
        bar.style.display = 'Flex';
        bar.innerHTML = `
        <p style="font: 700 25px black;font-family:Roboto">Objetivos</p>\n
        <p>Mova-se e encoste em todos os círculos para pegá-los:\n
            <ol>
                <li style="margin:20px 0">Circulo 1 <img draggable="false" id="item1" src="unchecked.png" style="width:20px;vertical-align:middle;float:right;margin:0 0 0 10px" /></li>
                <li style="margin:20px 0">Circulo 2 <img draggable="false" id="item2" src="unchecked.png" style="width:20px;vertical-align:middle;float:right;margin:0 0 0 10px" /></li>
                <li style="margin:20px 0">Circulo 3 <img draggable="false" id="item3" src="unchecked.png" style="width:20px;vertical-align:middle;float:right;margin:0 0 0 10px" /></li>
            </ol>
        </p>
        `

        this.game.Player.canMove = true;
    }
    update(){
        this.game.update();
        var objects = this.game.objects.filter((obj) => this.game.checkNearObject(obj));
        if(objects.length > 0){
            objects.forEach((obj) =>{
                obj.visible = false;
            })
        }

        var invisiveis = this.game.objects.filter((obj) => obj.visible == false);
        let obj1 =invisiveis.filter((obj) => obj.index == 1)[0];
        let obj2 =invisiveis.filter((obj) => obj.index == 2)[0];
        let obj3 =invisiveis.filter((obj) => obj.index == 3)[0];
        if(obj1 != null && obj1.visible == false){
            //Mudar item para completado
            let item = document.getElementById("item1");
            item.src = "checked.png"
        }
        if(obj2 != null && obj2.visible == false){
            //Mudar item para completado
            let item = document.getElementById("item2");
            item.src = "checked.png"
        }
        if(obj3 != null && obj3.visible == false){
            //Mudar item para completado
            let item = document.getElementById("item3");
            item.src = "checked.png"
        }

        if(invisiveis.length  == this.game.objects.length){
            this.concluido = true;
        }
    }
    draw(){
        this.context.font = "500 80px Roboto";

        var text = this.descricao;
        this.context.fillStyle = '#AEAEFA';
        printAtWordWrap(this.context,text,(this.canvas.width/2)-(800/2),100,80,1000,1)
        //this.context.fillText(text, (this.canvas.width/2)-(measure.width/2), 100)


        this.context.drawImage(this.imgSeta1, (this.canvas.width/2)-250,300,150,210);
        this.context.drawImage(this.imgSeta2, (this.canvas.width/2)+100,300,150,210);

        this.game.draw(this.context);
    }
}

function printAtWordWrap( context , text, x, y, lineHeight, fitWidth, align)
{
    //Align || left = 0 (default) | center = 1 | right = 2
    fitWidth = fitWidth || 0;
    
    if (fitWidth <= 0)
    {
        context.fillText( text, x, y );
        return;
    }
    var words = text.split(' ');
    var currentLine = 0;
    var idx = 1;
    while (words.length > 0 && idx <= words.length)
    {
        var str = words.slice(0,idx).join(' ');
        var w = context.measureText(str).width;
        if ( w > fitWidth )
        {
            if (idx==1)
            {
                idx=2;
            }
            var t = words.slice(0,idx-1).join(' ');
            var measure = context.measureText(t);
            if(align == null || align == 0){
                context.fillText( t, x, y + (lineHeight*currentLine) );
            }
            else if(align == 1){
                context.fillText( t, x+(measure.width/5), y + (lineHeight*currentLine) );
            }
            else if(align == 2){
                context.fillText( t, x+(measure.width/2.5), y + (lineHeight*currentLine) );
            }
            currentLine++;
            words = words.splice(idx-1);
            idx = 1;
        }
        else
        {idx++;}
    }
    if  (idx > 0)
        context.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
}