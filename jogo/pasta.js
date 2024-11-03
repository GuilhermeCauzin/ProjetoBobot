import { Grid } from "./grid.js";
export class Pasta{
    constructor(objeto, x, y, width, height){
        this.obj = objeto;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.grid = new Grid(this.width-60, this.height-90, 6,6);  
        this.isNear = false;
        this.closeIcon = document.getElementById("closeIcon");
        this.start();
    }
    start(){
        this.obj.items.forEach((e) => {
            let colocado = false;
            for(let i = 0; i<this.grid.columnNumbers; i++){
                if(colocado == true) break;
                for(let j = 0; j<this.grid.rowNumbers; j++){
                    if(this.grid.spaces[i][j] == null){
                        this.grid.placeObject(e, i, j);
                        let [x,y] = this.grid.getCordinates(i,j);
                        e.x = x+this.x+30;
                        e.y = y+this.y+60;
                        colocado = true;
                        break;
                    }
                }
            }
        });
    }
    insertItem(obj){
        let colocado = false;
        if(this.obj.isOpen == true){
            for(let i = 0; i<this.grid.columnNumbers; i++){
                if(colocado == true) {break};
                for(let j = 0; j<this.grid.rowNumbers; j++){
                    if(this.grid.spaces[i][j] == null){
                        this.grid.placeObject(obj, i, j);
                        let [x,y] = this.grid.getCordinates(i,j);
                        obj.x = x+this.x+30;
                        obj.y = y+this.y+60;
                        colocado = true;
                        this.obj.items.push(obj);
                        break;
                    }
                }
            }
        }
        else{
            this.obj.items.push(obj);
        }
    }
    close(game){
        if(this.isNear == true){
            this.obj.isOpen = false;
            game.pastaAberta.splice(game.pastaAberta.indexOf(this),1)
        }
    }
    getDistance(game){
        return [game.nearXFunc(this.x+this.width-20),game.nearYFunc(this.y+20)]
    }
    update(game){
        this.obj.items.forEach((e) => {
            e.update(game);
        });
        let [disX,disY] = this.getDistance(game);
        if(game.checkDistance(this.x+this.width-20,this.y+20,100)){
            this.isNear = true;
        }
        else{
            this.isNear = false;
        }
    }
    draw(context){
        context.beginPath();
        context.fillStyle = "White";
        context.roundRect(this.x,this.y,this.width,this.height,10);
        context.stroke();
        context.fill();

        context.beginPath();
        context.fillStyle = "Black";
        context.font = "700 26px Roboto";
        context.fillText(this.obj.nome, this.x+10,this.y+30)

        if(this.isNear == true){
            context.beginPath();
            context.fillStyle = "rgb(255,0,0)";
            context.roundRect(this.x+this.width-45,this.y,45,40,[0,10,0,1]);
            context.fill();
        }
        context.drawImage(this.closeIcon,this.x+this.width-40,this.y,40,40)

        this.obj.items.forEach((e) => {
            e.draw(context);
        });
    }
}