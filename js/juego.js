class Juego {


    constructor(contexto, width,height){

        this.contexto=contexto;
        this.height=height;
        this.width=width;
        this.tablero=new Tablero(this.contexto);
        this.fichaSeleccionada=null;
       //this.cantidad=0;
        this.modoMoviendo=false;
        this.jugadores=[];
        this.jugando=true;
       
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
       // console.log(nroColumna);
        if(nroColumna!=-1){
            let espacio=this.tablero.obtenerUltimoLugarSinFicha(nroColumna);
            this.moverFicha(espacio[0].posX,espacio[0].posY);
          //  console.log(espacio);
            espacio[0].ficha=this.fichaSeleccionada;
          //  console.log(espacio);
            this.buscarCuatroEnLinea(espacio);
            this.modoMoviendo=false; 
            return true; 
        }
        else{
           
           
            this.modoMoviendo=false;
           return false;
        }


    }
    cambiarTurno(){
        this.tablero.cambiarTurno();
    }

    buscarCuatroEnLinea(espacio){
       let x=espacio[1];
       let y=espacio[2];
        let casillero=espacio[0];
        let cantidad=0;
        cantidad=this.tablero.buscarHorizontalDerecha(x,y,casillero,cantidad);
        console.log('cantidad por derecha'+cantidad);
        if (cantidad<4){
            
            cantidad=this.tablero.buscarHorizontalIzquierda(x,y,casillero,cantidad);
            cantidad--; // le resto uno porque sino me sumo yo dos veces
            console.log('cantidad por izquierda'+ cantidad);
            if(cantidad==4){
                console.log('gano');
               this.terminarJuego();
            }

        }
        else
            this.terminarJuego();

    }

    terminarJuego(){

       this.jugando=false;

    }


}