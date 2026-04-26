// src/components/recipe/IngredientInput.jsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, Autocomplete, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const COMMON_INGREDIENTS = [
  // ── Alliums ──────────────────────────────────────────────────────────────
  'Garlic', 'Garlic Cloves', 'Garlic Powder', 'Roasted Garlic',
  'Onion', 'White Onion', 'Yellow Onion', 'Red Onion', 'Sweet Onion', 'Vidalia Onion',
  'Green Onion', 'Scallion', 'Chive', 'Shallot', 'Leek', 'Onion Powder',

  // ── Vegetables ───────────────────────────────────────────────────────────
  'Tomato', 'Cherry Tomato', 'Roma Tomato', 'Heirloom Tomato', 'Beefsteak Tomato',
  'Sun-Dried Tomato', 'Tomato Paste', 'Tomato Sauce', 'Crushed Tomatoes', 'Diced Tomatoes',
  'Bell Pepper', 'Red Bell Pepper', 'Green Bell Pepper', 'Yellow Bell Pepper', 'Orange Bell Pepper',
  'Jalapeño', 'Serrano Pepper', 'Habanero', 'Poblano Pepper', 'Anaheim Pepper',
  'Chipotle Pepper', 'Chipotle in Adobo', 'Banana Pepper', 'Pepperoncini',
  'Broccoli', 'Broccoli Rabe', 'Cauliflower', 'Brussels Sprouts', 'Cabbage', 'Red Cabbage', 'Savoy Cabbage',
  'Spinach', 'Baby Spinach', 'Kale', 'Curly Kale', 'Lacinato Kale', 'Swiss Chard', 'Rainbow Chard',
  'Arugula', 'Watercress', 'Romaine Lettuce', 'Iceberg Lettuce', 'Butter Lettuce', 'Mixed Greens',
  'Celery', 'Celery Root', 'Carrot', 'Baby Carrot', 'Rainbow Carrot', 'Parsnip', 'Turnip',
  'Radish', 'Daikon Radish', 'Beet', 'Golden Beet', 'Chioggia Beet',
  'Zucchini', 'Yellow Squash', 'Butternut Squash', 'Acorn Squash', 'Delicata Squash',
  'Spaghetti Squash', 'Kabocha Squash', 'Pumpkin', 'Pumpkin Puree',
  'Eggplant', 'Japanese Eggplant', 'Italian Eggplant',
  'Artichoke', 'Artichoke Heart', 'Asparagus', 'Green Beans', 'Wax Beans', 'Snap Peas', 'Snow Peas',
  'Peas', 'Frozen Peas', 'Corn', 'Corn on the Cob', 'Frozen Corn',
  'Sweet Potato', 'Russet Potato', 'Yukon Gold Potato', 'Red Potato', 'Fingerling Potato', 'Purple Potato',
  'Mushroom', 'Cremini Mushroom', 'Portobello Mushroom', 'Shiitake Mushroom',
  'Oyster Mushroom', 'Button Mushroom', 'Porcini Mushroom', 'Chanterelle', 'Morel', 'King Trumpet Mushroom',
  'Avocado', 'Cucumber', 'English Cucumber', 'Persian Cucumber', 'Fennel', 'Bok Choy', 'Baby Bok Choy',
  'Napa Cabbage', 'Endive', 'Radicchio', 'Frisée', 'Kohlrabi', 'Jicama', 'Water Chestnut',
  'Bamboo Shoot', 'Bean Sprout', 'Okra', 'Tomatillo', 'Plantain',

  // ── Fruits ───────────────────────────────────────────────────────────────
  'Lemon', 'Lime', 'Orange', 'Blood Orange', 'Grapefruit', 'Mandarin', 'Tangerine', 'Clementine',
  'Lemon Juice', 'Lime Juice', 'Orange Juice', 'Lemon Zest', 'Lime Zest', 'Orange Zest',
  'Apple', 'Granny Smith Apple', 'Honeycrisp Apple', 'Fuji Apple', 'Pear', 'Asian Pear',
  'Peach', 'Nectarine', 'Plum', 'Apricot', 'Cherry', 'Sour Cherry',
  'Mango', 'Ataulfo Mango', 'Pineapple', 'Papaya', 'Guava', 'Passion Fruit', 'Dragon Fruit',
  'Banana', 'Plantain', 'Coconut', 'Coconut Flakes', 'Shredded Coconut',
  'Strawberry', 'Blueberry', 'Raspberry', 'Blackberry', 'Cranberry', 'Dried Cranberry',
  'Grape', 'Red Grape', 'Green Grape', 'Raisin', 'Golden Raisin', 'Currant',
  'Pomegranate', 'Pomegranate Seeds', 'Watermelon', 'Cantaloupe', 'Honeydew',
  'Kiwi', 'Fig', 'Dried Fig', 'Date', 'Medjool Date', 'Prune', 'Tamarind',

  // ── Fresh Herbs ───────────────────────────────────────────────────────────
  'Fresh Basil', 'Thai Basil', 'Holy Basil',
  'Fresh Parsley', 'Flat-Leaf Parsley', 'Curly Parsley',
  'Fresh Cilantro', 'Cilantro Stems',
  'Fresh Thyme', 'Lemon Thyme',
  'Fresh Rosemary',
  'Fresh Oregano',
  'Fresh Mint', 'Spearmint', 'Peppermint',
  'Fresh Dill',
  'Fresh Sage',
  'Fresh Tarragon',
  'Bay Leaf', 'Fresh Bay Leaf', 'Dried Bay Leaf',
  'Lemongrass', 'Kaffir Lime Leaf', 'Curry Leaf',
  'Shiso', 'Perilla', 'Epazote', 'Culantro',

  // ── Dried Herbs ───────────────────────────────────────────────────────────
  'Dried Basil', 'Dried Parsley', 'Dried Thyme', 'Dried Rosemary', 'Dried Oregano',
  'Dried Mint', 'Dried Dill', 'Dried Sage', 'Dried Tarragon',
  'Italian Seasoning', 'Herbes de Provence', 'Bouquet Garni', 'Poultry Seasoning',
  'Fines Herbes', 'Dried Marjoram',

  // ── Spices ────────────────────────────────────────────────────────────────
  'Kosher Salt', 'Sea Salt', 'Flaky Sea Salt', 'Table Salt', 'Pink Himalayan Salt',
  'Black Pepper', 'Freshly Ground Black Pepper', 'White Pepper', 'Green Peppercorn',
  'Red Pepper Flakes', 'Cayenne Pepper', 'Chili Powder', 'Ancho Chili Powder',
  'Cumin', 'Ground Cumin', 'Cumin Seeds', 'Toasted Cumin',
  'Coriander', 'Ground Coriander', 'Coriander Seeds',
  'Paprika', 'Sweet Paprika', 'Smoked Paprika', 'Hot Paprika', 'Hungarian Paprika',
  'Turmeric', 'Ground Turmeric',
  'Garam Masala', 'Curry Powder', 'Madras Curry Powder', 'Vadouvan',
  'Cinnamon', 'Ground Cinnamon', 'Cinnamon Stick', 'Ceylon Cinnamon',
  'Nutmeg', 'Ground Nutmeg', 'Mace',
  'Allspice', 'Ground Allspice', 'Cloves', 'Ground Cloves',
  'Cardamom', 'Ground Cardamom', 'Green Cardamom Pod', 'Black Cardamom',
  'Star Anise', 'Fennel Seeds', 'Caraway Seeds', 'Nigella Seeds', 'Celery Seeds',
  'Mustard Seeds', 'Yellow Mustard Seeds', 'Black Mustard Seeds', 'Mustard Powder',
  'Garlic Powder', 'Onion Powder', 'Celery Salt', 'Onion Salt',
  'Old Bay Seasoning', 'Cajun Seasoning', 'Creole Seasoning', 'Blackening Seasoning',
  'Za\'atar', 'Sumac', 'Ras el Hanout', 'Baharat', 'Harissa Powder',
  'Five Spice Powder', 'Chinese Five Spice', 'Szechuan Pepper',
  'Saffron', 'Vanilla Bean', 'Vanilla Powder',
  'Asafoetida', 'Amchur', 'Chaat Masala', 'Tandoori Masala',
  'Lemon Pepper', 'Everything Bagel Seasoning', 'Smoked Salt',
  'Annatto', 'Achiote Powder', 'Chipotle Powder', 'Espelette Pepper',
  'Fenugreek', 'Ground Fenugreek', 'Fenugreek Seeds',
  'Dried Ginger', 'Ground Ginger',

  // ── Proteins – Poultry ────────────────────────────────────────────────────
  'Chicken Breast', 'Boneless Skinless Chicken Breast', 'Chicken Thigh',
  'Boneless Skinless Chicken Thigh', 'Chicken Drumstick', 'Chicken Wing',
  'Whole Chicken', 'Ground Chicken', 'Chicken Tenderloin', 'Rotisserie Chicken',
  'Turkey Breast', 'Ground Turkey', 'Turkey Thigh', 'Whole Turkey', 'Turkey Bacon',
  'Duck Breast', 'Duck Leg', 'Duck Confit', 'Whole Duck',
  'Cornish Hen', 'Quail', 'Goose',

  // ── Proteins – Beef ───────────────────────────────────────────────────────
  'Ground Beef', 'Lean Ground Beef',
  'Ribeye Steak', 'New York Strip', 'Sirloin Steak', 'T-Bone Steak', 'Porterhouse Steak',
  'Filet Mignon', 'Flank Steak', 'Skirt Steak', 'Hanger Steak', 'Flat Iron Steak',
  'Beef Chuck', 'Chuck Roast', 'Beef Brisket', 'Beef Short Rib', 'Oxtail',
  'Beef Tenderloin', 'Prime Rib', 'Beef Shank', 'Beef Stew Meat',
  'Corned Beef', 'Pastrami',

  // ── Proteins – Pork ───────────────────────────────────────────────────────
  'Pork Shoulder', 'Pork Butt', 'Pork Tenderloin', 'Pork Chop', 'Pork Loin',
  'Pork Belly', 'Baby Back Ribs', 'St. Louis Ribs', 'Spare Ribs',
  'Ground Pork', 'Pulled Pork', 'Ham', 'Ham Hock', 'Prosciutto', 'Pancetta',
  'Bacon', 'Canadian Bacon', 'Guanciale', 'Lardo',
  'Chorizo', 'Mexican Chorizo', 'Spanish Chorizo', 'Longaniza',
  'Italian Sausage', 'Mild Italian Sausage', 'Hot Italian Sausage',
  'Andouille Sausage', 'Kielbasa', 'Bratwurst', 'Merguez', 'Breakfast Sausage',

  // ── Proteins – Lamb & Game ────────────────────────────────────────────────
  'Lamb Chop', 'Lamb Rack', 'Lamb Shoulder', 'Lamb Leg', 'Ground Lamb', 'Lamb Shank',
  'Veal', 'Veal Cutlet', 'Veal Chop', 'Venison', 'Bison', 'Wild Boar', 'Rabbit',

  // ── Proteins – Seafood ────────────────────────────────────────────────────
  'Salmon', 'King Salmon', 'Atlantic Salmon', 'Smoked Salmon', 'Lox',
  'Tuna', 'Ahi Tuna', 'Canned Tuna', 'Albacore Tuna',
  'Cod', 'Black Cod', 'Halibut', 'Sea Bass', 'Chilean Sea Bass', 'Striped Bass',
  'Tilapia', 'Mahi Mahi', 'Snapper', 'Red Snapper', 'Flounder', 'Sole', 'Turbot',
  'Trout', 'Rainbow Trout', 'Arctic Char', 'Catfish', 'Pollock', 'Haddock',
  'Sardine', 'Anchovy', 'Swordfish', 'Monkfish', 'Grouper', 'Branzino',
  'Shrimp', 'Large Shrimp', 'Jumbo Shrimp', 'Tiger Prawn', 'Rock Shrimp',
  'Scallop', 'Bay Scallop', 'Sea Scallop',
  'Lobster', 'Lobster Tail', 'Crab', 'Dungeness Crab', 'King Crab', 'Blue Crab', 'Crab Cake',
  'Clam', 'Littleneck Clam', 'Cherrystone Clam', 'Cockle',
  'Mussel', 'Blue Mussel', 'New Zealand Green-Lipped Mussel',
  'Oyster', 'Squid', 'Calamari', 'Octopus', 'Cuttlefish',
  'Eel', 'Unagi',

  // ── Eggs & Plant Proteins ─────────────────────────────────────────────────
  'Egg', 'Large Egg', 'Egg Yolk', 'Egg White', 'Hard-Boiled Egg', 'Quail Egg',
  'Tofu', 'Firm Tofu', 'Extra-Firm Tofu', 'Silken Tofu', 'Soft Tofu',
  'Tempeh', 'Seitan', 'Edamame', 'TVP',
  'Lentils', 'Red Lentils', 'Green Lentils', 'Black Lentils', 'French Lentils', 'Brown Lentils',
  'Black Beans', 'Kidney Beans', 'Red Kidney Beans', 'Pinto Beans', 'Cannellini Beans',
  'Chickpeas', 'Garbanzo Beans', 'Navy Beans', 'Great Northern Beans', 'Fava Beans',
  'Lima Beans', 'Butter Beans', 'Adzuki Beans', 'Mung Beans', 'Black-Eyed Peas',
  'Split Peas', 'Yellow Split Peas', 'Green Split Peas',

  // ── Dairy ─────────────────────────────────────────────────────────────────
  'Unsalted Butter', 'Salted Butter', 'European Butter', 'Brown Butter', 'Clarified Butter', 'Ghee',
  'Whole Milk', '2% Milk', 'Skim Milk', 'Oat Milk', 'Almond Milk', 'Soy Milk', 'Coconut Milk',
  'Half-and-Half', 'Heavy Cream', 'Heavy Whipping Cream', 'Light Cream', 'Whipping Cream',
  'Sour Cream', 'Crème Fraîche', 'Buttermilk', 'Evaporated Milk', 'Sweetened Condensed Milk',
  'Plain Yogurt', 'Greek Yogurt', 'Whole Milk Yogurt', 'Skyr', 'Kefir',
  'Cheddar Cheese', 'Sharp Cheddar', 'Mild Cheddar', 'White Cheddar',
  'Mozzarella', 'Fresh Mozzarella', 'Burrata', 'Stracciatella',
  'Parmesan', 'Parmigiano-Reggiano', 'Grana Padano', 'Pecorino Romano', 'Pecorino Sardo',
  'Gruyère', 'Emmental', 'Swiss Cheese', 'Raclette', 'Comté',
  'Provolone', 'Fontina', 'Taleggio', 'Asiago',
  'Brie', 'Camembert', 'Triple Crème Brie',
  'Goat Cheese', 'Chèvre', 'Aged Goat Cheese',
  'Feta Cheese', 'Ricotta', 'Whole Milk Ricotta', 'Ricotta Salata',
  'Cream Cheese', 'Neufchâtel', 'Mascarpone', 'Cottage Cheese',
  'Blue Cheese', 'Gorgonzola', 'Roquefort', 'Stilton', 'Maytag Blue',
  'Manchego', 'Mahon', 'Iberico', 'Halloumi',
  'Queso Fresco', 'Queso Blanco', 'Queso Oaxaca', 'Cotija', 'Paneer',

  // ── Grains, Flour & Pasta ─────────────────────────────────────────────────
  'All-Purpose Flour', 'Bread Flour', 'Whole Wheat Flour', 'Cake Flour', 'Pastry Flour',
  'Self-Rising Flour', 'Semolina Flour', 'Durum Flour', 'Flour',
  'Almond Flour', 'Oat Flour', 'Coconut Flour', 'Rice Flour', 'Tapioca Flour',
  'Chickpea Flour', 'Spelt Flour', 'Rye Flour', 'Buckwheat Flour', 'Cornmeal', 'Polenta',
  'Cornstarch', 'Arrowroot',
  'White Rice', 'Brown Rice', 'Jasmine Rice', 'Basmati Rice', 'Arborio Rice',
  'Sushi Rice', 'Wild Rice', 'Black Rice', 'Red Rice', 'Forbidden Rice',
  'Quinoa', 'Farro', 'Freekeh', 'Barley', 'Pearl Barley', 'Bulgur', 'Couscous',
  'Israeli Couscous', 'Millet', 'Teff', 'Amaranth', 'Sorghum',
  'Rolled Oats', 'Old-Fashioned Oats', 'Steel Cut Oats', 'Quick Oats', 'Oat Bran',
  'Spaghetti', 'Spaghettini', 'Fettuccine', 'Linguine', 'Tagliatelle', 'Pappardelle',
  'Penne', 'Rigatoni', 'Ziti', 'Fusilli', 'Rotini', 'Farfalle', 'Gemelli',
  'Orecchiette', 'Cavatappi', 'Campanelle', 'Paccheri',
  'Lasagna Noodles', 'Manicotti', 'Cannelloni', 'Shells', 'Jumbo Shells',
  'Ravioli', 'Tortellini', 'Tortelloni', 'Gnocchi',
  'Angel Hair Pasta', 'Capellini', 'Orzo', 'Ditalini', 'Acini di Pepe',
  'Rice Noodles', 'Glass Noodles', 'Cellophane Noodles', 'Ramen Noodles',
  'Udon Noodles', 'Soba Noodles', 'Somen Noodles', 'Lo Mein Noodles', 'Pad Thai Noodles',
  'Bread', 'Sourdough', 'Baguette', 'Ciabatta', 'Focaccia', 'Brioche',
  'Pita Bread', 'Naan', 'Lavash', 'Tortilla', 'Flour Tortilla', 'Corn Tortilla',
  'Panko Breadcrumbs', 'Plain Breadcrumbs', 'Italian Breadcrumbs', 'Croutons',
  'Graham Cracker', 'Phyllo Dough', 'Puff Pastry', 'Pie Crust',

  // ── Oils ─────────────────────────────────────────────────────────────────
  'Olive Oil', 'Extra Virgin Olive Oil', 'Light Olive Oil',
  'Vegetable Oil', 'Canola Oil', 'Sunflower Oil', 'Safflower Oil',
  'Coconut Oil', 'Refined Coconut Oil', 'Avocado Oil', 'Grapeseed Oil',
  'Peanut Oil', 'Sesame Oil', 'Toasted Sesame Oil', 'Chili Oil',
  'Walnut Oil', 'Truffle Oil', 'White Truffle Oil', 'Black Truffle Oil',
  'Cooking Spray', 'Nonstick Spray',

  // ── Vinegars ─────────────────────────────────────────────────────────────
  'Balsamic Vinegar', 'White Balsamic Vinegar', 'Aged Balsamic Vinegar',
  'Red Wine Vinegar', 'White Wine Vinegar', 'Champagne Vinegar',
  'Apple Cider Vinegar', 'Rice Vinegar', 'Seasoned Rice Vinegar',
  'Sherry Vinegar', 'Malt Vinegar', 'Distilled White Vinegar',

  // ── Sauces & Condiments ───────────────────────────────────────────────────
  'Soy Sauce', 'Low-Sodium Soy Sauce', 'Tamari', 'Coconut Aminos',
  'Fish Sauce', 'Oyster Sauce', 'Hoisin Sauce', 'Teriyaki Sauce',
  'Ponzu', 'Black Bean Sauce', 'XO Sauce',
  'Worcestershire Sauce', 'Hot Sauce', 'Sriracha', 'Tabasco', 'Frank\'s RedHot',
  'Sambal Oelek', 'Gochujang', 'Doubanjiang', 'Chili Garlic Sauce',
  'Ketchup', 'Mustard', 'Yellow Mustard', 'Dijon Mustard', 'Whole Grain Mustard', 'Honey Mustard',
  'Mayonnaise', 'Hellmann\'s', 'Duke\'s Mayo',
  'Tahini', 'Hummus', 'Harissa', 'Chermoula',
  'Miso Paste', 'White Miso', 'Red Miso', 'Yellow Miso', 'Barley Miso',
  'Tomato Puree', 'Pesto', 'Basil Pesto', 'Sun-Dried Tomato Pesto',
  'Tzatziki', 'Ranch Dressing', 'Caesar Dressing', 'Balsamic Glaze',
  'Horseradish', 'Prepared Horseradish', 'Wasabi', 'Wasabi Paste',
  'Capers', 'Caper Brine', 'Anchovies', 'Anchovy Paste', 'Miso',

  // ── Sweeteners ───────────────────────────────────────────────────────────
  'Granulated Sugar', 'White Sugar', 'Superfine Sugar', 'Caster Sugar',
  'Brown Sugar', 'Light Brown Sugar', 'Dark Brown Sugar',
  'Powdered Sugar', 'Confectioners\' Sugar', 'Raw Sugar', 'Turbinado Sugar', 'Demerara Sugar',
  'Honey', 'Raw Honey', 'Manuka Honey', 'Clover Honey',
  'Maple Syrup', 'Grade A Maple Syrup', 'Dark Maple Syrup',
  'Agave Nectar', 'Light Agave', 'Molasses', 'Blackstrap Molasses',
  'Corn Syrup', 'Light Corn Syrup', 'Dark Corn Syrup',
  'Coconut Sugar', 'Date Sugar', 'Palm Sugar', 'Jaggery',
  'Stevia', 'Monk Fruit Sweetener', 'Erythritol', 'Xylitol',

  // ── Baking ────────────────────────────────────────────────────────────────
  'Baking Soda', 'Baking Powder', 'Double-Acting Baking Powder',
  'Active Dry Yeast', 'Instant Yeast', 'Fresh Yeast',
  'Cream of Tartar',
  'Vanilla Extract', 'Pure Vanilla Extract', 'Vanilla Bean Paste', 'Almond Extract',
  'Peppermint Extract', 'Lemon Extract', 'Orange Extract', 'Rose Water', 'Orange Blossom Water',
  'Cocoa Powder', 'Dutch-Process Cocoa', 'Natural Cocoa Powder', 'Black Cocoa',
  'Dark Chocolate', '70% Dark Chocolate', '85% Dark Chocolate',
  'Semi-Sweet Chocolate', 'Bittersweet Chocolate', 'Milk Chocolate', 'White Chocolate',
  'Chocolate Chips', 'Semi-Sweet Chips', 'Dark Chocolate Chips', 'Mini Chocolate Chips',
  'Unsweetened Chocolate', 'Cacao Nibs', 'Cacao Powder',
  'Gelatin', 'Unflavored Gelatin', 'Agar-Agar', 'Pectin',
  'Leavening Agent', 'Xanthan Gum',

  // ── Nuts & Seeds ─────────────────────────────────────────────────────────
  'Almonds', 'Sliced Almonds', 'Slivered Almonds', 'Blanched Almonds',
  'Walnuts', 'Pecans', 'Cashews', 'Pistachios', 'Hazelnuts', 'Macadamia Nuts',
  'Pine Nuts', 'Peanuts', 'Brazil Nuts', 'Chestnuts',
  'Sesame Seeds', 'White Sesame Seeds', 'Black Sesame Seeds', 'Toasted Sesame Seeds',
  'Sunflower Seeds', 'Pumpkin Seeds', 'Pepitas', 'Chia Seeds', 'Flaxseed', 'Ground Flaxseed',
  'Hemp Seeds', 'Poppy Seeds',
  'Peanut Butter', 'Natural Peanut Butter', 'Almond Butter', 'Cashew Butter',
  'Sunflower Butter', 'Hazelnut Spread', 'Tahini',

  // ── Stocks, Broths & Liquids ──────────────────────────────────────────────
  'Chicken Stock', 'Homemade Chicken Stock', 'Chicken Broth', 'Low-Sodium Chicken Broth',
  'Beef Stock', 'Beef Broth', 'Low-Sodium Beef Broth',
  'Vegetable Stock', 'Vegetable Broth', 'Mushroom Broth', 'Dashi', 'Bonito Flakes', 'Kombu',
  'Fish Stock', 'Clam Juice', 'Lobster Stock',
  'Red Wine', 'Dry Red Wine', 'White Wine', 'Dry White Wine', 'Sparkling Wine', 'Champagne',
  'Beer', 'Lager', 'Ale', 'Stout', 'Porter',
  'Sake', 'Mirin', 'Rice Wine', 'Shaoxing Wine', 'Dry Sherry', 'Marsala Wine',
  'Brandy', 'Cognac', 'Bourbon', 'Rum', 'Vodka', 'Gin',
  'Water', 'Sparkling Water', 'Club Soda', 'Coconut Water',
  'Apple Cider', 'Hard Cider',

  // ── Canned & Jarred ───────────────────────────────────────────────────────
  'Canned Chickpeas', 'Canned Black Beans', 'Canned Kidney Beans', 'Canned White Beans',
  'Canned Lentils', 'Canned Corn', 'Canned Artichoke Hearts',
  'Canned Coconut Milk', 'Lite Coconut Milk', 'Coconut Cream',
  'Olives', 'Kalamata Olives', 'Green Olives', 'Castelvetrano Olives', 'Niçoise Olives',
  'Roasted Red Peppers', 'Pickled Jalapeños', 'Giardiniera', 'Pickles', 'Dill Pickles',
  'Capers', 'Caper Berries', 'Preserved Lemon', 'Peppadew Peppers',
  'Jackfruit', 'Canned Pumpkin', 'Canned Pineapple',

  // ── Asian Pantry ──────────────────────────────────────────────────────────
  'Ginger', 'Fresh Ginger', 'Pickled Ginger', 'Crystallized Ginger', 'Galangal',
  'Turmeric Root', 'Nori', 'Wakame', 'Hijiki', 'Kelp', 'Dulse',
  'Doenjang', 'Korean Chili Paste', 'Doenjang Paste',
  'Red Curry Paste', 'Green Curry Paste', 'Yellow Curry Paste', 'Massaman Curry Paste',
  'Panang Curry Paste',
  'Oyster Mushroom Sauce', 'Kecap Manis', 'Shrimp Paste', 'Belachan',
  'Furikake', 'Togarashi', 'Shichimi Togarashi',
  'Kimchi', 'Mirin', 'Sake',

  // ── Latin & Mexican Pantry ────────────────────────────────────────────────
  'Dried Ancho Chile', 'Dried Guajillo Chile', 'Dried Pasilla Chile', 'Dried Mulato Chile',
  'Dried Cascabel Chile', 'Dried New Mexico Chile', 'Dried Arbol Chile',
  'Adobo Sauce', 'Sofrito', 'Sazón', 'Culantro',
  'Masa Harina', 'Hominy', 'Tomatillo',
  'Mexican Crema', 'Queso Fresco', 'Cotija',

  // ── Middle Eastern & Mediterranean Pantry ────────────────────────────────
  'Tahini', 'Pomegranate Molasses', 'Rose Water', 'Orange Blossom Water',
  'Filo Dough', 'Phyllo Dough', 'Labneh',
  'Dried Apricot', 'Preserved Lemon', 'Harissa', 'Chermoula', 'Dukkah',
  'Pine Nuts', 'Pistachios',

  // ── Misc & Pantry Staples ─────────────────────────────────────────────────
  'Salt and Pepper', 'Toothpick', 'Ice',
];

