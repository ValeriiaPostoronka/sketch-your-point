var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var radius = 10;
var dragging = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = function(){
    var image = context.getImageData(0,0,canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.putImageData(image, 0,0);
}

context.lineWidth = radius*2;

var putPoint = function(point){
    if(dragging) {
        context.lineTo(point.clientX, point.clientY);
        context.stroke();
        context.beginPath();
        context.arc(point.clientX, point.clientY, radius, 0, Math.PI*2);
        context.fill();
        context.beginPath();
        context.moveTo(point.clientX, point.clientY);
    }
}

var engage = function(point){
    dragging = true;
    putPoint(point);
}

var disengage = function(){
    dragging = false;
    context.beginPath();
}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);