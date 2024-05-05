let grayscale = document.getElementById("grayscale");
let treshold = document.getElementById("treshold");
let removeRed = document.getElementById("removeRed");
let removeGreen = document.getElementById("removeGreen");
let removeBlue = document.getElementById("removeBlue");
let HighlightRed = document.getElementById("highlightRed");
let HighlightBlue = document.getElementById("highlightBlue");
let HighlightGreen = document.getElementById("highlightGreen");
let brightness = document.getElementById("brightness");
let gaussianBlur = document.getElementById("gaussianBlur");
let sobel = document.getElementById("sobel");
let sharpening = document.getElementById("sharpening");
let unsharpening = document.getElementById("unsharpening");

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

    for (let i = 0; i < data.length; i += 4) {
		data[i] = (data[i] > parseFloat(treshold.value)) ? 255 : 0;
		data[i + 1] = (data[i + 1] > parseFloat(treshold.value)) ? 255 : 0;
		data[i + 2] = (data[i + 2] > parseFloat(treshold.value)) ? 255 : 0;
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

function getPixel(data, x, y, width) {
    let pixel = (y * width + x) * 4;
    return {
        r: data[pixel],
        g: data[pixel + 1],
        b: data[pixel + 2],
        a: data[pixel + 3]
    };
}

boxBlur.addEventListener('click', () => {
	let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;
	let original = new Uint8ClampedArray(data);
    for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
            let sumR = 0,
                sumG = 0,
                sumB = 0,
                sumA = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const pixel = getPixel(original, x + dx, y + dy, canvas.width);
                    sumR += pixel.r;
                    sumG += pixel.g;
                    sumB += pixel.b;
                    sumA += pixel.a;
                }
            }
            const totalPixels = 9;
            data[(y * canvas.width + x) * 4] = sumR / totalPixels;
            data[(y * canvas.width + x) * 4 + 1] = sumG / totalPixels;
            data[(y * canvas.width + x) * 4 + 2] = sumB / totalPixels;
            data[(y * canvas.width + x) * 4 + 3] = sumA / totalPixels;
        }
    }
	imgData.data = data;
	ctx.putImageData(imgData, 0, 0);
})


gaussianBlur.addEventListener('click', () => {
	let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    let original = new Uint8ClampedArray(data);
    const kernel = [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ]; 

    for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
            let sumR = 0,
                sumG = 0,
                sumB = 0,
                sumA = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const pixel = getPixel(original, x + dx, y + dy, canvas.width);
                    const weight = kernel[dy + 1][dx + 1];
                    sumR += pixel.r * weight;
                    sumG += pixel.g * weight;
                    sumB += pixel.b * weight;
                    sumA += pixel.a * weight;
                }
            }
            const totalWeight = 16; 
            data[(y * canvas.width + x) * 4] = sumR / totalWeight;
            data[(y * canvas.width + x) * 4 + 1] = sumG / totalWeight;
            data[(y * canvas.width + x) * 4 + 2] = sumB / totalWeight;
            data[(y * canvas.width + x) * 4 + 3] = sumA / totalWeight;
        }
    }
    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
})

sobel.addEventListener('click', () => {
	let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

	let original = new Uint8ClampedArray(data);

    const sobelX = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ];

    const sobelY = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
    ];

    for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
            let gradientX = 0,
                gradientY = 0;

            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    gradientX += sobelX[dy + 1][dx + 1] * getPixel(original, x + dx, y + dy, canvas.width).r;
                }
            }

            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    gradientY += sobelY[dy + 1][dx + 1] * getPixel(original, x + dx, y + dy, canvas.width).r;
                }
            }

            let magnitude = Math.sqrt(gradientX * gradientX + gradientY * gradientY);

            magnitude = Math.min(255, Math.max(0, magnitude));

            data[(y * canvas.width + x) * 4] = magnitude; 
            data[(y * canvas.width + x) * 4 + 1] = magnitude; 
            data[(y * canvas.width + x) * 4 + 2] = magnitude; 
        }
    }
	imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
})

laplac.addEventListener('click', () => {
	let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

	let original = new Uint8ClampedArray(data);

    const laplacianKernel = [
        [0, 1, 0],
        [1, -4, 1],
        [0, 1, 0]
    ];

    for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
            let laplacian = 0;

            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    laplacian += laplacianKernel[dy + 1][dx + 1] * getPixel(original, x + dx, y + dy, canvas.width).r;
                }
            }

            laplacian = Math.min(255, Math.max(0, laplacian));

            data[(y * canvas.width + x) * 4] = laplacian; 
            data[(y * canvas.width + x) * 4 + 1] = laplacian; 
            data[(y * canvas.width + x) * 4 + 2] = laplacian; 
        }
    }
	imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
})

sharpening.addEventListener('click', () => {
	let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

	let original = new Uint8ClampedArray(data);

    const sharpeningKernel = [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
    ];

    for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
            let sharpenedR = 0,
                sharpenedG = 0,
                sharpenedB = 0;

            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const pixel = getPixel(original, x + dx, y + dy, canvas.width);
                    const weight = sharpeningKernel[dy + 1][dx + 1];
                    sharpenedR += pixel.r * weight;
                    sharpenedG += pixel.g * weight;
                    sharpenedB += pixel.b * weight;
                }
            }

            sharpenedR = Math.min(255, Math.max(0, sharpenedR));
            sharpenedG = Math.min(255, Math.max(0, sharpenedG));
            sharpenedB = Math.min(255, Math.max(0, sharpenedB));

            data[(y * canvas.width + x) * 4] = sharpenedR; 
            data[(y * canvas.width + x) * 4 + 1] = sharpenedG; 
            data[(y * canvas.width + x) * 4 + 2] = sharpenedB; 
        }
    }

	imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
})

unsharpening.addEventListener('click', () => {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    let original = new Uint8ClampedArray(data);

    const amount = 0.5; 

    let blurred = applyGaussianBlur(original, canvas.width, canvas.height);

    for (let i = 0; i < data.length; i += 4) {
        let diffR = original[i] - blurred[i];
        let diffG = original[i + 1] - blurred[i + 1];
        let diffB = original[i + 2] - blurred[i + 2];

        
        data[i] = original[i] + diffR * amount; 
        data[i + 1] = original[i + 1] + diffG * amount; 
        data[i + 2] = original[i + 2] + diffB * amount; 
    }

    ctx.putImageData(imgData, 0, 0);
});

function applyGaussianBlur(data, width, height) {
    const radius = 2;
    const sigma = 1;

    const kernel = [];
    let sum = 0;
    for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
            const weight = Math.exp(-(x ** 2 + y ** 2) / (2 * sigma ** 2));
            kernel.push(weight);
            sum += weight;
        }
    }

    for (let i = 0; i < kernel.length; i++) {
        kernel[i] /= sum;
    }

    const blurred = new Uint8ClampedArray(data.length);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;
            let k = 0;

            for (let dy = -radius; dy <= radius; dy++) {
                for (let dx = -radius; dx <= radius; dx++) {
                    const currentX = x + dx;
                    const currentY = y + dy;
                    if (currentX >= 0 && currentX < width && currentY >= 0 && currentY < height) {
                        const index = (currentY * width + currentX) * 4;
                        const weight = kernel[k];
                        r += data[index] * weight;
                        g += data[index + 1] * weight;
                        b += data[index + 2] * weight;
                    }
                    k++;
                }
            }

            const index = (y * width + x) * 4;
            blurred[index] = r;
            blurred[index + 1] = g;
            blurred[index + 2] = b;
            blurred[index + 3] = data[index + 3]; 
        }
    }

    return blurred;
}