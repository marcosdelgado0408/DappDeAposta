var over = false;

function reset1(){
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
		if(x < 1350){
			x += step;
			document.getElementById('i' + id).style.left= x + "px";//horizontal move
		}
	}
}


function moveFaster(id){
	var step = Math.floor(Math.random() * 5.5); // Change this step value
	var x = document.getElementById('i' + id).offsetLeft;

	if(x < 1350){
		x += step;
		document.getElementById('i' + id).style.left= x + "px";//horizontal move
	}
	else{
		over = true;
	}

	// if(x >= 1750){
	// 	// console.log("Capitao "+id+" ganhou");
	// 	winner = id;
	// }

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



