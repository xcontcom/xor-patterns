const { createCanvas } = require('canvas');
const fs = require('fs');
const { spawn } = require('child_process');

var size=2;
var sizexy=256;

const canvas = createCanvas(sizexy * size, sizexy * size);
const ctx = canvas.getContext('2d');

// Spawn FFmpeg process
const ffmpeg = spawn('ffmpeg', [
  '-y',
  '-f', 'image2pipe',
  '-vcodec', 'png',
  '-r', '30', // frame rate
  '-i', 'pipe:0',
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-preset', 'slow',
  '-crf', '20',
  `xor_${Math.random()}.mp4`
]);

ffmpeg.stderr.on('data', (data) => console.error(data.toString()));
ffmpeg.on('close', () => console.log(`MP4 saved as xor_${Math.random()}.mp4`));

let d=255;
let e=509;
let max=d;
//let step=Math.floor(max/64); //speed up but the quality is crap
step=1;

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
	// Output frame to ffmpeg
	const frame = canvas.toBuffer('image/png');
	ffmpeg.stdin.write(frame);
}

ffmpeg.stdin.end();