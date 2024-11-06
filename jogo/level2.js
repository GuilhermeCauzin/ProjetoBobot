import { Game } from "./game.js";
import { Grid } from "./grid.js";
import { Object } from "./object.js";
import { Player } from "./player.js";

export class Level2{
    constructor(index,canvas){
        this.index = index;
        this.name = "Nivel2 - Mover, Soltar e Colocar Pastas";
        this.objetivo = "Usar pasta";
        this.descricao = "Aprenda a Segurar, Soltar e Colocar pastas!";
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        
        //WIDTH PROPORTIONAL
        var wP =Math.floor(this.canvas.width/100);
        var wH =Math.floor(this.canvas.height/80);

        this.game = new Game(canvas.width, canvas.height, new Grid(this.canvas.width, this.canvas.height,wP,wH));
        this.concluido = false;

        this.marginX = 3;
        this.marginY = 3;

        this.objW = (this.game.grid.width/this.game.grid.columnNumbers)-(this.marginX*2);
        this.objH = (this.game.grid.height/this.game.grid.rowNumbers)-(this.marginY*2);

        //variaveis das etapas
        this.check1 = 0;
        this.check2 = 0;
        this.check3 = 0;
        this.check4 = 0;
        this.check5 = 0;

    }
    start(){
        this.game.Player = new Player(this.game,10,700,1.5);
        let bar = document.getElementById("bar");
        bar.style.display = 'Flex';
        bar.innerHTML = `
        <p style="font: 700 25px black;font-family:Roboto">Objetivos</p>\n
        <ol>
            <li style="margin:20px 0; align-items:center; flex-wrap:nowrap; flex-direction:row;"><div style="display:flex; flex-direction:row;align-items:center;flex-wrap:nowrap">Ande até o arquivo e segure-o.(Dica:Clique e SEGURE o botão esquerdo do mouse) <img draggable="false" id="item1" src="unchecked.png" style="width:20px;vertical-align:middle;float:right;margin:0 0 0 10px" /></li></li>
            <li style="margin:20px 0">Leve o arquivo até a posição demarcada. <img draggable="false" id="item2" src="unchecked.png" style="width:20px;vertical-align:middle;float:right;margin:0 0 0 10px" /></li>
            <li style="margin:20px 0; "><div style="display:flex; flex-direction:row;align-items:center;flex-wrap:nowrap">Coloque uma pasta dentro da outra.(Dica: Solte o botão do mouse quando estiver EM CIMA do local)<img draggable="false" id="item3" src="unchecked.png" style="width:20px;vertical-align:middle;float:right;margin:0 0 0 10px" /></div></li>
            <li style="margin:20px 0"><div style="display:flex; flex-direction:row;align-items:center;flex-wrap:nowrap">Abra a pasta.(Dica: Quando estiver próximo de uma pasta, clique com o botão direito do mouse) <img draggable="false" id="item4" src="unchecked.png" style="width:20px;vertical-align:middle;float:right;margin:0 0 0 10px" /></div></li>
            <li style="margin:20px 0"><div style="display:flex; flex-direction:row;align-items:center;flex-wrap:nowrap">Feche a pasta.(Dica: Para fechar aproxime-se ao símbolo de \"X\" e clique nele) <img draggable="false" id="item5" src="unchecked.png" style="width:20px;vertical-align:middle;float:right;margin:0 0 0 10px" /></div></li>
        </ol>`

        this.game.Player.canMove = true;
    }
    update(){
        this.game.update();
        if(this.check1 == 0){
            //iniciar próximo passo
            var obj = new Object(this.game,(this.canvas.width/2), 800,this.objW,this.objH,document.getElementById("folder"),null,null,true,[]);
            obj.nome = "Pasta 1"
            obj.placeAtGrid(this.game);
            this.check1 = 1;
        }
        else if(this.check1 == 1){
            //verificações
            if(this.game.holding != null){
                //adicionar coisa aq
                this.check1 = 2;
                this.check2 = 1;
                
                //Mudar item para completado
                let item = document.getElementById("item1");
                item.src = "checked.png"
            }
        }
        else if(this.check2 == 1){
            //verificações
            if(this.game.objects[0].gridX == 9 && this.game.objects[0].gridY == 3){
                this.check2 = 2;
                let item = document.getElementById("item2");
                item.src = "checked.png"
            }
        }
        else if(this.check3 == 0){
            this.check3 = 1;
            //Reflexao: O que eu preciso pra começar está etapa? => Implementar o que eu preciso!!
            //iniciar próximo passo
            var obj = new Object(this.game,(this.canvas.width/2), 800,this.objW,this.objH,document.getElementById("folder"),null,null,true,[]);
            obj.nome = "Pasta 2";
            obj.placeAtGrid(this.game);
        }
        else if(this.check3 == 1){
            //verificações
            if(this.game.objects[0].items != null && this.game.objects[0].items.length > 0){
                this.check3 = 2;
                let item = document.getElementById("item3");
                item.src = "checked.png"
            }
        }
        else if(this.check4 == 0){
            this.check4 = 1;
        }
        else if(this.check4 == 1){
            if(this.game.pastaAberta.length > 0){
                this.check4 = 2;
                let item = document.getElementById("item4");
                item.src = "checked.png"
            }
        }
        else if(this.check5 == 0){
            this.check5 = 1;
        }
        else if(this.check5 == 1){
            if(this.game.pastaAberta.length == 0){
                this.check5 = 2;
                let item = document.getElementById("item5");
                item.src = "checked.png"
            }
        }
        else{
            this.concluido = true;
        }

        //Checagem de conclusao da fase
    }
    draw(){
        if(this.check1 == 2 && this.check2 == 1){
            let gW = this.game.grid.getSpaceWidth();
            let gH= this.game.grid.getSpaceHeight();

            let [gX,gY] = this.game.grid.getCordinates(9,3);
            this.context.beginPath();
            this.context.fillStyle = 'rgba(0,255,0,0.8)';
            this.context.roundRect(gX, gY, this.game.objects[0].width,this.game.objects[0].height,3);
            this.context.fill();
        }

        //<-
        this.context.font = "500 80px Roboto";
        var text = this.descricao;
        this.context.fillStyle = '#AEAEFA';
        printAtWordWrap(this.context,text,(this.canvas.width/2)-(500),100,80,1000,1)
        //->
        
        this.game.draw(this.context);
    }
}

