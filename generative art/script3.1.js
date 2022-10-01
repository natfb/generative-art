window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    //canvas settings
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //ctx.fillStyle = 'blue';
    ctx.lineCap = 'round';
    ctx.shadowColor='rgba(0,0,0,0.7)'; 
    ctx.shadowOffsetY = 5;
    ctx.shadowOffsetX = 10;
    ctx.shadowBlur = 10;

    //effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.25
    : canvas.height * 0.25;
    const maxLevel = 8;
    const branches = 2;
    
    let sides = 5;
    let spread = 0.6;  
    let scale = 0.7;  
    let color =  'hsl('+ Math.random() * 360 + ',100%,50%)';
    let linewitdh = Math.floor(Math.random()* 20 + 10);

    //constrols 
    const ramdomizeButton = document.getElementById('randBut');
    const merdadebotao = document.getElementById('randBut'); 
    const resetbutton = document.getElementById('resbut');
    const slider_spread = document.getElementById('spread');
    const label_spread = document.querySelector('[for="spread"]');



    
    slider_spread.addEventListener('change', function(e){
        spread = e.target.value;  //problem here
        console.log = 'something'
        drawFractal();
        upspread();
    });

    const slider_sides = document.getElementById('sides');
    const label_sides = document.querySelector('[for="sides"]');
    slider_sides.addEventListener('change', function(f){
        sides = f.target.value;
        
        drawFractal();
        upspread();  
    });
    
///////////////////////////////////////////
    function drawbranch(level){
        if (level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size, 0);
        ctx.stroke();


        for(let i = 0; i < branches; i++){
            ctx.save();
            ctx.translate(size-(size/branches)*i,0);
            ctx.scale(scale, scale);

            ctx.save();
            ctx.rotate(spread);
            drawbranch(level+1);
            ctx.restore();



            ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(0 ,size, size * 0.1, 0, Math.PI*2);
        ctx.fill();
    }
        function drawFractal(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = linewitdh;
            ramdomizeButton.style.backgroundColor = color;
            color = 'hsl('+ Math.random() * 360 +',100%, 50%)';

            ctx.shadowColor='rgba(0,0,0,0.7)'; 
            ctx.shadowOffsetY = 5;
            ctx.shadowOffsetX = 10;
            ctx.shadowBlur = 10;
            
            ctx.translate(canvas.width/2, canvas.height/2);
            for(let i = 0; i< sides; i++){
                ctx.rotate((Math.PI*2)/sides);
                drawbranch(0);


            }
        ctx.restore();
        }  
        drawFractal()  
        


        
        function ramdomizeFractal(){
           sides = Math.floor(Math.random() * 15 + 3);
           spread = Math.random() * 3  + 1 ;  
           scale = Math.random() * 0.4 + 0.6;  
           
           drawFractal();
           linewitdh = Math.floor(Math.random() * 20 + 1);
           ramdomizeButton.style.backgroundColor = color;
        }
        
        ramdomizeButton.addEventListener('click', function(){
            ramdomizeFractal();
            drawFractal();
            upspread();
            
        });

/////////// enter button /////////////////////////////  nao funciona //// amem!!
//window.addEventListener('load', function(){     ///// o event estava no botao 
    document.addEventListener("keydown", function(event){     ////keypress nao funcionou
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            // Trigger the button element with a click
            event.preventDefault();
            ramdomizeButton.click();
            ramdomizeButton.addEventListener('click', function(){
            ramdomizeFractal();
            drawFractal();
            upspread();
            })
        }   
    });
//})
////////////////////////////////////////////////////// 
        function resetFractal(){
           sides = 5;
           spread = 0.5;  
           scale = 0.5;  
           //color = 'hsl(360,100%,50%)';
           linewitdh = 15;
        }

        resetbutton.addEventListener('click', function(){
            resetFractal();
            upspread();
            drawFractal();
        });
        
        function upspread(){ //n esta funcionando quando mexe o slider manualmente ? arrumei
            slider_spread.value = spread;
            label_spread.innerText = 'Spread: '+ Number(spread).toFixed(1);

            slider_sides.value = sides;
            label_sides.innerText = 'Sides: '+ sides;
        }
        upspread()

//////// enter button /////////////////////////////  só funciona se clicar primeiro ////
window.addEventListener('load', function(){
    const merdadebotao = document.getElementById('randBut'); 
    document.merdadebotao.addEventListener('keypress', function(event){
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            // Trigger the button element with a click
            event.preventDefault();
            merdadebotao.click();
            merdadebotao.addEventListener('click',function(){
            ramdomizeFractal();
            drawFractal();
            });
        }
    }); 
}) 
////////////////////////////////////////////////////// 
       
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;  
    ctx.lineCap = 'round'; 
    drawFractal();

});


});

