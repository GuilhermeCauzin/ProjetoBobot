export class InputHandler{
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', (e) => { 
            if(this.keys.indexOf(e.key.toLowerCase()) == -1){
                this.keys.push(e.key.toLowerCase());
            }
        })
        window.addEventListener('keyup', (e) => {
            this.keys.splice(this.keys.indexOf(e.key.toLowerCase()),1);
        })
    }
}