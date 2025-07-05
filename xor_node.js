const { createCanvas } = require('canvas');
const GIFEncoder = require('gifencoder');
const fs = require('fs');

var size=2;
var sizexy=256;

const canvas = createCanvas(sizexy * size, sizexy * size);
const ctx = canvas.getContext('2d');

const encoder = new GIFEncoder(sizexy * size, sizexy * size);
encoder.createReadStream().pipe(fs.createWriteStream(`xor_${Math.random()}.gif`));

encoder.start();
encoder.setRepeat(0); // 0 = loop forever
encoder.setDelay(100); // frame delay in ms
encoder.setQuality(10);

const e=509;
const d=255;
let max=d;
let step=Math.floor(max/64);

for(let z=0;z<max;z+=step){
	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.fillRect (0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(0,0,0)';
	
	for(var x=0;x<sizexy;x++){
		for(var y=0;y<sizexy;y++){

			let value = ((x*e)^(y*e)^z)%d;
			let brightness = Math.round(value * (255 / (d - 1)));
			ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
				ctx.fillRect(x*size, y*size, 1*size, 1*size);
		}
	}
	// Add frame to GIF
	encoder.addFrame(ctx);
}
encoder.finish();
console.log('GIF saved');