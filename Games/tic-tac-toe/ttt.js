var ispc=false;
var row=3;
var col=3;
function Move(){
	this.row=-1;
	this.col=-1;
}
var player='x',opponent='o';
var board = [['_','_','_'],
			 ['_','_','_'],
			 ['_','_','_']
			];
function setup(argument) {
	createCanvas(300,400);
}
function draw(){
	background(51);
	strokeWeight(3)
	stroke(255);
	line(100,0,100,300);
	line(200,0,200,300);
	line(0,100,300,100);
	line(0,200,300,200);
	line(0,300,300,300);
	game_play(board);
	draw_board(board);
	var score = evaluate(board);
     if(score==-10){
     	fill(255);
     	textSize(14)
     	text("You Win",320,120)
		// noLoop();
     }
    else if(score==10){
stroke(255);
    	textSize(14)
     	fill("Pc Win",320,120)
   		// noLoop();
	}
	else if(!ismove(board)){
		fill(255);
		textSize(14)
     	text("Draw",320,120)
		// noLoop();
	}
}
function draw_board(board){
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(board[i][j]=='x')
				draw_x(j,i);
			else if(board[i][j]=='o')
				draw_y(j,i);
		}
	}
}
function draw_x(i,j){
	strokeWeight(3)
	stroke(150,234,123);
	line(25+(i*100),25+(j*100),75+(i*100),75+(j*100));
	line(25+(i*100),75+(j*100),75+(i*100),25+(j*100));
}
function draw_y(i,j){
	var x = 50+(i*100);
	var y = 50+(j*100);
	strokeWeight(3)
	fill(51)
	stroke(150,234,123);
	ellipse(x,y,50,50);
}
function mousePressed(){
	var c= Math.floor(mouseX/100);
	var r= Math.floor(mouseY/100);
	// console.log(r,c);
	if(r<3&&c<3&&board[r][c]=='_')
			board[r][c]='o';		
	ispc=!ispc;
}
function game_play(board){
	 // while(true){
    	if(ispc){
    		var best_move = new Move;
    		best_move = findBestMove(board);
    		board[best_move.row][best_move.col] = player;
    		ispc=!ispc;
    		// console.log('player');
    		// redraw();
    	}
 //    var score = evaluate(board);
 //     if(score==-10){
 //     	stroke(255);
 //     	textSize(14);
 //    	 text("Pc Win",100,320);
 //     }
 //    else{
 //    	stroke(255);
 //    	 textSize(14);
 //    	 // text("You Win",100,320);
	// }
}
function evaluate(board){
	for (var row = 0; row < 3; ++row)
	{
		if(board[row][0]==board[row][1]&&board[row][1]==board[row][2]){
			if(board[row][0]=='x')
				return 10;
			else if(board[row][0]=='o')
				return -10;
		}
	}
	for (var col = 0; col < 3; ++col)
	{
		if(board[0][col]==board[1][col]&&board[0][col]==board[2][col]){
			if(board[0][col]=='x')
				return 10;
		else if(board[0][col]=='o')
				return -10;}
	}
		if(board[0][0]==board[1][1]&&board[0][0]==board[2][2]){
			if(board[0][0]=='x')
				return 10;
		else if(board[0][0]=='o')
				return -10;
		}
		if(board[0][2]==board[1][1]&&board[0][2]==board[2][0]){
			if(board[0][2]=='x')
				return 10;
		else if(board[0][2]=='o')
			
				return -10;
		}
		return 0;
}
function ismove(board){
	for (var i = 0; i < 3; ++i)
		{
			for (var j = 0; j < 3; ++j)
			{
				if(board[i][j]=='_')return true;
			}
		}
		return false;
}
function minmax(board,depth,isMax){
	var score = evaluate(board);
	// console.log("depth = "+depth,"score = "+score);
	if(score==10||score==-10)return score;
	if(!ismove(board))return 0;
	if(isMax){
		var best = -1000;
		for (var i = 0; i < 3; ++i)
		{
			for (var j = 0; j < 3; ++j)
			{
				if(board[i][j]=='_'){
				board[i][j] = player;
				best = max(minmax(board,depth+1,!isMax),best);
				board[i][j] = '_';
				}
			}
		}
		return best;
	}
	else{
		var best = 1000;
		for (var i = 0; i < 3; ++i)
		{
			for (var j = 0; j < 3; ++j)
			{
				if(board[i][j]=='_'){
				board[i][j] = opponent;
				best = min(minmax(board,depth+1,!isMax),best);
				board[i][j] = '_';
				}
			}
		}
		return best;
	}
}
function findBestMove(board){
	var best = new Move;
	best.row=-1;
	best.col=-1;
	var best_val = -1000;
	for (var row = 0; row < 3; ++row)
	{
		for (var col = 0; col < 3; ++col)
		{
			if(board[row][col]=='_'){
			board[row][col] = player;
			var move_val = minmax(board,0,false);
			// console.log(move_val);	
			board[row][col] = '_';
			if(move_val>best_val){
				best_val = move_val;
				best.row = row;
				best.col = col;
			}
		 }
		}
	}
	return best;
}
