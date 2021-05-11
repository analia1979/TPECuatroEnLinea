document.addEventListener('DOMContentLoaded', () => {


canvas=document.getElementById('tableroJuego');
canvas.width = 1200;
canvas.height = 800;
ctx=canvas.getContext('2d');


let cuatroEnLinea= new Juego(ctx,canvas.width,canvas.height);
cuatroEnLinea.draw();
let turno=true; // turno true juega jugador1 sino jugador2

canvas.addEventListener('mousedown',(e)=>{

   
        
        if(cuatroEnLinea.isClickedFicha(e.offsetX,e.offsetY)){
           
            canvas.addEventListener('mousemove',(eMouseMove)=>{
                cuatroEnLinea.moverFicha(eMouseMove.offsetX,eMouseMove.offsetY);
            })

        }  
     
});


canvas.addEventListener('mouseup',(e)=>{
   canvas.removeEventListener('mousemove',cuatroEnLinea.moverFicha);
   cuatroEnLinea.soltarFichaEnColumna(e.offsetX,e.offsetY);
  // cuatroEnLinea.soltarFicha();

});

let btnDibujarMatriz=document.getElementById('btnMatriz');
btnDibujarMatriz.addEventListener('click',()=>{

   
    cuatroEnLinea.comenzarJuego();

})






























});
