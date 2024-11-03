export class Player{
    constructor(game,x,y,sizeMultiplier){
        this.game = game;
        this.sizeMultiplier = sizeMultiplier;   
        this.width = sizeMultiplier == null ? 82 : 82*sizeMultiplier;
        this.height =sizeMultiplier == null ? 108 : 108*sizeMultiplier;;
        this.x = x;
        this.y = y;
        this.centerX = () => {return this.x + (this.width /2)};
        this.centerY = () => {return this.y + (this.height /2)};
        this.image = document.getElementById("player");
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.speed = 10;
        this.canMove = false;
    }
    update(input){
        if(this.canMove == true){
            this.xSpeed = 0;
            this.ySpeed = 0;
            if(input.includes("d") || input.includes("arrowright")){
                this.xSpeed += this.speed;
            }
            if(input.includes("a") || input.includes("arrowleft")){
                this.xSpeed += -this.speed;
            }

            this.ySpeed = 0;
            if(input.includes("s") || input.includes("arrowdown")){
                this.ySpeed += this.speed;
            }
            if(input.includes("w") || input.includes("arrowup")){
                this.ySpeed += -this.speed;
            }

            if(this.x <= 0 && this.xSpeed < 0){
                this.x = 0;
            }
            else if (this.x >= this.game.width-this.width && this.xSpeed > 0){
                this.x = this.game.width-this.width; 
            }
            else{
                this.x += this.xSpeed;
            }

            if(this.y <= 0 && this.ySpeed < 0){
                this.y = 0;
            }
            else if (this.y >= this.game.height-this.height && this.ySpeed > 0){
                this.y = this.game.height-this.height; 
            }
            else{
                this.y += this.ySpeed;
            }
        }
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}