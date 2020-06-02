window.onload = ()=>{



var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var gap = 85;
var bX = 30;
var bY = 150;

var score = 0;
//load images

var bird =  new Image();
var bg =  new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var fg = new Image();
bird.src = "images/bird.png";
bg.src = "images/bg4.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
fg.src = "images/fg2.png";



//audio

var fly = new Audio();
var scor = new Audio();


fly.src="sounds/fly.mp3";
scor.src="sounds/score.mp3";


var gravity = 1.5;


// on key down

document.addEventListener('keydown', moveup);


function moveup(){
    bY -= 25;
    fly.play();
}

//pipe  co

pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
}

bg.onload = ()=>{

    fg.style.width
    
    function draw(){
        var constant = pipeNorth.height + gap;
        ctx.drawImage(bg, 0 ,0);

        for(let i = 0;i <pipe.length; i++){

            ctx.drawImage(pipeNorth, pipe[i].x,pipe[i].y);
            ctx.drawImage(pipeSouth,pipe[i].x, pipe[i].y+constant);
        
            pipe[i].x --;

            if(pipe[i].x == 250){

                pipe.push({
                    x: canvas.width,
                    y:Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
                });

            }

            //collision

            if(bX+ bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && 
                (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y+constant) || (bY + bird.height) >= (canvas.height - fg.height)){

                window.location.href = "result.html";

            }


            if(pipe[i].x ==0){
                score++;
                scor.play();
            }

        }

        ctx.drawImage(fg, 0,canvas.height - fg.height);
        ctx.drawImage(bird, bX ,bY);

        bY = bY + gravity;

        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score: "+score, 10, canvas.height-20);


        requestAnimationFrame(draw);
    
    }
    
    draw();
    
    

};


}