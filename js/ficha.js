class Ficha{

constructor(posX,posY,radio,color,contexto,imagen){
    this.posX=posX;
    this.posY=posY;
    this.color=color;
    this.radio=radio;
    this.contexto=contexto;
    this.cancelarMovimiento=true;
    this.imagen=imagen;


}

draw(){

       // this.contexto.fillStyle=this.color;
        this.contexto.beginPath();
        this.contexto.arc(this.posX,this.posY,this.radio,0,Math.PI*2);
        this.contexto.fillStyle=this.color;
        this.contexto.fill(); 
        this.contexto.lineWidth =1;
        this.contexto.strokeStyle = 'black';
        this.contexto.stroke();    
              
        this.contexto.drawImage(this.imagen,this.posX-this.radio,this.posY-this.radio,this.radio * 2, this.radio * 2);
           
       
        this.contexto.closePath();
    }


isClicked(clickedX,clickedY){

    return (Math.sqrt((clickedX-this.posX) ** 2 + (clickedY - this.posY) ** 2)) < this.radio;
   
}



moverFicha(clickedX,clickedY){

   if(this.cancelarMovimiento){
    this.posX=clickedX;
    this.posY=clickedY;
}
  
}

puedeMoverse(){

    return this.cancelarMovimiento;
}

pararMovimiento(){

    this.cancelarMovimiento=false;
}

obtenerColor(){

    return this.color;
}


}