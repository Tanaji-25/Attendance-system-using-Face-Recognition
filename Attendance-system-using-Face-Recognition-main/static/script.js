function captureImage() {
    const name = document.getElementById('name').value;
    if (!name) {
        alert('Please enter your name.');
        return;
    }

    // Request to capture image from the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            const video = document.createElement('video');
            document.body.appendChild(video);
            video.srcObject = stream;
            video.play();

            // Capture image from the video stream after 3 seconds
            setTimeout(function() {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageDataUrl = canvas.toDataURL('image/png');

                // Send captured image data and name to the server
                fetch('/capture', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        image: imageDataUrl
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                })
                .catch(error => {
                    console.error(error);
                });

                // Stop video stream and remove the video element
                stream.getVideoTracks()[0].stop();
                video.remove();
            }, 3000);
        })
        .catch(function(error) {
            console.error('Error accessing the camera: ', error);
        });
}
