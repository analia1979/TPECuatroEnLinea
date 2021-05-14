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


    soltarFichaEnColumna(posX,posY){

     
        let nroColumna=this.tablero.obtenerColumna(posX,posY);
       // console.log(nroColumna);
        if(nroColumna!=-1){
            let espacio=this.tablero.obtenerUltimoLugarSinFicha(nroColumna);
            this.moverFicha(espacio[0].posX,espacio[0].posY);
            this.fichaSeleccionada.pararMovimiento();
            espacio[0].ficha=this.fichaSeleccionada;
            
            //console.log(espacio);
           if( this.buscarCuatroEnLinea(espacio)){
               if(this.tablero.obtenerTurno()){ //
                   //gano jugador1
                    this.tablero.drawTitulo('Gano Jugador1',366,94);
                  
               }
               else{
                 this.tablero.drawTitulo('Gano Jugador2',366,94);}
            //return false; // para impedir que cambie el turno
            }                 
               
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
        this.tablero.dibujarJugador();
    }

    buscarCuatroEnLinea(espacio){
       let x=espacio[1];
       let y=espacio[2];
        let casillero=espacio[0];
        let cantidadPorDer=0;
        let cantidadPorIzq=0;
        let colorFicha=casillero.obtenerColor();
        cantidadPorDer=this.tablero.buscarHorizontalDerecha(x,y,casillero,cantidadPorDer);
       // console.log('cantidad por derecha'+cantidadPorDer);
        if (cantidadPorDer<4){
            
            cantidadPorIzq=this.tablero.buscarHorizontalIzquierda(x,y,casillero,cantidadPorIzq);
           
           // console.log('cantidad por izquierda'+ cantidadPorIzq);
            if((cantidadPorIzq+cantidadPorDer+1)==4){ // debo sumar la ficha por la cual es la que estoy buscando cuatro en linea
                
                 this.terminarJuego();
                 return true;
            }
            else{
                //buscar por arriba y abajo
                let cantidad=this.buscarVertical(x,y,casillero);

                console.log(cantidad);
                if(cantidad==4){
                   // console.log('gano');
                    this.terminarJuego();
                    return true;
                }
                else{
                        //buscar 1raDiagonalIzqArriba-DerechaAbajo
                    let cantidad=this.buscarDiagonal(x,y,casillero);
                    console.log(cantidad);
                    if (cantidad==4){

                        //console.log('ganoPorDiagonal');
                        this.terminarJuego();
                        return true;
                    }
                    else{

                        //buscar 2daDiagonalDerArriba-IzqAbajo
                        let cantidad=this.buscar2daDiagonal(x,y,casillero);
                        console.log('cantidad');
                        if(cantidad==4){
                           // console.log('ganoPorsegundaDiagonal');
                            this.terminarJuego();
                            return true;
                        }
                        else
                        console.log('seguirJugando si hay mas fichas seria');

                    }
                }
        
            }

        }
        else{
            this.terminarJuego();
            return true;
        }

    }

    terminarJuego(){

       this.jugando=false;

    }

    buscarVertical(x,y, casillero){
        let cantidadPorArriba=0;
        let cantidadPorAbajo=0;
        cantidadPorArriba=this.tablero.cantidadPorArriba(x,y,casillero,cantidadPorArriba);
        console.log('cantidad por arriba'+ cantidadPorArriba);
        if(cantidadPorArriba<4){
            //buscar hacia abajo
            cantidadPorAbajo=this.tablero.cantidadPorAbajo(x,y,casillero,cantidadPorAbajo);
            console.log('cantidad por abajo'+cantidadPorAbajo);
            if((cantidadPorArriba+cantidadPorAbajo+1)==4){

                  return (cantidadPorArriba+cantidadPorAbajo+1)
                  //  this.terminarJuego();

            }


        }
        else{

            console.log('gano');
            return(cantidadPorArriba);
           // this.terminarJuego();
        }

        return(cantidadPorArriba+cantidadPorAbajo+1);

    }

    buscarDiagonal(x,y,casillero){

        let cantidadDiagDerecha=0;
        let cantidadDiagIzquierda=0;
        cantidadDiagDerecha=this.tablero.cantidadDiagDerechaAbajo(x,y,casillero,cantidadDiagDerecha);
        console.log('cantidad Diag DerAbajo'+ cantidadDiagDerecha);
        if(cantidadDiagDerecha<4){
            //buscar hacia abajo
            cantidadDiagIzquierda=this.tablero.cantidadDiagIzqArriba(x,y,casillero,cantidadDiagIzquierda);
            console.log('cantidad DiagIzqArriba'+cantidadDiagIzquierda);
            if((cantidadDiagDerecha+cantidadDiagIzquierda+1)==4){

                  return (cantidadDiagDerecha+cantidadDiagIzquierda+1)
                  //  this.terminarJuego();

            }


        }
        else{

            console.log('gano');
            return(cantidadDiagDerecha);
           // this.terminarJuego();
        }

        return(cantidadDiagDerecha+cantidadDiagIzquierda+1);


    }

    buscar2daDiagonal(x,y,casillero){
        let cantidadDiagDerecha=0;
        let cantidadDiagIzquierda=0;
        cantidadDiagDerecha=this.tablero.cantidadDiagDerechaArriba(x,y,casillero,cantidadDiagDerecha);
        console.log('cantidad Diag DerAbajo'+ cantidadDiagDerecha);
        if(cantidadDiagDerecha<4){
            //buscar hacia abajo
            cantidadDiagIzquierda=this.tablero.cantidadDiagIzqAbajo(x,y,casillero,cantidadDiagIzquierda);
            console.log('cantidad DiagIzqAbajo'+cantidadDiagIzquierda);
            if((cantidadDiagDerecha+cantidadDiagIzquierda+1)==4){

                  return (cantidadDiagDerecha+cantidadDiagIzquierda+1)
                  //  this.terminarJuego();

            }


        }
        else{

            console.log('gano');
            return(cantidadDiagDerecha);
           // this.terminarJuego();
        }

        return(cantidadDiagDerecha+cantidadDiagIzquierda+1);

    }


}