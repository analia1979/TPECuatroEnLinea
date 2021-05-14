class EspacioTablero{

    constructor(posX,posY, radio,color,contexto){
    
    this.posX=posX;
    this.posY=posY;
    this.radio=radio;
    this.color=color;
    this.ficha=null;
    this.contexto=contexto;
    
    
    }
    
    
    draw(){
        this.contexto.beginPath();
        this.contexto.arc(this.posX,this.posY,this.radio,0,Math.PI*2);   
        this.contexto.lineWidth = 5;
        this.contexto.strokeStyle = this.color;    
        this.contexto.stroke();
        this.contexto.closePath();  
       
       
    
    }

    obtenerColor(){

        if(this.ficha!=null){
            return this.ficha.obtenerColor();
        }
    }

  
    
    
    

    
    
    
    }