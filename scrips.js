function reset1(){
	clearTimeout(my_time);
	document.getElementById('i1').style.left = "30px";
	document.getElementById('i2').style.left = "30px";
	document.getElementById('i3').style.left = "30px";
	document.getElementById('i4').style.left = "30px";
	document.getElementById('i5').style.left = "30px";

	
}

function disp(){

	var step_capitao1= Math.floor(Math.random() * 5); // Change this step value
	var x = document.getElementById('i1').offsetLeft;
	if(x < 1750){
		x= x + step_capitao1;
		document.getElementById('i1').style.left= x + "px";//horizontal move
	}

	var step_capitao2= Math.floor(Math.random() * 5);
	var x2= document.getElementById('i2').offsetLeft;
	if(x2 < 1750){
		x2= x2 + step_capitao2;
		document.getElementById('i2').style.left= x2 + "px";//horizontal move
	}

	var step_capitao3= Math.floor(Math.random() * 5);
	var x3 = document.getElementById('i3').offsetLeft;
	if(x3 < 1750){
		x3 = x3 + step_capitao3;
		document.getElementById('i3').style.left = x3 + "px";
	}


	var step_capitao4= Math.floor(Math.random() * 5);
	var x4 = document.getElementById('i4').offsetLeft;
	if(x4 < 1750){
		x4 = x4 + step_capitao4;
		document.getElementById('i4').style.left = x4 + "px";
	}

	var step_capitao5= Math.floor(Math.random() * 5);
	var x5 = document.getElementById('i5').offsetLeft;
	if(x5 < 1750){
		x5 = x5 + step_capitao4;
		document.getElementById('i5').style.left = x4 + "px";
	}


}

function timer(){
	disp();
	my_time=setTimeout('timer()',15);
}