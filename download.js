function downloadModifiedImage() {
    if (canvas.toDataURL) {
        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/png');

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = dataUrl;

        // Set the download attribute with a filename
        link.download = 'modified_image.png';

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger the click event to initiate download
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
    } else {
        alert('Your browser does not support downloading images.');
    }
}