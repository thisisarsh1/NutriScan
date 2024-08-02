import requests

# Replace with your product barcode number
product_barcode = "0737628064502"

# API URL
url = f"https://world.openfoodfacts.org/api/v0/product/{product_barcode}.json"

# Fetch the data
response = requests.get(url)

if response.status_code == 200:
    # Parse the JSON data
    data = response.json()

    # Extract specific information
    product_id = data['product'].get('_id', 'N/A')
    product_name = data['product'].get('generic_name', 'N/A')

    # Extract nutritional values if available
    nutriments = data['product'].get('nutriments', {})
    fat = nutriments.get('fat_100g', 'N/A')
    sugar = nutriments.get('sugars_100g', 'N/A')
    protein = nutriments.get('proteins_100g', 'N/A')

    # Display the extracted information
    print(f"Product ID: {product_id}")
    print(f"Product Name: {product_name}")
    print(f"Fat (per 100g): {fat} g")
    print(f"Sugar (per 100g): {sugar} g")
    print(f"Protein (per 100g): {protein} g")



else:
    print(f"Failed to retrieve data: {response.status_code}")


import json

# Load JSON data from the file
with open('server/disease_algorithm/normal_data.json', 'r') as file:
    data = json.load(file)

# Extract the recommended nutrients data
recommended_nutrients = data['diabetes']['recommended_nutrients_per_100g']

# Extract max values and store them in variables
max_sugar = recommended_nutrients['sugar']['max']
max_carbohydrates = recommended_nutrients['carbohydrates']['max']
max_fiber = recommended_nutrients['fiber']['max']
max_fat = recommended_nutrients['fat']['max']
max_protein = recommended_nutrients['protein']['max']
max_calories = recommended_nutrients['calories']['max']
max_cholesterol = recommended_nutrients['cholesterol']['max']
max_saturated_fat = recommended_nutrients['saturated_fat']['max']
max_sodium = recommended_nutrients['sodium']['max']
max_potassium = recommended_nutrients['potassium']['max']
max_vitamin_c = recommended_nutrients['vitamin_c']['max']
max_calcium = recommended_nutrients['calcium']['max']
max_iron = recommended_nutrients['iron']['max']

# Example: Printing the extracted values
print("Max Sugar:", max_sugar)
print("Max Carbohydrates:", max_carbohydrates)
print("Max Fiber:", max_fiber)
print("Max Fat:", max_fat)
print("Max Protein:", max_protein)
print("Max Calories:", max_calories)
print("Max Cholesterol:", max_cholesterol)
print("Max Saturated Fat:", max_saturated_fat)
print("Max Sodium:", max_sodium)
print("Max Potassium:", max_potassium)
print("Max Vitamin C:", max_vitamin_c)
print("Max Calcium:", max_calcium)
print("Max Iron:", max_iron)
