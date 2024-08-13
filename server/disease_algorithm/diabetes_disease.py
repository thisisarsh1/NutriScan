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
<<<<<<< HEAD
            # print("API Response:", json.dumps(self.product_data, indent=2))  # Print API response for debugging
=======
>>>>>>> b3d08817e518d2129c71a5aa89d68eb324bd85fd
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

        product_info = self.product_data['product']
        self.product_name = product_info.get('product_name', 'Unknown Product')
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

        def clean_value(value):
            """Remove non-numeric characters and convert to float if possible."""
            if isinstance(value, str):
                value = value.replace('g', '').replace(',', '').strip()
                try:
                    return float(value)
                except ValueError:
                    return None
            return value

        for nutrient, max_value in max_values.items():
            product_value = clean_value(product_values.get(nutrient, 'N/A'))
            min_value = clean_value(min_values.get(nutrient, 0))

            if product_value is None:
                self.unhealthy_reasons.append(f"Unable to process {nutrient} due to missing or invalid value.")
                continue

            if max_value is None or min_value is None:
                self.unhealthy_reasons.append(f"Unable to process {nutrient} due to missing recommended values.")
                continue

            if product_value > max_value:
                self.unhealthy_reasons.append(f"{nutrient.capitalize()} exceeds the recommended maximum ({product_value}g > {max_value}g)")
            elif product_value < min_value:
                self.unhealthy_reasons.append(f"{nutrient.capitalize()} is below the recommended minimum ({product_value}g < {min_value}g)")
            else:
                self.healthy_reasons.append(f"{nutrient.capitalize()} is within the recommended range ({min_value}g - {max_value}g)")

<<<<<<< HEAD
                if product_value > max_value:
                    self.unhealthy_reasons.append(f"{nutrient.capitalize()} exceeds the recommended maximum ({product_value}g > {max_value}g)")
                elif product_value < min_value:
                    self.unhealthy_reasons.append(f"{nutrient.capitalize()} is below the recommended minimum ({product_value}g < {min_value}g)")
                else:
                    self.healthy_reasons.append(f"{nutrient.capitalize()} is within the recommended range ({min_value}g - {max_value}g)")
            except ValueError:
                self.unhealthy_reasons.append(f"Unable to compare {nutrient} due to incompatible data format.")

    def get_product_name(self):
        return self.product_name if hasattr(self, 'product_name') else "Unknown Product"


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
=======
>>>>>>> b3d08817e518d2129c71a5aa89d68eb324bd85fd

    def show_results(self):
        if self.unhealthy_reasons:
            return "This product is considered unhealthy."
        elif self.healthy_reasons:
            return "This product is considered healthy."
        return "Data Not Available"

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
    product_barcode = "3017620422003"
    analysis = ProductAnalysis(product_barcode)
    analysis.fetch_data()
<<<<<<< HEAD
    print(f"Product Name: {analysis.get_product_name()}")

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

=======
>>>>>>> b3d08817e518d2129c71a5aa89d68eb324bd85fd
    print(analysis.show_results())
    print(analysis.show_reasons())
