let grayscale = document.getElementById("grayscale");
let treshold = document.getElementById("treshold");
let removeRed = document.getElementById("removeRed");
let removeGreen = document.getElementById("removeGreen");
let removeBlue = document.getElementById("removeBlue");
let HighlightRed = document.getElementById("highlightRed");
let HighlightBlue = document.getElementById("highlightBlue");
let HighlightGreen = document.getElementById("highlightGreen");
let brightness = document.getElementById("brightness");

grayscale.addEventListener('click', () => {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
		let x = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
		data[i] = x;
		data[i + 1] = x;
		data[i + 2] = x;
	}
    imgData.data = data;
	ctx.putImageData(imgData, 0, 0);
})


treshold.addEventListener('click', () => {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;

    let y = parseFloat(treshold.value);
    for (let i = 0; i < data.length; i += 4) {
		data[i] = (data[i] > y) ? 255 : 0;
		data[i + 1] = (data[i + 1] > y) ? 255 : 0;
		data[i + 2] = (data[i + 2] > y) ? 255 : 0;
	}

    imgData.data = data;
	ctx.putImageData(imgData, 0, 0);
})


removeRed.addEventListener('click', () => {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
		let n = data[i + 0] * 0;
		if (n > 255) 
            n = 255;
		data[i + 0] = n;
	}

    imgData.data = data;
	ctx.putImageData(imgData, 0, 0);
})

removeGreen.addEventListener('click', () => {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
		let n = data[i + 1] * 0;
		if (n > 255) 
            n = 255;
		data[i + 1] = n;
	}

    imgData.data = data;
	ctx.putImageData(imgData, 0, 0);
})

removeBlue.addEventListener('click', () => {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
		let n = data[i + 2] * 0;
		if (n > 255) 
            n = 255;
        data[i + 2] = n;
	}

    imgData.data = data;
	ctx.putImageData(imgData, 0, 0);
})

HighlightRed.addEventListener('click', () => {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
		let n = data[i + 0] * HighlightRed.value;
		if (n > 255) 
            n = 255;
		data[i + 0] = n;
	}

    imgData.data = data;
	ctx.putImageData(imgData, 0, 0);
})

HighlightGreen.addEventListener('click', () => {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
		let n = data[i + 1] * HighlightGreen.value;
		if (n > 255) 
            n = 255;
		data[i + 1] = n;
	}

    imgData.data = data;
	ctx.putImageData(imgData, 0, 0);
})

HighlightBlue.addEventListener('click', () => {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
		let n = data[i + 2] * HighlightBlue.value;
		if (n > 255) 
            n = 255;
        data[i + 2] = n;
	}

    imgData.data = data;
	ctx.putImageData(imgData, 0, 0);
})

brightness.addEventListener('click', () => {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
		for (let j = i; j < i + 3; j++) {
			data[j] = data[j] + parseFloat(brightness.value);

			if (data[j] > 255) data[j] = 255;
			else if (data[j] < 0) data[j] = 0;
		}
	}
    imgData.data = data;
	ctx.putImageData(imgData, 0, 0);
})