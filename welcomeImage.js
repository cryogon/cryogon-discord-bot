/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('main');
const ctx = canvas.getContext('2d');
const image = new Image();
image.src = './images/menhera-chan-chibi.gif';
const anyaImage = new Image();
anyaImage.src = 'images/8276882.jpg';
image.onload = () => {
	function draw() {
		canvas.width = image.width || 498;
		canvas.height = image.height || 401;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#69c3ed';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(50, 50, Math.abs(canvas.width - 100), Math.abs(canvas.height - 100));
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = '44px cursive';
		ctx.fillText('Welcome To Channel', canvas.width / 2, canvas.height / 2);
		ctx.drawImage(image, 0, 0, canvas.width, canvas.width);
		console.log(image.height);
	}
	draw();
};