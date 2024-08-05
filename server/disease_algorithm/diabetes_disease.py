import requests
import json

class ProductAnalysis:
    def __init__(self, barcode):
        self.barcode = barcode
        self.product_data = {}
        self.recommended_data = {}
        self.unhealthy_reasons = []
        self.healthy_reasons = []

    def fetch_data(self):
        url = f"https://world.openfoodfacts.org/api/v0/product/{self.barcode}.json"
        response = requests.get(url)

        if response.status_code == 200:
            self.product_data = response.json()
            self.load_recommended_data()
            self.analyze_product()
        else:
            print(f"Failed to retrieve data: {response.status_code}")

    def load_recommended_data(self):
        try:
            with open('disease_algorithm/normal_data.json', 'r') as file:
                self.recommended_data = json.load(file)
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
        product_values = {
            "sugar": nutriments.get('sugars_100g', 'N/A'),
            "carbohydrates": nutriments.get('carbohydrates_100g', 'N/A'),
            "fiber": nutriments.get('fiber_100g', 'N/A'),
            "fat": nutriments.get('fat_100g', 'N/A'),
            "protein": nutriments.get('proteins_100g', 'N/A'),
            "calories": nutriments.get('energy-kcal_100g', 'N/A'),
            "cholesterol": nutriments.get('cholesterol_100g', 'N/A'),
            "saturated_fat": nutriments.get('saturated-fat_100g', 'N/A'),
            "sodium": nutriments.get('sodium_100g', 'N/A'),
            "potassium": nutriments.get('potassium_100g', 'N/A'),
            "vitamin_c": nutriments.get('vitamin-c_100g', 'N/A'),
            "calcium": nutriments.get('calcium_100g', 'N/A'),
            "iron": nutriments.get('iron_100g', 'N/A'),
        }

        if not self.recommended_data:
            print("Error: No recommended data available.")
            return

        recommended_nutrients = self.recommended_data['diabetes']['recommended_nutrients_per_100g']

        max_values = {key: recommended_nutrients[key]['max'] for key in recommended_nutrients}
        min_values = {key: recommended_nutrients[key]['min'] for key in recommended_nutrients}

        for nutrient, max_value in max_values.items():
            product_value = product_values.get(nutrient, 'N/A')
            min_value = min_values.get(nutrient, 0)

            if max_value == "unlimited" and nutrient == "fiber":
                if product_value != 'N/A' and float(product_value) >= float(min_value):
                    self.healthy_reasons.append(f"{nutrient.capitalize()} is within the recommended range ({min_value}g or more)")
                continue

            if product_value == 'N/A':
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
    print(analysis.show_results())
    print(analysis.show_reasons())
