class Tablero {


    constructor(contexto){

        this.contexto=contexto;         
       
        this.fichasJugador1=[];
        this.fichasJugador2=[];
        this.matrizEspacios=[[]];
        this.columnasEspacios=[];        
        this.fila=8;
        this.col=6;
        this.inicializarFichasJugadores();
        this.inicializarTablero();
        this.turno=true; // asigno directamente turno al jugador1
    
    }

    draw(){

        // a cada ficha le digo que se dibuje
      
      for (let fila = 0; fila < this.fila; fila++) {
         for (let columna = 0; columna < this.col; columna++) {
            
                this.matrizEspacios[fila][columna].draw();
             
         }
          
      }

      for (let index = 0; index < this.columnasEspacios.length; index++) {
           this.columnasEspacios[index].draw();
          
      }
      
       this.fichasJugador1.forEach(ficha => {
            ficha.draw();
        });
       this.fichasJugador2.forEach(ficha => {
           ficha.draw();           
       });

    }

    inicializarTablero(){  // asigna espacios al tablero
        let x=0; let y=0; let posX=0;let posY=0;let y1=0; let x1=0;
        for (let fila = 0; fila <800; fila+=100) {
            x1=x1+100;
            y1=100; 
            //creo un arreglo de espacios que van a indicar la columna
            let nuevoEspacio1=new EspacioTablero(x1,y1,40,'red',this.contexto); 
            this.columnasEspacios.push(nuevoEspacio1);
           // nuevoEspacio1.draw();
            this.matrizEspacios[x]=[]; y=0;
            for (let columna = 0; columna < 600; columna+=100) {
                posX=fila+100;             
                posY=columna+200;                  
                
                let nuevoEspacio=new EspacioTablero(posX,posY,40,'black',this.contexto);
                this.matrizEspacios[x][y]=nuevoEspacio;
             //   nuevoEspacio.draw();
                y++;
           }

           x++; 
        }
       console.log(this.matrizEspacios); 
    }

    inicializarFichasJugadores(){

      
        let x=890,y=500; let y1=300;

        for (let index = 0; index < 10; index++) {
    
            x=x+20;
            this.fichasJugador1.push(new Ficha(x,y,40,'red',this.contexto));
            this.fichasJugador2.push(new Ficha(x,y1,40,'green',this.contexto));
          
        }      
        
      
    }


