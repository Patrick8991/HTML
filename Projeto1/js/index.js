//init

var canvas= document.getElementById("canvas")
var ctx= canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight/2;
ctx.font="14px calibri"; //TODO: usar uma fonte embasada

document.onmousemove= updateMousePos;
document.onclick= mouseSelect;

//buttons
class Button{
    constructor(position, label, redirect) {
        this.position= position;
        this.label= label;
        this.redirect= redirect;
        
        this.mouseover= false;
        this.radius= Math.min(rad, (ctx.canvas.height/4-2));
        this.redraw= true;
        
        this.counter= 0
        this.colors=[
            "#9c1f18",
            "rgb(165, 42, 23)",
            "rgb(175, 53, 22)",
            "rgb(185, 64, 21)",
            "rgb(195, 75, 20)",
            "rgb(205, 86, 19)",
            "rgb(215, 97, 18)",
            "rgb(225, 108, 17)",
            "rgb(235, 119, 16)",
            "rgb(245, 130, 15)",
            "#FE8D0E"
        ]
    }
    
    update(){
        //logic
        this.counter+=(this.mouseover ? 1 : -1);
        if (this.counter<0 || this.counter>10){
            this.counter+=1;
            this.counter-=(this.counter==12? 2 : 0);
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

var buttons= [];
var rad;
function buildButtons(){
    var labels=[
        "Projetos",
        "Sobre o Aluno"
    ]
    
    var redirects=[
        "Curso.html",
        "PaginaDoAluno.html"
    ]
    
    rad= ctx.canvas.width/(2*(labels.length+1));
    
    for (var i = 0; i < labels.length; ++i) {
        var position= [2*rad+2*i*rad, (ctx.canvas.height/4)*(1+2*(i%2))];
        buttons.push(new Button( position, labels[i], redirects[i]));
    }
    
    //depois acerto uma função melhor para calcular a posição dos botões
}

//mouse events
var mouseover= null;
function updateMousePos(event){
    var mouse_y= event.clientY - canvas.offsetTop;
    var mouse_x= event.clientX - canvas.offsetLeft;
    
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
buildButtons();

function main(){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    document.body.style.cursor = 'default';
    if(mouseover){
        document.body.style.cursor = 'pointer';
        mouseover.mouseover= true;
    }
    buttons.forEach(function(btn) {
        btn.update();
    });
}
window.setInterval(main, 40);