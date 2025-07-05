var size=2;
var sizexy=256;

function droveLines(canvas, ax, ay){
	var d=document.getElementById('d').value*1;
	var e=document.getElementById('e').value*1;
	var phaze=0;
	
	ax=Math.floor(ax/size);
	ay=Math.floor(ay/size);
	//d=ay;
	document.getElementById('console-log0').innerHTML="ax: "+(ax)+", ay: "+(ay);
	
	var z, context, xx, yy;
	
	context=canvas.getContext('2d');
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect (0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgb(0,0,0)';
	
	let array = new Array(sizexy);
	for(var x=0;x<sizexy;x++){
		array[x] = new Int8Array(sizexy);
		for(var y=0;y<sizexy;y++){


			
			let value = ((x*e)^(y*e)^ax)%d;
			let brightness = Math.round(value * (255 / (d - 1)));
			context.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
			//let hue = Math.round(value * (360 / (d - 1)));
			//context.fillStyle = `hsl(${hue}, 100%, 50%)`;
			//if (value>(d>>1))
				context.fillRect(x*size, y*size, 1*size, 1*size);

		}
	}
}

function getMousePos(canvas, evt){
	var obj=canvas;
	var top=0;
	var left=0;
	while (obj && obj.tagName != 'BODY') {
		top+=obj.offsetTop;
		left+=obj.offsetLeft;
		obj=obj.offsetParent;
	}
 
	var mouseX=evt.clientX-left+window.pageXOffset;
	var mouseY=evt.clientY-top+window.pageYOffset;
	return {
		x: mouseX,
		y: mouseY
	};
}

window.onload=function(){
var canvas=document.getElementById('myCanvas');
var context=canvas.getContext('2d');
canvas.width=sizexy*size;
canvas.height=sizexy*size;
canvas.addEventListener('mousemove', function(evt){
		var mousePos=getMousePos(canvas, evt);
		droveLines(canvas, mousePos.x, mousePos.y);
	}, false);
};

