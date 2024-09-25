
import cv2
from pyzbar.pyzbar import decode
import pytesseract

# Preprocess the image
def preprocess_image(image_path):
    image = cv2.imread(image_path)
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Apply thresholding or edge detection if needed
    return gray

# Detect barcode using pyzbar
def detect_barcode(image):
    barcodes = decode(image)
    barcode_info = []
    for barcode in barcodes:
        barcode_data = barcode.data.decode('utf-8')
        barcode_info.append(barcode_data)
        # Draw a rectangle around detected barcode
        (x, y, w, h) = barcode.rect
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
    return barcode_info, image

# Extract numbers beneath barcode using OCR
def extract_numbers(image):
    # Perform OCR using Tesseract
    custom_config = r'--oem 3 --psm 6'
    text = pytesseract.image_to_string(image, config=custom_config)
    return text.strip()

# Main function to run the model
def scan_barcode_and_number(image_path):
    # Step 1: Preprocess the image
    image = preprocess_image(image_path)

    # Step 2: Detect barcode
    barcode_info, processed_image = detect_barcode(image)
    print(f"Detected Barcodes: {barcode_info}")

    # Step 3: Extract numbers (OCR)
    extracted_text = extract_numbers(processed_image)
    print(f"Extracted Numbers: {extracted_text}")

# Test the model
image_path = 'khajoor.jpeg'  # Replace with the path to your image
scan_barcode_and_number(image_path)
