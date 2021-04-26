function reset1(){
	clearTimeout(my_time);
	document.getElementById('i1').style.left = "300px";
	document.getElementById('i2').style.left = "300px";
	document.getElementById('i3').style.left = "300px";
}

function disp(){

	var step_capitao=1; // Change this step value
	var x=document.getElementById('i1').offsetLeft;
	if(x < 1300){
		x= x + step_capitao;
		document.getElementById('i1').style.left= x + "px";//horizontal move
	}

	var step_murrice= 1;
	var x2= document.getElementById('i2').offsetLeft;
	if(x2 < 1300){
		x2= x2 +step_murrice;
		document.getElementById('i2').style.left= x2 + "px";//horizontal move
	}

	var step_cavalo = 1
	var x3 = document.getElementById('i3').offsetLeft;
	if(x3 < 1300){
		x3 = x3 + step_cavalo;
		document.getElementById('i3').style.left = x3 + "px";
	}

}

function timer(){
	disp();
	my_time=setTimeout('timer()',1);
}