const IngredientInput = ({
  ingredient,
  onChange,
  onRemove,
  availableIngredients = []
}) => {
  const [inputValues, setInputValues] = useState({
    name: ingredient.name || '',
    quantity: ingredient.quantity || '',
    unit: ingredient.unit || ''
  });

  const mergedIngredientNames = React.useMemo(() => {
    const backendNames = availableIngredients.map(ing => ing.name);
    const combined = [...new Set([...COMMON_INGREDIENTS, ...backendNames])];
    return combined.sort((a, b) => a.localeCompare(b));
  }, [availableIngredients]);

  useEffect(() => {
    onChange({
      ...ingredient,
      name: inputValues.name,
      quantity: inputValues.quantity,
      unit: inputValues.unit
    });
  }, [inputValues]);

  const handleChange = (field, value) => {
    setInputValues(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <TextField
        size="small"
        label="Amount"
        value={inputValues.quantity}
        onChange={(e) => handleChange('quantity', e.target.value)}
        sx={{ width: '20%', mr: 1 }}
        type="number"
        inputProps={{ min: 0, step: 0.25 }}
      />

      <TextField
        size="small"
        label="Unit"
        value={inputValues.unit}
        onChange={(e) => handleChange('unit', e.target.value)}
        sx={{ width: '20%', mr: 1 }}
        placeholder="cups, tbsp, g"
      />

      <Autocomplete
        freeSolo
        size="small"
        options={mergedIngredientNames}
        value={inputValues.name}
        onChange={(_, newValue) => handleChange('name', newValue || '')}
        onInputChange={(_, newValue) => handleChange('name', newValue)}
        filterOptions={(options, state) => {
          if (!state.inputValue) return options.slice(0, 50);
          const input = state.inputValue.toLowerCase();
          return options.filter(o => o.toLowerCase().includes(input)).slice(0, 50);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Ingredient" placeholder="Start typing..." />
        )}
        sx={{ flexGrow: 1 }}
      />

      <IconButton color="error" onClick={onRemove} sx={{ ml: 1 }} aria-label="remove ingredient">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default IngredientInput;