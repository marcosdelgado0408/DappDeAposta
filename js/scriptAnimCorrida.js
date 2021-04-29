var over = false;
var chegada = 1700;
var winnerid;


function reset1(){

	location.reload();
	// desanimar();
	// clearTimeout(my_time);
	// over = false;
	// document.getElementById('i1').style.left = "30px";
	// document.getElementById('i2').style.left = "30px";
	// document.getElementById('i3').style.left = "30px";
	// document.getElementById('i4').style.left = "30px";
	// document.getElementById('i5').style.left = "30px";
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
		winnerid = id;
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


function showWinner(){
	setTimeout(function() {alert("Cavalo " + winnerid + " ganhou!")}, 13000);
	// document.getElementById("startButton").onclick = null;
}




function starting(){
	
	var ml4 = {};
	ml4.opacityIn = [0,1];
	ml4.scaleIn = [0.1, 1];
	ml4.scaleOut = 3;
	ml4.durationIn = 800;
	ml4.durationOut = 600;
	ml4.delay = 500;

	anime.timeline({loop: false})
	.add({
		targets: '.ml4 .letters-1',
		opacity: ml4.opacityIn,
		scale: ml4.scaleIn,
		duration: ml4.durationIn
	}).add({
		targets: '.ml4 .letters-1',
		opacity: 0,
		scale: ml4.scaleOut,
		duration: ml4.durationOut,
		easing: "easeInExpo",
		delay: ml4.delay
	}).add({
		targets: '.ml4',
		opacity: 0,
		duration: 500,
		delay: 500
	});



}