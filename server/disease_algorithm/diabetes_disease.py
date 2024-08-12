import requests
import json
import os

class ProductAnalysis:
    def __init__(self, barcode):
        self.barcode = barcode
        self.product_data = {}
        self.recommended_data = {}
        self.unhealthy_reasons = []
        self.healthy_reasons = []

    def fetch_data(self):
        url = f"https://world.openfoodfacts.org/api/v0/product/{self.barcode}.json"
        print(f"Fetching data from URL: {url}")
        response = requests.get(url)

        if response.status_code == 200:
            self.product_data = response.json()
            print("API Response:", json.dumps(self.product_data, indent=2))  # Print API response for debugging
            self.load_recommended_data()
            self.analyze_product()
        else:
            print(f"Failed to retrieve data: {response.status_code}")

    def load_recommended_data(self):
        try:
            cwd = os.getcwd()
            print(f"Current Working Directory: {cwd}")
            filepath = os.path.join(cwd, 'server', 'disease_algorithm', 'normal_data.json')
            print(f"Looking for file at: {filepath}")

            with open(filepath, 'r') as file:
                self.recommended_data = json.load(file)
            print("Recommended data loaded successfully.")
        except FileNotFoundError:
            print("Error: File not found.")
        except json.JSONDecodeError:
            print("Error: Failed to decode JSON.")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

    def analyze_product(self):
        if 'product' not in self.product_data:
            print("Error: No product data available.")
            return

        nutriments = self.product_data['product'].get('nutriments', {})
        self.product_values = {
            "sugar": nutriments.get('sugars_100g', None),
            "carbohydrates": nutriments.get('carbohydrates_100g', None),
            "fiber": nutriments.get('fiber_100g', None),
            "fat": nutriments.get('fat_100g', None),
            "protein": nutriments.get('proteins_100g', None),
            "calories": nutriments.get('energy-kcal_100g', None),
            "cholesterol": nutriments.get('cholesterol_100g', None),
            "saturated_fat": nutriments.get('saturated-fat_100g', None),
            "sodium": nutriments.get('sodium_100g', None),
            "potassium": nutriments.get('potassium_100g', None),
            "vitamin_c": nutriments.get('vitamin-c_100g', None),
            "calcium": nutriments.get('calcium_100g', None),
            "iron": nutriments.get('iron_100g', None),
        }

        if not self.recommended_data:
            print("Error: No recommended data available.")
            return

        recommended_nutrients = self.recommended_data.get('diabetes', {}).get('recommended_nutrients_per_100g', {})
        if not recommended_nutrients:
            print("Error: No recommended nutrients data available.")
            return

        max_values = {key: recommended_nutrients.get(key, {}).get('max', None) for key in recommended_nutrients}
        min_values = {key: recommended_nutrients.get(key, {}).get('min', None) for key in recommended_nutrients}

        for nutrient, max_value in max_values.items():
            product_value = self.product_values.get(nutrient, None)
            min_value = min_values.get(nutrient, None)

            if max_value == "unlimited" and nutrient == "fiber":
                if product_value is not None and product_value >= min_value:
                    self.healthy_reasons.append(f"{nutrient.capitalize()} is within the recommended range ({min_value}g or more)")
                continue

            if product_value is None or max_value is None or min_value is None:
                self.unhealthy_reasons.append(f"Missing data for {nutrient}.")
                continue

            try:
                product_value = float(product_value)
                max_value = float(max_value)
                min_value = float(min_value)

                if product_value > max_value:
                    self.unhealthy_reasons.append(f"{nutrient.capitalize()} exceeds the recommended maximum ({product_value}g > {max_value}g)")
                elif product_value < min_value:
                    self.unhealthy_reasons.append(f"{nutrient.capitalize()} is below the recommended minimum ({product_value}g < {min_value}g)")
                else:
                    self.healthy_reasons.append(f"{nutrient.capitalize()} is within the recommended range ({min_value}g - {max_value}g)")
            except ValueError:
                self.unhealthy_reasons.append(f"Unable to compare {nutrient} due to incompatible data format.")

    def get_sugar(self):
        return self.product_values.get('sugar', None)

    def get_carbohydrates(self):
        return self.product_values.get('carbohydrates', None)

    def get_fiber(self):
        return self.product_values.get('fiber', None)

    def get_fat(self):
        return self.product_values.get('fat', None)

    def get_protein(self):
        return self.product_values.get('protein', None)

    def get_calories(self):
        return self.product_values.get('calories', None)

    def get_cholesterol(self):
        return self.product_values.get('cholesterol', None)

    def get_saturated_fat(self):
        return self.product_values.get('saturated_fat', None)

    def get_sodium(self):
        return self.product_values.get('sodium', None)

    def get_potassium(self):
        return self.product_values.get('potassium', None)

    def get_vitamin_c(self):
        return self.product_values.get('vitamin_c', None)

    def get_calcium(self):
        return self.product_values.get('calcium', None)

    def get_iron(self):
        return self.product_values.get('iron', None)

    def show_results(self):
        if self.unhealthy_reasons:
            return "This product is considered unhealthy."
        elif self.healthy_reasons:
            return "This product is considered healthy."
        return "You can eat this product."

    def show_reasons(self):
        reasons = []
        if self.unhealthy_reasons:
            reasons.append("Unhealthy Reasons:")
            reasons.extend([f"- {reason}" for reason in self.unhealthy_reasons])
        elif self.healthy_reasons:
            reasons.append("Healthy Reasons:")
            reasons.extend([f"- {reason}" for reason in self.healthy_reasons])
        return "\n".join(reasons)

if __name__ == '__main__':
    # Example usage
    product_barcode = "0737628064502"
    analysis = ProductAnalysis(product_barcode)
    analysis.fetch_data()

    # Print individual nutrient values using separate functions
    print(f"Sugar: {analysis.get_sugar()}")
    print(f"Carbohydrates: {analysis.get_carbohydrates()}")
    print(f"Fiber: {analysis.get_fiber()}")
    print(f"Fat: {analysis.get_fat()}")
    print(f"Protein: {analysis.get_protein()}")
    print(f"Calories: {analysis.get_calories()}")
    print(f"Cholesterol: {analysis.get_cholesterol()}")
    print(f"Saturated Fat: {analysis.get_saturated_fat()}")
    print(f"Sodium: {analysis.get_sodium()}")
    print(f"Potassium: {analysis.get_potassium()}")
    print(f"Vitamin C: {analysis.get_vitamin_c()}")
    print(f"Calcium: {analysis.get_calcium()}")
    print(f"Iron: {analysis.get_iron()}")

    print(analysis.show_results())
    print(analysis.show_reasons())
