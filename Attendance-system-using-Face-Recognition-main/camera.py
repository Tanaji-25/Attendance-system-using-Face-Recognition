import cv2
import os

# Set the directory where you want to save the captured images
output_folder = 'C:\\Users\\ASUS\\Desktop\\Attendance-system-using-Face-Recognition-main\\Training images'

# Check if the output folder exists, if not, create it
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Initialize the webcam (you can specify a different camera index if you have multiple cameras)
cap = cv2.VideoCapture(0)

# Check if the camera is opened successfully
if not cap.isOpened():
    print("Error: Could not open camera.")
else:
    # Read a frame from the camera
    ret, frame = cap.read()

    # Display the camera window
    cv2.imshow('Camera', frame)

    # Take input for the name
    name = input("Enter your name: ")

    # Save the captured frame with the input name
    if ret:
        image_filename = os.path.join(output_folder, f'{name}.jpg')
        cv2.imwrite(image_filename, frame)
        print(f"Image captured and saved as {image_filename}")
    else:
        print("Error: Could not capture frame.")

# Release the camera and close all windows
cap.release()
cv2.destroyAllWindows()
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)
