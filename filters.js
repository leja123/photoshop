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
    ]; // 3x3 Gaussian kernel

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
            const totalWeight = 16; // sum of all weights in the kernel
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

    // Sobel operators for horizontal and vertical gradients
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

            // Compute horizontal gradient
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    gradientX += sobelX[dy + 1][dx + 1] * getPixel(original, x + dx, y + dy, canvas.width).r;
                }
            }

            // Compute vertical gradient
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    gradientY += sobelY[dy + 1][dx + 1] * getPixel(original, x + dx, y + dy, canvas.width).r;
                }
            }

            // Combine gradients to find magnitude
            let magnitude = Math.sqrt(gradientX * gradientX + gradientY * gradientY);

            // Ensure magnitude is within 0-255 range
            magnitude = Math.min(255, Math.max(0, magnitude));

            // Set pixel value to magnitude
            data[(y * canvas.width + x) * 4] = magnitude; // Red channel
            data[(y * canvas.width + x) * 4 + 1] = magnitude; // Green channel
            data[(y * canvas.width + x) * 4 + 2] = magnitude; // Blue channel
        }
    }
	imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
})

laplac.addEventListener('click', () => {
	let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

	let original = new Uint8ClampedArray(data);

    // Laplacian kernel
    const laplacianKernel = [
        [0, 1, 0],
        [1, -4, 1],
        [0, 1, 0]
    ];

    for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
            let laplacian = 0;

            // Compute Laplacian
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    laplacian += laplacianKernel[dy + 1][dx + 1] * getPixel(original, x + dx, y + dy, canvas.width).r;
                }
            }

            // Ensure Laplacian value is within 0-255 range
            laplacian = Math.min(255, Math.max(0, laplacian));

            // Set pixel value to Laplacian
            data[(y * canvas.width + x) * 4] = laplacian; // Red channel
            data[(y * canvas.width + x) * 4 + 1] = laplacian; // Green channel
            data[(y * canvas.width + x) * 4 + 2] = laplacian; // Blue channel
        }
    }
	imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
})

sharpening.addEventListener('click', () => {
	let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

	let original = new Uint8ClampedArray(data);

    // Sharpening kernel
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

            // Apply sharpening kernel
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const pixel = getPixel(original, x + dx, y + dy, canvas.width);
                    const weight = sharpeningKernel[dy + 1][dx + 1];
                    sharpenedR += pixel.r * weight;
                    sharpenedG += pixel.g * weight;
                    sharpenedB += pixel.b * weight;
                }
            }

            // Ensure sharpened values are within 0-255 range
            sharpenedR = Math.min(255, Math.max(0, sharpenedR));
            sharpenedG = Math.min(255, Math.max(0, sharpenedG));
            sharpenedB = Math.min(255, Math.max(0, sharpenedB));

            // Set pixel value to sharpened result
            data[(y * canvas.width + x) * 4] = sharpenedR; // Red channel
            data[(y * canvas.width + x) * 4 + 1] = sharpenedG; // Green channel
            data[(y * canvas.width + x) * 4 + 2] = sharpenedB; // Blue channel
        }
    }

	imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
})

unsharpening.addEventListener('click', () => {
	let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    let original = new Uint8ClampedArray(data);

    // Unsharpening kernel
    const unsharpeningKernel = [
        [0, 1, 0],
        [1, -5, 1],
        [0, 1, 0]
    ];

    for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
            let unsharpenedR = 0,
                unsharpenedG = 0,
                unsharpenedB = 0;

            // Apply unsharpening kernel
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const pixel = getPixel(original, x + dx, y + dy, canvas.width);
                    const weight = unsharpeningKernel[dy + 1][dx + 1];
                    unsharpenedR += pixel.r * weight;
                    unsharpenedG += pixel.g * weight;
                    unsharpenedB += pixel.b * weight;
                }
            }

            // Ensure unsharpened values are within 0-255 range
            unsharpenedR = Math.min(255, Math.max(0, unsharpenedR));
            unsharpenedG = Math.min(255, Math.max(0, unsharpenedG));
            unsharpenedB = Math.min(255, Math.max(0, unsharpenedB));

            // Set pixel value to unsharpened result
            data[(y * canvas.width + x) * 4] = unsharpenedR; // Red channel
            data[(y * canvas.width + x) * 4 + 1] = unsharpenedG; // Green channel
            data[(y * canvas.width + x) * 4 + 2] = unsharpenedB; // Blue channel
        }
    }

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
}) 