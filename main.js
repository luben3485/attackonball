// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var ballnumber = 0;
var game=true;
var rightPressed = false;
var leftPressed = false;
var timer;
var maxballnumber = 10;
var starttime;
// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
/* 球物件 */
function Ball(rx,vx) {
  this.Accy=Math.random()/2;
  this.visible=true;
  this.x=rx;
  this.velX=vx;
  //this.x = random(0,width);
  this.y = random(60,height/2-100);
 // this.velX = random(-7,7);
  this.velY = random(4,8);
  this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
  this.size = random(30,50);
}
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}
Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
	ballnumber-=1;
	this.visible=false;
  }

  if((this.x - this.size) <= 0) {
    //this.velX = -(this.velX);
	ballnumber-=1;
	this.visible=false;
  }

  if((this.y + this.size) >= height/2) {
    this.velY = -(this.velY);
    this.y += this.velY;
  }
  
  this.velY+=this.Accy;
  this.y+=this.velY;
  this.x += this.velX;
}
/*  監聽並控制player移動 */
window.addEventListener("keydown", function(event) {
    if(event.keyCode === 39) {
        rightPressed = true;
    }
    else if(event.keyCode === 37) {
        leftPressed = true;
    }
}, false);
window.addEventListener("keyup",function(event) {
    if(event.keyCode === 39) {
        rightPressed = false;
    }
    else if(event.keyCode === 37) {
        leftPressed = false;
    }
}, false);

/*  玩家player物件  */
function player(){
	this.x=width/2;
	this.y=height/2;
	this.color='rgba(255,255,0,1)';
	
}
var playerwidth=40;
var playerheight=40;
player.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x,this.y-40,playerwidth,playerheight);
}
player.prototype.checkcollision = function(i){
	
		var dx = balls[i].x-(p.x + playerwidth/2);
		var dy = balls[i].y-(p.y + playerheight/2);
		var distance = Math.sqrt(dx*dx+dy*dy);
		if(distance < balls[i].size + Math.sqrt(playerwidth*playerwidth+playerheight*playerheight)/2 )
		 	 game=false;
}
function time(){
		var now=new Date().getTime();
		var ctime = parseInt((now-starttime)/1000,10);
		var ctimeafter = parseInt((now-starttime)%1000,10);
		$('#time').text(ctime + '.' + ctimeafter);
}
//遊戲迴圈
var balls = [];
var p= new player();
function loop() {
	
  ctx.fillStyle = 'rgba(41,36,33,0.6)' ;
  ctx.fillRect(0,height/2,width,70);
  ctx.fillStyle = 'rgba(192,192,192,1)';
  ctx.fillRect(0,0,width,height/2);


	if(ballnumber < maxballnumber){
	  if(Math.random()>0.5)
	  	var ball = new Ball(width-50,-random(1,5));
      else
	  {
		var ball = new Ball(50,random(1,5));
	  }
	
	balls.push(ball);
	ballnumber+=1;
	}
	
  for(i = 0; i < balls.length; i++) {
	  if(balls[i].visible){
		    balls[i].draw();
    		balls[i].update();
			p.checkcollision(i);
	  }
  }
  p.draw();
  if(leftPressed && p.x>0)
  	  p.x-=7;
  if(rightPressed && p.x+playerwidth < width)
  	  p.x+=7;

	time();
	//requestAnimationFrame(loop);
 	 if(!game){
 		clearTimeout(timer);
	 	$('#restart').show();
	 }
	else
		timer = setTimeout("loop()",10);
}
/* 執行 */
  ctx.fillStyle = 'rgba(41,36,33,1)' ;
  ctx.fillRect(0,height/2,width,70);
  ctx.fillStyle = 'rgba(192,192,192,1)';
  ctx.fillRect(0,0,width,height/2);
  
$('#start').on('click',function(){
	$(this).fadeOut();
	$(this).next().fadeOut();

	setTimeout("starttime = new Date().getTime();loop()",1000);
});
$('#mode').on('click',function(){
	$(this).hide();
	$('#start').hide();
	$('#easy').show();
	$('#normal').show();
	$('#hard').show();
	$('#extra').show();	
});
$('#easy').on('click',function(){
	$(this).hide();
	$('#extra').hide();
	$('#normal').hide();
	$('#hard').hide();
	$('#start').show();
	$('#mode').show();
	maxballnumber = 5;
});
$('#normal').on('click',function(){
	$('#extra').hide();
	$(this).hide();
	$('#easy').hide();
	$('#hard').hide();
	$('#start').show();
	$('#mode').show();
		maxballnumber = 10;
});
$('#hard').on('click',function(){
	$(this).hide();
	$('#extra').hide();	
	$('#normal').hide();
	$('#easy').hide();
	$('#start').show();
	$('#mode').show();
		maxballnumber = 20;
});
$('#extra').on('click',function(){
	$(this).hide();
	$('#hard').hide();
	$('#normal').hide();
	$('#easy').hide();
	$('#start').show();
	$('#mode').show();
		maxballnumber = 30;
});
$('#restart').on('click',function(){
	$(this).hide();
	$('#start').show();
	$('#mode').show();
	ctx.fillStyle = 'rgba(41,36,33,1)' ;
  	ctx.fillRect(0,height/2,width,70);
  	ctx.fillStyle = 'rgba(192,192,192,1)';
 	ctx.fillRect(0,0,width,height/2);
	balls.length = 0;
	game =1;
	ballnumber = 0;
	p.x=width/2;
	p.y=height/2;
	
});
