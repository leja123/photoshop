function downloadModifiedImage() {
    if (canvas.toDataURL) {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'modified_image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('Your browser does not support downloading images.');
    }
}