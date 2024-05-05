const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let original = document.getElementById("original"); 
let originalImage = null;

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];

    if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const img = new Image();

            img.src = event.target.result;

            originalImage = img;

            img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            updateHistogram(histogramValues, ctx, canvas);
            };
        };

        reader.readAsDataURL(file);
    } 
    else {
        alert('Please select an image file.');
    }
});

original.addEventListener('click', () => {
    if (originalImage) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        ctx.drawImage(originalImage, 0, 0);
        updateHistogram(histogramValues, ctx, canvas);
    } else {
        alert('No original image available.');
    } 
})