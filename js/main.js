document.addEventListener('DOMContentLoaded', () => {


canvas=document.getElementById('tableroJuego');
canvas.width = 1600;
canvas.height = 800;
ctx=canvas.getContext('2d');
let ficha=null;
let movimientoValido=true;
let cuatroEnLinea= new Juego(ctx,canvas.width,canvas.height);
cuatroEnLinea.draw(); 
//let jugando=true;

canvas.addEventListener('mousedown',(e)=>{   
        
    if(cuatroEnLinea.jugando){    
    if(cuatroEnLinea.isClickedFicha(e.offsetX,e.offsetY)){
           movimientoValido=true;
            canvas.addEventListener('mousemove',(eMouseMove)=>{
                cuatroEnLinea.moverFicha(eMouseMove.offsetX,eMouseMove.offsetY);
            })

        } else{
            movimientoValido=false;

        }     
    }
});


canvas.addEventListener('mouseup',(e)=>{
   
   if(cuatroEnLinea.jugando){
    if(movimientoValido){
        canvas.removeEventListener('mousemove',cuatroEnLinea.moverFicha);
    
        if(cuatroEnLinea.soltarFichaEnColumna(e.offsetX,e.offsetY))
        
                    cuatroEnLinea.cambiarTurno();
                }
}

});



let btnReiniciarPartida=document.getElementById('btnReiniciarPartida');
let btnComenzarJuego=document.getElementById('btnComenzarJuego');
btnComenzarJuego.addEventListener('click',()=>{

   
     cuatroEnLinea= new Juego(ctx,canvas.width,canvas.height);
    cuatroEnLinea.draw();
    cuatroEnLinea.tablero.dibujarJugador();
    btnReiniciarPartida.disabled=false;

})



btnReiniciarPartida.addEventListener('click',()=>{

   
    cuatroEnLinea= new Juego(ctx,canvas.width,canvas.height);
    cuatroEnLinea.draw();
    cuatroEnLinea.tablero.dibujarJugador();

})






























});
