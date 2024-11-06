import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Object } from "./object.js";
import { Pasta } from "./pasta.js";

export class Game{
    constructor(width, height, grid){
        this.width = width;
        this.height = height;
        this.Player = new Player(this);
        this.input = new InputHandler();
        this.objects = [];
        this.holding = null;
        this.actionRange = 120;
        this.grid = grid;
        this.pastaAberta = [];
        
        this.globalIndex = 1;

        window.addEventListener('mousedown', (e) => {if(e.button == 0){this.click()}});
    }
    click(){
        //Tirar evento de click direito
        //Rodar intervalo
        //Mouse soltou antes do intervalo apaga intervalo e continue com click 2
        //Intervalo terminou antes, segura objeto 
        //criar evento de soltar mouse 1 para mesma função de soltar

        // var time = setTimeout(()=>{},1000);
        // window.addEventListener('mouseup', (e)=>{
        //     if(time){
        //         console.log("Tempo já acabou")
        //         clearTimeout(time);
        //     }
        //     else {
        //         console.log("TEMPO CABOU NADA")
        //         clearTimeout(time);
        //     }
        // });
        // return;


        var mouseTimer;
        var holding = false;
        function mouseDown(game) { 
            mouseTimer = window.setTimeout(() => {
                holding = true;
                var obj = game.holding;
                var [x,y] = game.grid.autoPlace(obj,game.Player.centerX(),game.Player.centerY());
                let [c,r] = game.grid.getColumnAndRow(game.Player.centerX(),game.Player.centerY());
                
                if(x != -1 && y != -1){
                    obj.x = x;
                    obj.y = y;
                    // this.game.objects.push(obj);
                    obj.holding = false;
                    game.holding = null;
                }
                else if(game.grid.spaces[c,r] != null){
                    let obj1 = game.grid.spaces[c][r];
                    if(obj1.items != null && obj1.items.includes(obj) == false){
                        if(obj1.isOpen == true){
                            var pasta = game.pastaAberta.filter((pasta) => pasta.obj.index == obj1.index && pasta.obj.isOpen == true);
                            pasta[0].insertItem(obj);
                        }
                        else{
                            obj1.items.push(obj);
                        }
                        game.holding = null;
                        obj.holding = false;
                        game.objects.splice(game.objects.indexOf(obj),1);
                    }
                }

            },600); //set timeout to fire when the user presses mouse button down
        }

        const mouseUp = () =>{
            if (mouseTimer){ 
                if(holding == false){
                    alert("N SEGUROU");
                    window.clearTimeout(mouseTimer);
                }
                else if (holding == true){
                    alert("SEGUROU");
                }
                window.removeEventListener("mouseup", mouseUp);
            };  //cancel timer when mouse button is released
        }

        mouseDown(this);
        window.addEventListener("mouseup", mouseUp() );

        return;


        //FECHAR PASTA OU SEGURAR EM OBJETO
        if(this.holding == null){
            var nearObjects = this.objects.filter(obj => this.checkNearObject(obj) && obj.toGrab);

            if(nearObjects.length > 0 ){
                //funcao pra organizar quem está mais perto 
                var nearest = nearObjects.reduce((minObj,obj) => { 
                    var distance = this.nearXFunc(obj) + this.nearYFunc(obj);
                    return distance < (this.nearXFunc(minObj) + this.nearYFunc(minObj))?obj:minObj;
                },nearObjects.splice(0,1)[0]);

                if(nearest.toGrab == true){
                    this.grid.autoRemove(nearest);
                    nearest.holding = true;
                    this.holding = nearest;
                }
            }
            //this.holding.push(nearest);
        }
        //SOLTAR OBJETO
        else{
            var obj = this.holding;
            var [x,y] = this.grid.autoPlace(obj,this.Player.centerX(),this.Player.centerY());
            let [c,r] = this.grid.getColumnAndRow(this.Player.centerX(),this.Player.centerY());
            
            if(x != -1 && y != -1){
                obj.x = x;
                obj.y = y;
                // this.game.objects.push(obj);
                obj.holding = false;
                this.holding = null;
            }
            else if(this.grid.spaces[c,r] != null){
                let obj1 = this.grid.spaces[c][r];
                if(obj1.items != null && obj1.items.includes(obj) == false){
                    if(obj1.isOpen == true){
                        var pasta = this.pastaAberta.filter((pasta) => pasta.obj.index == obj1.index && pasta.obj.isOpen == true);
                        pasta[0].insertItem(obj);
                    }
                    else{
                        obj1.items.push(obj);
                    }
                    this.holding = null;
                    obj.holding = false;
                    this.objects.splice(this.objects.indexOf(obj),1);
                }
            }
        }
    }
    rightClick(){
        if(this.holding == null){
            var nearObjects = this.objects.filter(obj => this.checkNearObject(obj) && obj.toGrab);
            let pastas  = [...this.pastaAberta]
            let nearFolderClose = 
                this.pastaAberta.length > 0 ? 
                pastas.reduce((min,actual) => {
                    var distance = actual.getDistance(this);
                    return distance < min.getDistance(this) ? actual : min;
                },pastas.splice(0,1)[0]) 
            : null;
            if(nearObjects.length > 0 || nearFolderClose != null){
                //funcao pra organizar quem está mais perto 
                var nearest = nearObjects.reduce((minObj,obj) => { 
                    var distance = this.nearXFunc(obj) + this.nearYFunc(obj);
                    return distance < (this.nearXFunc(minObj) + this.nearYFunc(minObj))?obj:minObj;
                },nearObjects.splice(0,1)[0]);

                if(this.pastaAberta.length > 0){
                    let [folderX,folderY] = nearFolderClose.getDistance(this);
                    if( nearest != null && folderX+folderY > this.nearXFunc(nearest.x)+this.nearYFunc(nearest.y) && nearest.isOpen == false){
                        nearest.isOpen = true;
                        let LastFolder = this.pastaAberta[this.pastaAberta.length-1];
                        let pasta = new Pasta(nearest, LastFolder != null ? LastFolder.x+50 : (this.width/2)-600, (this.height/2)-350,1200,700);
                        this.pastaAberta.push(pasta);
                    }
                    else if( nearFolderClose != null && (nearest == null || folderX+folderY < this.nearXFunc(nearest.x)+this.nearYFunc(nearest.y)) && nearFolderClose.obj.isOpen == true ){
                        nearFolderClose.close(this);
                    } 
                }
                else if(nearest.isOpen == false){
                    nearest.isOpen = true;
                    let LastFolder = this.pastaAberta[this.pastaAberta.length-1];
                    let pasta = new Pasta(nearest, LastFolder != null ? LastFolder.x+50 : (this.width/2)-600, (this.height/2)-350,1200,700);
                    this.pastaAberta.push(pasta);
                }
            }
        }
    }
    update(){
        this.objects.forEach((obj) => obj.showTip = false);
        if(this.holding == null){
            var nearObjects = this.objects.filter(obj => this.checkNearObject(obj) && obj.toGrab);
            if(nearObjects.length > 0){
                var nearest = nearObjects.reduce((minObj,obj) => {
                    var distance = this.nearXFunc(obj) + this.nearYFunc(obj);
                    return distance < (this.nearXFunc(minObj) + this.nearYFunc(minObj))?obj:minObj;
                },nearObjects.splice(0,1)[0]);
                nearest.showTip = true;
            }
        }

        this.objects.forEach((e) => {
            e.update(this);
        })
        if(this.pastaAberta.length > 0){
            this.pastaAberta.forEach((pasta) => {
                pasta.update(this);
            })
        }
        this.Player.update(this.input.keys);
        if(this.holding != null){
            this.holding.update(this);
        }
        // this.holding.forEach((e) => {
        //     e.update(this);
        // })
    }
    draw(context){
        if(this.objects.length > 0){
            this.objects.forEach((e) => {
                if(this.holding!= e){
                    e.draw(context);
                }
            })
        }
        if(this.pastaAberta.length > 0){
            this.pastaAberta.forEach((pasta) => {
                pasta.draw(context);
            })
        }

        if(this.Player != null){
            this.Player.draw(context);
        }
        if(this.holding !=null){
            this.holding.draw(context);
        }
        // this.holding.forEach((e) => {
        //     e.draw(context);
        // })
    }
    checkNearObject(obj, distance){
        if(distance == null){
            return this.nearXFunc(obj.centerX()) <= this.actionRange && this.nearYFunc(obj.centerY()) <= this.actionRange;
        }
        else{
            return this.nearXFunc(obj.centerX()) <= distance && this.nearYFunc(obj.centerY()) <= distance;
        }
    }
    checkDistance(x,y, distance){
        if(distance == null){
            return this.nearXFunc(x) <= this.actionRange && this.nearYFunc(y) <= this.actionRange;
        }
        else{
            return this.nearXFunc(x) <= distance && this.nearYFunc(y) <= distance;
        }
    }
    nearXFunc(x){
        return Math.abs(this.Player.centerX() - x);
    }
    nearYFunc(y){
        return Math.abs(this.Player.centerY() - y);
    }
}