//init

var canvas= document.getElementById("canvas")
var ctx= canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight/2;
ctx.font="24px serif"; //TODO: usar uma fonte embasada

document.onmousemove= updateMousePos;
document.onclick= mouseSelect;

var buttons= ["Projetos Teóricos", "Projetos Práticos", "Anáise Matemática", "Direcionamento e Execução de Projetos",  "Creative Thinking", "Desenvolvimento e Aplicação de Software", "Circuitos Elétricos"];
var column_0= ["Projetos Práticos", "Direcionamento e Execução de Projetos", "Desenvolvimento e Aplicação de Software"];
var column_1= ["Projetos Teóricos", "Análise Matemática", "Creative Thinking", "Circuitos Elétricos"];
var center_0= [];
var center_1= [];
var miscCounter_0= [0, 0, 0];
var miscCounter_1= [0, 0, 0, 0];
var rad= ctx.canvas.height/6;
var spc_0= (ctx.canvas.width- 6*rad)/8
var spc_1= (ctx.canvas.width- 8*rad)/8


var mouse_x= 0;
var mouse_y= 0;

for (var i = 0; i < column_0.length; ++i) {
    
    center_0.push( [(2*spc_0+rad)+(i*(2*rad)+i*(2*spc_0)), 1.5*rad] )
    
    //contorno
    ctx.fillStyle = "#9c1f18";
    ctx.beginPath()
    ctx.arc(center_0[i][0], center_0[i][1], rad, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    
    //texto
    ctx.fillStyle = "white";
    var width= ctx.measureText(column_0[i]).width;
    ctx.fillText(column_0[i], center_0[i][0]-(width/2), center_0[i][1]);
}

for (var i = 0; i < column_1.length; ++i) {
    
    center_1.push( [(1*spc_1+rad)+(i*(2*rad)+i*(2*spc_1)), 4.5*rad] )
    
    //contorno
    ctx.fillStyle = "#9c1f18";
    ctx.beginPath()
    ctx.arc(center_1[i][0], center_1[i][1], rad, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    
    //texto
    ctx.fillStyle = "white";
    var width= ctx.measureText(column_1[i]).width;
    ctx.fillText(column_1[i], center_1[i][0]-(width/2), center_1[i][1]);
}

var mouseover="";

function updateMousePos(event){
    mouse_y= event.clientY - canvas.offsetTop;
    mouse_x= event.clientX - canvas.offsetLeft;
    
    mouseover= "";
    for (var i = 0; i < column_0.length; ++i) {
        
        if( Math.abs(center_0[i][0] - mouse_x)<=rad && Math.abs( center_0[i][1] - mouse_y)<=rad ){
            mouseover=column_0[i];
            break;
        }
    }
    
    if (mouseover === ""){
        for (var i = 0; i < column_1.length; ++i) {
        
            if( Math.abs(center_1[i][0] - mouse_x)<=rad && Math.abs( center_1[i][1] - mouse_y)<=rad ){
                mouseover=column_1[i];
                break;
            }
        }
    }
}

function mouseSelect(event){
    if (mouseover  !== ""){
        switch(mouseover) {
            case "Projetos Teóricos":
                window.location = "ProjetosTeóricos.html";
                break;
            case "Projetos Práticos":
                window.location = "ProjetosPráticos.html";
                break;
            case "Análise Matemática":
                window.location = "AnáliseMatemática.html";
                break;
            case "Direcionamento e Execução de Projetos":
                window.location = "DirecionamentoExecução.html";
                break;
            case "Creative Thinking":
                window.location = "CreativeThinking.html";
                break;
            case "Desenvolvimento e Aplicação de Software":
                window.location = "DesenvolvimentoAplicação.html";
                break;
            case "Circuitos Elétricos":
                window.location = "CircuitosElétricos.html";
                break;
        }
    }
}

//main

function main(){
    //executar transformação entre os botões
    
    //checar está em mouseover e animar ele
    if (mouseover  !== ""){
        var index= buttons.indexOf(mouseover);
        if(index%2 == 0){
            //usar counter e animar
        }else{
            //usar counter e animar
        }
    }
}
//window.setInterval(main, 100);

//1 rad 2 rad 2 rad 2 rad 1
//2 rad 2 rad 2 rad 2