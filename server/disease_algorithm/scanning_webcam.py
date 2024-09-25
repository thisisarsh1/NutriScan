import cv2
import numpy as np
from pyzbar.pyzbar import decode

def live_barcode_scanner(device_index=0):
    # Open the camera
    cap = cv2.VideoCapture(device_index)

    if not cap.isOpened():
        print("Failed to capture image")
        return []

    detected_barcodes = []

    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()

        if not ret:
            print("Failed to grab frame")
            break

        # Decode barcodes in the frame
        barcodes = decode(frame)

        for barcode in barcodes:
            barcode_data = barcode.data.decode('utf-8')
            barcode_type = barcode.type

            # Add barcode data to list if not already detected
            if (barcode_data, barcode_type) not in detected_barcodes:
                detected_barcodes.append((barcode_data, barcode_type))

                # Get the location of the barcode and draw a polygon around it
                pts = barcode.polygon
                if len(pts) > 0:
                    # Draw the bounding box around the detected barcode
                    cv2.polylines(frame, [np.array(pts, dtype=np.int32)], True, (0, 255, 0), 3)

                    # Put the barcode data text on the frame
                    cv2.putText(frame, barcode_data, (pts[0][0], pts[0][1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

                # Display the frame with the detected barcode
                cv2.imshow('Barcode Scanner', frame)

                # Wait a moment to display the scanned barcode before closing
                cv2.waitKey(2000)  # Wait for 2 seconds to show the scanned barcode

                # Break the loop after detecting a barcode
                break

        # If a barcode was detected, exit the loop
        if detected_barcodes:
            break

    # Release the camera and close windows
    cap.release()
    cv2.destroyAllWindows()
    print("Camera released and windows closed.")

    # Return the detected barcodes
    return detected_barcodes

# Use device_index=2 if /dev/video2 is the correct device
barcodes = live_barcode_scanner(2)
print("Detected barcodes:", barcodes)
