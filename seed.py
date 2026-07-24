import pandas as pd
import json

# Load datasets
zepto = pd.read_csv(r'D:\comparekaro\zepto_v2.csv', encoding='latin1')
blinkit = pd.read_excel(r'D:\comparekaro\Blinkit Products.xlsx')

# Clean zepto prices (paise to rupees)
zepto['mrp'] = zepto['mrp'] / 100
zepto['discountedSellingPrice'] = zepto['discountedSellingPrice'] / 100

# Filter blinkit to food categories only
food_cats = ['Fruits & Vegetables', 'Snacks & Branded Foods', 'Beverages',
             'Bakery, Cakes & Dairy', 'Foodgrains, Oil & Masala',
             'Eggs, Meat & Fish', 'Gourmet & World Food']
blinkit_food = blinkit[blinkit['category'].isin(food_cats)].dropna(subset=['product']).reset_index(drop=True)
blinkit_food['discount'] = ((blinkit_food['market_price'] - blinkit_food['sale_price']) / blinkit_food['market_price'] * 100).round(1)

# Build keyword lookup from blinkit
blinkit_lookup = {}
for idx, row in blinkit_food.iterrows():
    words = str(row['product']).lower().split()
    for word in words:
        if len(word) > 3:
            if word not in blinkit_lookup:
                blinkit_lookup[word] = []
            blinkit_lookup[word].append(idx)

matched = []
used_blinkit = set()

for _, z_row in zepto.iterrows():
    z_name = str(z_row['name']).lower()
    z_words = [w for w in z_name.split() if len(w) > 3]

    best_idx = None
    for word in z_words:
        if word in blinkit_lookup:
            for idx in blinkit_lookup[word]:
                if idx not in used_blinkit:
                    best_idx = idx
                    break
        if best_idx:
            break

    if best_idx is not None:
        used_blinkit.add(best_idx)
        b_row = blinkit_food.iloc[best_idx]

        z_price = round(float(z_row['discountedSellingPrice']), 2)
        b_price = round(float(b_row['sale_price']), 2)
        cheaper = 'zepto' if z_price < b_price else 'blinkit' if b_price < z_price else 'both'
        savings = round(abs(z_price - b_price), 2)

        matched.append({
            "name": str(z_row['name']).encode('ascii', 'ignore').decode().strip(),
            "category": str(z_row['Category']).encode('ascii', 'ignore').decode().strip(),
            "brand": str(b_row.get('brand', '')).encode('ascii', 'ignore').decode().strip(),
            "zeptoMrp": round(float(z_row['mrp']), 2),
            "zeptoPrice": z_price,
            "zeptoDiscount": round(float(z_row['discountPercent']), 2),
            "blinkitMrp": round(float(b_row['market_price']), 2),
            "blinkitPrice": b_price,
            "blinkitDiscount": round(float(b_row['discount']), 2),
            "cheaperStore": cheaper,
            "savings": savings
        })

with open(r'D:\comparekaro\comparekaro\src\main\resources\products.json', 'w', encoding='utf-8') as f:
    json.dump(matched, f, indent=2)

print(f"Done! {len(matched)} products written to products.json")