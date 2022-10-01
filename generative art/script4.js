const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let partArray = [];
let numbOfParticles = 300;
let hue = 1;

///measure title lelemnte
let titleElement = document.getElementById('title1');
let titleMeasurement = titleElement.getBoundingClientRect();
//console.log(titleMeasurement);
let title = {
    x: titleMeasurement.left,
    y: titleMeasurement.top,
    width: titleMeasurement.width,
    height: 10,

}


class Particle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 0.1;
        this.weight = Math.random() * 1 + 1;
        let min = -1;
        let max = 1;
        let random = Math.floor(Math.random() * (max - min + 1)) + min;
        this.directionX = random;
       
    }
    update(){
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(this.y > canvas.height){
            this.y = 0 - this.size;
            this.weight = Math.random() * 1 + 1;
            this.x = Math.random() * canvas.width * 1.3;
        }
       
        this.weight += 0.01;
        this.y += this.weight;
        if (this.directionX == 0 ){
            this.x += 1 
        }else{
            this.x += this.directionX 
        }
        
        

        ///// checking things
        if (this.x < title.x + title.width && 
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y
            ){
            this.y -= 3; 
            this.weight *= -0.5;
        }
    }
    draw(){
        ctx.fillStyle = 'hsl('+ hue +', 60%, 60%)';
        ctx.shadowColor='rgba(31, 46, 8, 0.05)'; 
        ctx.shadowOffsetY = 2;
        ctx.shadowOffsetX = 2;
        ctx.shadowBlur = 20;
        ctx.beginPath(0,0);
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}
function init(){
    partArray = [];
    for(let i = 0; i < numbOfParticles; i++){
        let x = Math.random() * canvas.width;
        let y = (Math.random() * title.y - 0   ) + 0;
        partArray.push(new Particle(x, y));
    }
    //console.log(partArray);
}
init();


function animate(){
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i=0; i<partArray.length; i++){
        partArray[i].update();
        partArray[i].draw();
    }
    //ctx.fillRect(title.x, title.y, title.width, title.height);
    hue +=3;
    requestAnimationFrame(animate);
   
}
animate();


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    titleMeasurement = titleElement.getBoundingClientRect();
    title = {
        x: titleMeasurement.left,
        y: titleMeasurement.top,
        width: titleMeasurement.width,
        height: 10,
    } 
    init();
})



