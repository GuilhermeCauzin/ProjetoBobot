export class Effects{
    fadeInImage(context,image,x,y,width,height,duration){
        let alpha = 1;
        const interval = setInterval(() =>{
            context.drawImage(image,x,y,width,height);
            context.globalAlpha = alpha;
            alpha -+ 0.1;
            if(alpha>=0){
                clearInterval(interval);
                return;
            }
        },duration)
    }
    fadeOutImage(context,drawingObj,duration){

    }
}