//Third Party Content(99.9%)
function printAtWordWrap( context , text, x, y, lineHeight, fitWidth, align)
{
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
            
            //This feature was Made by Guilherme 
            //Text Align || left = 0 (default) | center = 1 | right = 2
            if(align == null || align == 0){
                context.fillText( t, x, y + (lineHeight*currentLine) );
            }
            else if(align == 1){
                context.fillText( t, x+((fitWidth/2)-(measure.width/2)), y + (lineHeight*currentLine) );
            }
            else if(align == 2){
                context.fillText( t, x+fitWidth-measure.width, y + (lineHeight*currentLine) );
            }
            currentLine++;
            words = words.splice(idx-1);
            idx = 1;
        }
        else
        {idx++;}
    }
    if  (idx > 0){
        var txt = words.join(' ');
        var meas = context.measureText(txt);
        if(align == null || align == 0){
            context.fillText( txt, x, y + (lineHeight*currentLine) );
        }
        else if(align == 1){
            context.fillText( txt, x+((fitWidth/2)-(meas.width/2)), y + (lineHeight*currentLine) );
        }
        else if(align == 2){
            context.fillText( txt, x+fitWidth-meas.width, y + (lineHeight*currentLine) );
        }
    }
}

// var obj1 = new Object(0,0,document.getElementById("folder"),null,null,true)
//         var [x1,y1] = this.game.grid.autoPlace(obj1,200,300);
//         if(x1 != -1){
//             obj1.x = x1;
//             obj1.y = y1;
//             this.game.objects.push(obj1);
//         }
//         else{
//             alert("Não foi possível posicionar objeto. Campo ocupado.")
//         }

//         var obj2 = new Object(0,0,document.getElementById("folder"),null,null,true)
//         var [x2,y2] = this.game.grid.autoPlace(obj2,100,300);
//         if(x2 != -1){
//             obj2.x = x2;
//             obj2.y = y2;
//             this.game.objects.push(obj2);
//         }

//         var obj3 = new Object(0,0,document.getElementById("folder"),null,null,true)
//         var [x2,y2] = this.game.grid.autoPlace(obj3,320,300);
//         if(x2 != -1){
//             obj3.x = x2;
//             obj3.y = y2;
//             this.game.objects.push(obj3);
//         }