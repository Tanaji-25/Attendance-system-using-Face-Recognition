function openRegisterPage() {
    // Your logic for opening the register page goes here
    console.log("Opening register page...");
}

document.querySelector('.custom-button').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent form submission
    captureAndSaveImage();
  });
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      captureAndSaveImage();
    }
  });
  
  async function captureAndSaveImage() {
    const nameInput = document.querySelector('input[type="text"]');
    const enteredName = nameInput.value.trim();
  
    if (enteredName === "") {
      alert("Please enter a name before capturing the image.");
      return;
    }
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement('video');
      document.body.appendChild(videoElement);
      videoElement.srcObject = stream;
      await videoElement.play();
  
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
      const capturedImage = canvas.toDataURL('image/jpeg');
  
      // Create a Blob from the data URL
      const blob = dataURItoBlob(capturedImage);
  
      // Use the File System Access API to write the image to the specified folder
      const directoryHandle = await window.showDirectoryPicker();
      const fileHandle = await directoryHandle.getFileHandle(`${enteredName}.jpg`, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
  
      // Stop the video stream and remove the video element
      stream.getVideoTracks()[0].stop();
      videoElement.remove();
    } catch (error) {
      console.error('Error accessing the camera or saving the image: ', error);
    }
  }
  
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }
  
  