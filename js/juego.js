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
        let cantidadPorDer=0;
        let cantidadPorIzq=0;
        cantidadPorDer=this.tablero.buscarHorizontalDerecha(x,y,casillero,cantidadPorDer);
        console.log('cantidad por derecha'+cantidadPorDer);
        if (cantidadPorDer<4){
            
            cantidadPorIzq=this.tablero.buscarHorizontalIzquierda(x,y,casillero,cantidadPorIzq);
           
            console.log('cantidad por izquierda'+ cantidadPorIzq);
            if((cantidadPorIzq+cantidadPorDer+1)==4){
                console.log('gano');
               this.terminarJuego();
            }
            else{
                //buscar por arriba o abajo
            }

        }
        else
            this.terminarJuego();

    }

    terminarJuego(){

       this.jugando=false;

    }


}