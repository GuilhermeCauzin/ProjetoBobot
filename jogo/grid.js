export class Grid{
    constructor(width, height, columnNumbers, rowNumbers){
        this.width = width;
        this.height = height;
        this.columnNumbers = columnNumbers;
        this.rowNumbers = rowNumbers;
        this.spaces = [];
        for(let i = 0; i < columnNumbers; i++){
            this.spaces[i] = [];
            for(let j = 0; j < rowNumbers; j++){
                this.spaces[i][j] = null;
            }
        }
    }
    getSpaceWidth(){
        return this.width / this.columnNumbers;
    }
    getSpaceHeight(){
        return this.height / this.rowNumbers;
    }
    limparTudo(){
        for(let i = 0; i < columnNumbers; i++){
            this.spaces[i] = [];
            for(let j = 0; j < rowNumbers; j++){
                this.spaces[i][j] = null;
            }
        }
    }
    checkSpace(x, y){
        var [posX,posY] = this.getColumnAndRow(x,y);
        if(this.spaces[posX][posY] != null ){
            return [-1,-1];
        }
        else{
            return [posX, posY];
        }
    }
    getColumnAndRow(x, y){
        let wPc = this.width / this.columnNumbers;
        let posX = Math.floor(x/wPc);

        let hPr = this.height / this.rowNumbers;
        let posY = Math.floor(y/hPr);

        return [posX,posY];
    }
    getCordinates(column, row){
        let wPc = this.width / this.columnNumbers;
        var centerX = (wPc * (column+1))-wPc;
        let hPr = this.height / this.rowNumbers;
        var centerY = (hPr * (row+1))-hPr;
        return [centerX, centerY];
    }
    placeObject(obj,column, row){
        this.spaces[column][row] = obj;
        obj.gridX = column;
        obj.gridY = row;
    }
    removeObject(obj, column, row){
        this.spaces[column][row] = null;
        obj.gridX = null;
        obj.gridY = null;
    }
    autoPlace(obj,x,y){
        let check = this.checkSpace(x, y); 
        if(check[0] == -1 || check[1] == -1){
            return [-1,-1];
        }
        else{
            let cords = this.getCordinates(check[0], check[1]);
            let gridPos = this.getColumnAndRow(x,y)
            this.placeObject(obj, gridPos[0], gridPos[1]);
            return cords;
        }
    }
    autoRemove(obj){;
        this.removeObject(obj,obj.gridX,obj.gridY);
    }
    
}