var s;
var food;
var scl=20;
function setup() {
	createCanvas(600,600);
	s = new Snake();
	frameRate(10);
	pickLocation(); 
}
function pickLocation()
{
	var cols = floor(width/scl);
	var rows = floor(height/scl); 
	 food = createVector(floor(random(rows)),floor(random(cols))); 
	food.mult(scl);
}
function draw()
{
background(51);
s.death();
s.update();
s.show();
fill(123,0,255);
rect(food.x,food.y,scl,scl);
if(s.eat(food))
	{
		pickLocation();
	};
}
function keyPressed()
{
	if(keyCode === UP_ARROW)
	{
		s.dir(0,-1);
	}else if(keyCode === DOWN_ARROW)
	{
		s.dir(0,1);
	}
	else if(keyCode === LEFT_ARROW)
	{
		s.dir(-1,0);
	}
	else if(keyCode === RIGHT_ARROW)
	{
		s.dir(1,0);
	}
}
