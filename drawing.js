function drawOnImage(image = null) {
    const canvasElement = document.getElementById("canvas");
    
    const context = canvasElement.getContext("2d");
    
    // if an image is present,
    // the image passed as a parameter is drawn in the canvas
    if (image) {
      const imageWidth = image.width;
      const imageHeight = image.height;
      // rescaling the canvas element
      canvasElement.width = imageWidth;
      canvasElement.height = imageHeight;
      context.drawImage(image, 0, 0, imageWidth, imageHeight);
    }
    
    let isDrawing;
    canvasElement.onmousedown = (e) => {
      isDrawing = true;
      context.beginPath();
      context.lineWidth = 10;
      context.strokeStyle = "black";
      context.lineJoin = "round";
      context.lineCap = "round";
      context.moveTo(e.clientX, e.clientY);
    };
    
    canvasElement.onmousemove = (e) => {
      if (isDrawing) {      
        context.lineTo(e.clientX, e.clientY);
        context.stroke();      
      }
    };
    
    canvasElement.onmouseup = function () {
      isDrawing = false;
      context.closePath();
    };
  }