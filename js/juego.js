class Juego {


    constructor(contexto, width,height){

        this.contexto=contexto;
        this.height=height;
        this.width=width;
        this.tablero=new Tablero(this.contexto);
        this.fichaSeleccionada=null;
        this.modoMoviendo=false;
        this.jugadores=[];
       
    }

    draw(){

          this.contexto.clearRect(0,0,this.width,this.height);
          this.tablero.draw();

    }

    isClickedFicha(clickedX,clickedY){

       let fichaSeleccionada=this.tablero.isClickedFicha(clickedX,clickedY);
       if(fichaSeleccionada!=null){
            this.fichaSeleccionada=fichaSeleccionada;
            this.modoMoviendo=true;
            return true;

       }
       return false;
    }

    moverFicha(clickedX,clickedY){

        if(this.modoMoviendo && this.fichaSeleccionada){

            this.fichaSeleccionada.moverFicha(clickedX,clickedY);
            this.draw();


        }
    }

    soltarFicha() {
         this.modoMoviendo=false;
        
    }

    comenzarJuego(){

       
       // this.tablero.drawMatrizEspacios();
    }

    soltarFichaEnColumna(posX,posY){

     
        let nroColumna=this.tablero.obtenerColumna(posX,posY);
        console.log(nroColumna);
        if(nroColumna!=-1){
            let espacio=this.tablero.obtenerUltimoLugarSinFicha(nroColumna);
            this.moverFicha(espacio.posX,espacio.posY);
            espacio.ficha=this.fichaSeleccionada;
            this.modoMoviendo=false;   
        }
        else
        console.log('error de colmna')



    }

}