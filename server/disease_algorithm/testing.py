from diabetes_disease import ProductAnalysis

product_barcode = "8901063363809"
analysis = ProductAnalysis(product_barcode)
analysis.fetch_data()
print(analysis.show_results())
print(analysis.show_reasons())
