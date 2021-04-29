var over = false;
var chegada = 1750;


function reset1(){

	desanimar();
	clearTimeout(my_time);
	over = false;
	document.getElementById('i1').style.left = "30px";
	document.getElementById('i2').style.left = "30px";
	document.getElementById('i3').style.left = "30px";
	document.getElementById('i4').style.left = "30px";
	document.getElementById('i5').style.left = "30px";

}


function move(id){
	var step = Math.floor(Math.random() * 5); // Change this step value
	var x = document.getElementById('i' + id).offsetLeft;

	if(!over){ 

		if(x < chegada){
			x += step;
			document.getElementById('i' + id).style.left= x + "px";//horizontal move
		}

	}
}


function moveFaster(id){
	var step = Math.floor(Math.random() * 5.5); // Change this step value
	var x = document.getElementById('i' + id).offsetLeft;

	if(x < chegada){
		x += step;
		document.getElementById('i' + id).style.left= x + "px";//horizontal move
	}
	else{
		over = true;
		desanimar();
	}


}


function animar(){
	document.getElementById('i1').src = "imagens/astronauta.gif";
	document.getElementById('i2').src = "imagens/horse.gif";
	document.getElementById('i3').src = "imagens/robothorse.gif";
	document.getElementById('i4').src = "imagens/capitao.gif";
	document.getElementById('i5').src = "imagens/unicornio.gif";
}

function desanimar(){
	document.getElementById('i1').src = "imagens/astronauta000.gif";
	document.getElementById('i2').src = "imagens/horse000.gif";
	document.getElementById('i3').src = "imagens/robothorse000.gif";
	document.getElementById('i4').src = "imagens/capitaotpose.png";
	document.getElementById('i5').src = "imagens/unicornio000.gif";
}




function moveFaster1(){
	moveFaster('1');
	move('2');
	move('3');
	move('4');
	move('5');
}
function moveFaster2(){
	move('1');
	moveFaster('2');
	move('3');
	move('4');
	move('5');
}
function moveFaster3(){
	move('1');
	move('2');
	moveFaster('3');
	move('4');
	move('5');
}
function moveFaster4(){
	move('1');
	move('2');
	move('3');
	moveFaster('4');
	move('5');
}
function moveFaster5(){
	move('1');
	move('2');
	move('3');
	move('4');
	moveFaster('5');
}



function timer(){
	

	verCampeao().then((result) => {
		switch (result) {
			
			case "1":
				moveFaster1();
			break;
			
			case "2":
				moveFaster2();
			break;
			
			case "3":
				moveFaster3();
			break;
	
			case "4":
				moveFaster4();
			break;
	
			case "5":
				moveFaster5();
			break;
		
			default:
				break;
		}
	
	});	

	
	
	my_time = setTimeout('timer()',15);

}



