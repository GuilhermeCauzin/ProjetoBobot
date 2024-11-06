export class Object{
    constructor(game, x, y, width , height, image, circulo, texto, grabbeble, pasta){
        //Posicao e tamanho
        this.index = game.globalIndex++;
        this.x = x;
        this.y = y;
        this.originalX = this.x
        this.originalY = this.y;
        this.centerX = () => {return this.x + (this.circulo!= null ? (this.circulo.radius /2)  : (this.width / 2))};
        this.centerY = () => {return this.y + (this.circulo!= null ? (this.circulo.radius/2) : (this.height / 2))};
        this.width = width;
        this.height = height;

        //Formato (imagem, circulo, tem texto, etc.)
        this.image = image;
        this.circulo = circulo;
        this.texto = texto;

        //atributos
        this.toGrab = grabbeble;
        this.isOpen = false;
        this.visible = true;
        this.holding = false;
        this.showTip = false;

        this.nome = "";
        this.items = pasta;

        //icones
        this.clickIcon = document.getElementById("clickIcon");
    }
    update(game){
        if(this.toGrab){
            if(this.holding == true){
                this.x = game.Player.centerX()-(this.width/2);
                this.y = game.Player.centerY()-(this.height/2);
            }
        }
    }
    placeAtGrid(game){
        var [x1,y1] = game.grid.autoPlace(this,this.x,this.y);
        if(x1 != -1){
            this.x = x1;
            this.y = y1;
            game.objects.push(this);
        }
    }
    draw(context){
        if(this.visible){
            //Desenho principal
            if(this.circulo != null){
                // context.fillEllipse(this.x,this.y,this.circulo.width, this.circulo.height,this.circulo.grau,this.circulo.cor);
                context.beginPath();
                //circulo
                context.fillStyle = 'White';
                context.arc(this.centerX(),this.centerY(),this.circulo.radius,0,Math.PI*2);
                context.fill();
                //texto
                if(this.texto != null && this.texto != ""){
                    context.font = "600 30px Roboto";
                    context.fillStyle = '#22078B';
                    var measure = context.measureText(this.texto);  
                    var local = (((this.circulo.radius)-measure.width)/2)+this.x;
                    context.fillText(this.texto,(measure.width > this.circulo.radius ? this.x : local), this.centerY()+10, this.circulo.radius*2);
                }
            }
            else{
                context.drawImage(this.image, this.x, this.y, this.width, this.height);
            }

            //Secundarios
            if(this.toGrab){
                if(this.holding == false && this.showTip == true && this.isOpen == false){
                    context.drawImage(this.clickIcon, this.centerX()-40,this.centerY()-40, 80,80);
                }
            }
        }
    }
}