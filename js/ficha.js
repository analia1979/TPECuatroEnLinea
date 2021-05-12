class Ficha{

constructor(posX,posY,radio,color,contexto){
    this.posX=posX;
    this.posY=posY;
    this.color=color;
    this.radio=radio;
    this.contexto=contexto;
    this.cancelarMovimiento=true;


}

draw(){

 this.contexto.fillStyle=this.color;
 this.contexto.beginPath();
 this.contexto.arc(this.posX,this.posY,this.radio,0,Math.PI*2);
 this.contexto.fill(); 
this.contexto.lineWidth = 5;
this.contexto.strokeStyle = 'black';
this.contexto.stroke();
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