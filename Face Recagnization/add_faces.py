import cv2
import os

# Initialize video capture and face detection
video = cv2.VideoCapture(0)
facedetect = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# Capture and store face images
name = input("Enter Your Name: ")
save_folder = 'images/'

if not os.path.exists(save_folder):
    os.makedirs(save_folder)

i = 0

while True:
    ret, frame = video.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = facedetect.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:
        crop_img = frame[y:y + h, x:x + w, :]
        resized_img = cv2.resize(crop_img, (50, 50))

        # Save the face image directly to the folder
        image_filename = os.path.join(save_folder, f'{name}_{i}.jpg')
        cv2.imwrite(image_filename, resized_img)

        i += 1
        cv2.putText(frame, str(i), (50, 50), cv2.FONT_HERSHEY_COMPLEX, 1, (50, 50, 255), 1)
        cv2.rectangle(frame, (x, y), (x + w, y + h), (50, 50, 200), 1)

    cv2.imshow("Frame", frame)
    k = cv2.waitKey(1)
    if k == ord('p') or i == 30:
        break

video.release()
cv2.destroyAllWindows()
