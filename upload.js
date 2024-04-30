const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];

    if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const img = new Image();

            img.src = event.target.result;

            img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            };
        };

        reader.readAsDataURL(file);
    } 
    else {
        alert('Please select an image file.');
    }
});