    isClickedFicha(clickedX,clickedY){

       if(this.turno){
       
        for (let i = 0; i < this.fichasJugador1.length; i++) {

                if (this.fichasJugador1[i].isClicked(clickedX,clickedY))
                        return this.fichasJugador1[i];
           
            
        }
    }
        else{
            for (let i = 0; i < this.fichasJugador2.length; i++) {

                if (this.fichasJugador2[i].isClicked(clickedX,clickedY))
                        return this.fichasJugador2[i];
           
            
        }



        }
   
        return null;

    }

obtenerColumna(clickedX,clickedY){
   
   
    for (let index = 0; index < this.columnasEspacios.length; index++) {
        
          let posX=this.columnasEspacios[index].posX;
          let posY=this.columnasEspacios[index].posY;
          let radio=this.columnasEspacios[index].radio;
         if((Math.sqrt((clickedX-posX) ** 2 + (clickedY - posY) ** 2)) < radio){

                return index;

         }
         
         

    }
    return -1;

}

obtenerUltimoLugarSinFicha(col){

    //si encuentra un lugar libre en esa columna ,retorna el espacio para luego asignar la ficha
   let columnas=this.matrizEspacios[col];
   console.log(columnas);
   for (let index = columnas.length-1; index >= 0; index--) {
       
            if(columnas[index].ficha==null)
                    return [columnas[index],col,index];
       
   }

   return null;
 
}

cambiarTurno(){

  
    this.turno=!this.turno;
   
    
}

buscarHorizontalDerecha(x,y,casillero,cant){

    let color=casillero.ficha.obtenerColor();
    console.log(color);
    if(x==this.col-1){ // no tiene derecha solo debe sumarse a si mismo;
            return cant;
    }else{
    
    for (let index = x; index <this.fila-1; index++) {
            if(this.matrizEspacios[index+1][y].ficha!=null)
                if(this.matrizEspacios[index+1][y].ficha.color==color){
                            cant++
            }
      
        if(cant==4 || this.matrizEspacios[index+1][y].ficha==null||this.matrizEspacios[index+1][y].ficha.color!=color){
            return cant;
        } 
    }}
    return cant;
}
buscarHorizontalIzquierda(x,y,casillero,cant){
   
    let color=casillero.ficha.obtenerColor();
    console.log(color);
  if(x==0){
        
        return cant;
  }
  else{
  
        for (let index = x; index >0; index--) {
        
            if(this.matrizEspacios[index-1][y].ficha!=null && this.matrizEspacios[index-1][y].ficha.obtenerColor()==color){
                cant++;
            }
            if(cant==4||this.matrizEspacios[index-1][y].ficha==null || this.matrizEspacios[index-1][y].ficha.obtenerColor()!=color){
                return cant;
            }
            
            
        }
    }
    return cant;
   
}

cantidadPorArriba(x,y,casillero,cantidad){

    //si esta en la primera ultima fila no tiene arriba
    let color=casillero.ficha.obtenerColor();
    if(y==0){

        return cantidad;
    }
    else{

        for (let index = y; index >0 ; index--) {
            if(this.matrizEspacios[x][index-1].ficha!=null && this.matrizEspacios[x][index-1].ficha.obtenerColor()==color){
                cantidad++;
            }
            if(cantidad==4||this.matrizEspacios[x][index-1].ficha==null || this.matrizEspacios[x][index-1].ficha.obtenerColor()!=color){
                return cantidad;
            }
            
        }

    }
    return cantidad


}

cantidadPorAbajo(x,y,casillero,cantidad){

    //si esta en la primera ultima fila no tiene arriba
    let color=casillero.ficha.obtenerColor();
    if(y==this.col-1){

        return cantidad;
    }
    else{

        for (let index = y; index <this.col-1 ; index++) {
            if(this.matrizEspacios[x][index+1].ficha!=null && this.matrizEspacios[x][index+1].ficha.obtenerColor()==color){
                cantidad++;
            }
            if(cantidad==4||this.matrizEspacios[x][index+1].ficha==null || this.matrizEspacios[x][index+1].ficha.obtenerColor()!=color){
                return cantidad;
            }
            
        }

    }
    return cantidad


}

cantidadDiagDerechaAbajo(x,y,casillero,cantidad){
    let color=casillero.ficha.obtenerColor();
    if(y==this.col-1 || x==this.fila-1){ // no tengo diagonal derechaAbajo

        return cantidad;
    }
    else{
        let fila=x;
        for (let index = y; index <this.col-1 ; index++) {
            if(this.matrizEspacios[fila+1][index+1].ficha!=null && this.matrizEspacios[fila+1][index+1].ficha.obtenerColor()==color){
                fila++;
                cantidad++;
            }
            if(cantidad==4||this.matrizEspacios[fila][index+1].ficha==null || this.matrizEspacios[fila][index+1].ficha.obtenerColor()!=color){
               console.log(this.matrizEspacios[fila][index+1].ficha);
                return cantidad;
            }
            
        }

    }
    return cantidad


}

cantidadDiagIzqArriba(x,y,casillero,cantidad){

    let color=casillero.ficha.obtenerColor();
    if(x==0 || y==0){ // no tengo diagonal izquierdaArriba

        return cantidad;
    }
    else{
        let col=y;
        for (let index = x; index >0 ; index--) {
            if(this.matrizEspacios[index-1][col-1].ficha!=null && this.matrizEspacios[index-1][col-1].ficha.obtenerColor()==color){
                col--;
                cantidad++;
            }
            if(cantidad==4||this.matrizEspacios[index-1][col].ficha==null || this.matrizEspacios[index-1][col].ficha.obtenerColor()!=color){
                return cantidad;
            }
            
        }

    }
    return cantidad


}

cantidadDiagDerechaArriba(x,y,casillero,cantidad){
    let color=casillero.ficha.obtenerColor();
    if(x==this.fila-1 || y==0){ // no tengo diagonal DerechaArriba

        return cantidad;
    }
    else{
        let col=y;
        for (let index = x; index <this.col-1 ; index++) {
            if(this.matrizEspacios[index+1][col-1].ficha!=null && this.matrizEspacios[index+1][col-1].ficha.obtenerColor()==color){
                col--;
                cantidad++;
            }
            if(cantidad==4||this.matrizEspacios[index+1][col].ficha==null || this.matrizEspacios[index+1][col].ficha.obtenerColor()!=color){
                return cantidad;
            }
            
        }

    }
    return cantidad

}

cantidadDiagIzqAbajo(x,y,casillero,cantidad){
    //x debe disminuir e y debe aumentar
    let color=casillero.ficha.obtenerColor();
    if(x==0 || y==this.col-1){ // no tengo diagonal izquierdaArriba

        return cantidad;
    }
    else{
        let fila=x;
        for (let index = y; index <this.col-1 ; index++) {
            if(this.matrizEspacios[fila-1][index+1].ficha!=null && this.matrizEspacios[fila-1][index+1].ficha.obtenerColor()==color){
                fila--;
                cantidad++;
            }
            if(cantidad==4||this.matrizEspacios[fila][index+1].ficha==null || this.matrizEspacios[fila][index+1].ficha.obtenerColor()!=color){
                return cantidad;
            }
            
        }

    }
    return cantidad

}

}