//init

var canvas= document.getElementById("canvas")
var ctx= canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight/2;
ctx.font="14px calibri"; //TODO: usar uma fonte embasada

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

//buttons
class Button{
    constructor(position, label, redirect) {
        this.position= position;
        this.label= label;
        this.redirect= redirect;
        
        this.mouseover= false;
        this.radius= ctx.canvas.height/6;
        this.redraw= true;
        
        this.counter= 0
        this.colors=[
            "#9c1f18",
            "rgb(160, 36, 24)",
            "rgb(165, 42, 23)",
            "rgb(170, 47, 23)",
            "rgb(175, 53, 22)",
            "rgb(180, 58, 22)",
            "rgb(185, 64, 21)",
            "rgb(190, 69, 21)",
            "rgb(195, 75, 20)",
            "rgb(200, 80, 20)",
            "rgb(205, 86, 19)",
            "rgb(210, 91, 19)",
            "rgb(215, 97, 18)",
            "rgb(220, 102, 18)",
            "rgb(225, 108, 17)",
            "rgb(230, 113, 17)",
            "rgb(235, 119, 16)",
            "rgb(240, 124, 16)",
            "rgb(245, 130, 15)",
            "rgb(250, 135, 15)",
            "#FE8D0E"
        ]
    }
    update(){
        //logic
        this.counter+=(this.mouseover ? 1 : -1);
        if (this.counter<0 || this.counter>20){
            this.counter+=1;
            this.counter-=(this.counter==22? 2 : 0);
        }else{
            this.redraw= true;
        }
        
        //draw
        if (this.redraw){
            
            var position= this.position;
            var rad= this.radius;
            var lbl= this.label
            
            //contorno
            ctx.fillStyle = this.colors[this.counter];
            ctx.lineWidth = 3;
            ctx.beginPath()
            ctx.arc(position[0], position[1], rad, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            
            //texto
            ctx.fillStyle = "white";
            var width= ctx.measureText(lbl).width;
            ctx.fillText(lbl, position[0]-(width/2), position[1]);
            
            //this.redraw= false;
            //Talvez valha a pena atualizar dinamicamente o raio e posição para a página
        }
        this.mouseover= false;
    }
}

for (var i = 0; i < column_0.length; ++i) {
    
    center_0.push( [(2*spc_0+rad)+(i*(2*rad)+i*(2*spc_0)), 1.5*rad] )
    console.log(center_0[-1]);
}

for (var i = 0; i < column_1.length; ++i) {
    
    center_1.push( [(1*spc_1+rad)+(i*(2*rad)+i*(2*spc_1)), 4.5*rad] )
}

var buttons= [];
buttons.push( new Button( center_1[0], "Projetos Teóricos", "ProjetosTeóricos.html"))
buttons.push( new Button( center_0[0], "Projetos Práticos", "ProjetosPráticos.html"))
buttons.push( new Button( center_1[1], "Anáise Matemática", "AnáliseMatemática.html"))
buttons.push( new Button( center_0[1], "Direcionamento e Execução de Projetos", "DirecionamentoExecução.html"))
buttons.push( new Button(center_1[2], "Creative Thinking", "CreativeThinking.html"))
buttons.push( new Button( center_0[2], "Desenvolvimento e Aplicação de Software", "DesenvolvimentoAplicação.html"))
buttons.push( new Button( center_1[3], "Circuitos Elétricos", "CircuitosElétricos.html"))

//depois acerto uma função melhor para calcular o centro dos botões


//mouse events

var mouseover= null;

function updateMousePos(event){
    mouse_y= event.clientY - canvas.offsetTop;
    mouse_x= event.clientX - canvas.offsetLeft;
    
    mouseover= null;
    for (var i = 0; i < buttons.length; ++i) {
        
        rad= buttons[i].radius;
        position= buttons[i].position;
        
        if( Math.abs(position[0] - mouse_x)<=rad && Math.abs( position[1] - mouse_y)<=rad ){
            mouseover=buttons[i];
            break;
        }
    }
}

function mouseSelect(event){
    
    updateMousePos(event);
    if (mouseover){
        window.location= mouseover.redirect;
    }
}

//main

function main(){
    //executar transformação entre os botões
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if(mouseover){
        mouseover.mouseover= true;
    }
    buttons.forEach(function(btn) {
        btn.update();
    });
}
window.setInterval(main, 20);