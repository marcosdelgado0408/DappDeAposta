
function reset1(){
	clearTimeout(my_time);
	document.getElementById('i1').style.left = "30px";
	document.getElementById('i2').style.left = "30px";
	document.getElementById('i3').style.left = "30px";
	document.getElementById('i4').style.left = "30px";
	document.getElementById('i5').style.left = "30px";

	
}


function move(id){
	var step = Math.floor(Math.random() * 5); // Change this step value
	var x = document.getElementById('i' + id).offsetLeft;

	if(x < 1750){
		x += step;
		document.getElementById('i' + id).style.left= x + "px";//horizontal move
	}

	if(x >= 1750){console.log("Capitao "+id+" ganhou")};
	
}


function disp(){

	move('1');
	move('2');
	move('3');
	move('4');
	move('5');



}

function timer(){
	disp();
	my_time=setTimeout('timer()',15);


}

