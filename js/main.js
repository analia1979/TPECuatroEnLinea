document.addEventListener('DOMContentLoaded', () => {


canvas=document.getElementById('tableroJuego');
canvas.width = 1200;
canvas.height = 800;
ctx=canvas.getContext('2d');
let ficha=null;
let movimientoValido=true;
let cuatroEnLinea= new Juego(ctx,canvas.width,canvas.height);
cuatroEnLinea.draw();


canvas.addEventListener('mousedown',(e)=>{

   
        
        if(cuatroEnLinea.isClickedFicha(e.offsetX,e.offsetY)){
           movimientoValido=true;
            canvas.addEventListener('mousemove',(eMouseMove)=>{
                cuatroEnLinea.moverFicha(eMouseMove.offsetX,eMouseMove.offsetY);
            })

        } else{
            movimientoValido=false;

        }

     
});


canvas.addEventListener('mouseup',(e)=>{
   
    if(movimientoValido){
        canvas.removeEventListener('mousemove',cuatroEnLinea.moverFicha);
    
        if(cuatroEnLinea.soltarFichaEnColumna(e.offsetX,e.offsetY))
        
                    cuatroEnLinea.cambiarTurno();
   
}

});

let btnDibujarMatriz=document.getElementById('btnMatriz');
btnDibujarMatriz.addEventListener('click',()=>{

   
    cuatroEnLinea.comenzarJuego();

})






























});
