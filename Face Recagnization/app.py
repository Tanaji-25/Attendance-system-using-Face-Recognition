from flask import Flask, render_template, request, jsonify
import cv2
import os
import uuid

app = Flask(__name__)

# Initialize video capture and face detection
video = cv2.VideoCapture(0)
facedetect = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# Create a folder to store face images
save_folder = 'images/'
if not os.path.exists(save_folder):
    os.makedirs(save_folder)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register_face():
    data = request.form
    name = data['name']
    user_id = data['id']
    
    if name and user_id:
        ret, frame = video.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = facedetect.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            crop_img = frame[y:y + h, x:x + w]
            image_filename = os.path.join(save_folder, f'{name}_{user_id}_{str(uuid.uuid4())}.jpg')
            cv2.imwrite(image_filename, crop_img)
            return jsonify({'success': True, 'message': 'Face registered successfully!'})
        else:
            return jsonify({'success': False, 'message': 'No face detected. Please try again.'})
    else:
        return jsonify({'success': False, 'message': 'Please enter name and ID.'})

if __name__ == '__main__':
    app.run(debug=True)
