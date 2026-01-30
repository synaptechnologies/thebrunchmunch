 The Brunch Munch: Implementation Plan & Data Structure
1. Project Setup & Tech Stack
We will build this as a modern, fast, and mobile-first web application.

Framework: React Vite (For speed and optimized builds)
Language: JavaScript (ES6+)
Styling: CSS Modules (or Tailwind CSS) for scoped, maintainable styles.
Icons: Lucide React or FontAwesome.
Fonts: Google Fonts (e.g., Playfair Display for headings, Lato or Inter for body).
package.json Initialization
Run npm create vite@latest the-brunch-munch -- --template react, then install the following:

{
  "name": "the-brunch-munch",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "lucide-react": "^0.330.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.56",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.4"
  }
}


38. Design System & Brand Identity (V2: Premium Overhaul)
**Concept**: "Midnight Luxe". A high-contrast, expensive-looking aesthetic suitable for a $5000 website.
**Reference**: Deep greens, rich golds, and clean cream whites.

### Color Palette (CSS Variables)
```css
:root {
  /* Primary Backgrounds */
  --color-bg-dark: #0F1C15;       /* Deep Emerald/Forest Black (Hero, Footer) */
  --color-bg-light: #FBF9F4;      /* Expensive Cream/Bone (Sections) */
  --color-bg-card: #FFFFFF;       /* Pure White (Cards) */

  /* Text Colors */
  --color-text-primary: #1A1A1A;  /* Nearly Black (Body) */
  --color-text-light: #F4F1EA;    /* Off-White (On Dark Backgrounds) */
  --color-text-accent: #D4AF37;   /* Metallic Gold (Highlights, Prices) */

  /* Functional */
  --color-button-bg: #D4AF37;     /* Gold Buttons */
  --color-button-text: #0F1C15;   /* Dark Text on Gold */
  --color-border: #E5E5E5;        /* Subtle Borders */
}
```

### Typography Hierarchy
*   **Headings**: `Playfair Display` (Serif).
    *   H1: `4.5rem`, Line-height `1.1`. (Hero Title)
    *   H2: `3rem`, Italic accents. (Section Headers)
    *   H3: `1.5rem`, Uppercase tracking `2px`. (Card Titles)
*   **Body**: `Lato` or `Montserrat` (Sans-Serif).
    *   Clean, readable, generous line-height (`1.6`).

### Visual Rules (The "Premium" Feel)
1.  **Whitespace**: Double the padding. Sections should breathe.
2.  **Images**: No raw edges. either full-bleed or subtle border-radius (`4px`). Shadows should be soft and diffuse (`0 10px 30px rgba(0,0,0,0.05)`).
3.  **Buttons**: Solid Gold with sharp corners or very slight radius. Text uppercase and tracked out.
4.  **Alternating Rhythm**: Dark Section -> Light Section -> Dark Section to create depth.


Image Naming Convention (Strict)
To allow for easy database migration later and strict file management:

Take the Full Name of the item.
Remove ALL spaces.
Remove special characters (commas, parenthesis, apostrophes).
Convert to lowercase.
Use .jpg (or .png).
Examples:

Item Name: "Zircon Lunch Box"
Image Filename: zirconlunchbox.jpg
Item Name: "Small 5" Cake"
Image Filename: small5cake.jpg
Item Name: "Jollof with Chicken, Salad, Black Pepper Sauce"
Image Filename: jollofwithchickensaladblackpeppersauce.jpg


. Data Architecture (src/data/data.json)
This structure covers the entire menu provided. It is designed to be simple: an array of categories, each containing items.

Note: The id field uses the naming convention discussed above. This id will be used to fetch the correct image dynamically.


{
  "brandInfo": {
    "name": "The Brunch Munch",
    "phone": "+233 53 045 8727",
    "whatsappLink": "https://wa.me/233530458727",
    "location": "Haatso, Accra – Ghana"
  },
  "categories": [
    {
      "id": "lunch",
      "title": "Lunch Menu",
      "subCategories": [
        {
          "title": "Individual Lunch Plates",
          "type": "standard",
          "items": [
            {
              "id": "jollofwithchickensaladblackpeppersauce",
              "name": "Jollof with Chicken, Salad, Black Pepper Sauce",
              "price": 80.00,
              "description": "Classic Jollof rice served with grilled chicken, fresh salad mix, and a side of black pepper sauce."
            },
            {
              "id": "jollofwithplantainandeggchickensaladblackpeppersauce",
              "name": "Jollof (with Plantain & Egg), Chicken, Salad, Black Pepper Sauce",
              "price": 100.00,
              "description": "Classic Jollof rice topped with fried plantain and a boiled egg, served with grilled chicken, fresh salad, and black pepper sauce."
            },
            {
              "id": "friedricechickensaladshitoegg",
              "name": "Fried Rice, Chicken, Salad, Shito, Egg",
              "price": 90.00,
              "description": "Ghanaian style fried rice served with chicken, coleslaw, shito, and a boiled egg."
            },
            {
              "id": "spaghettistirfryeggssausagesveggies",
              "name": "Spaghetti Stir Fry, Eggs, Sausages, Veggies",
              "price": 80.00,
              "description": "Stir-fried spaghetti mixed with fresh vegetables, eggs, and sausages."
            },
            {
              "id": "bankutilapiamedium",
              "name": "Banku & Tilapia (Medium)",
              "price": 150.00,
              "description": "Traditional Banku served with grilled Tilapia and pepper."
            },
            {
              "id": "bankutilapialarge",
              "name": "Banku & Tilapia (Large)",
              "price": 200.00,
              "description": "Large portion of Banku served with grilled Tilapia and pepper."
            }
          ]
        },
        {
          "title": "Lunch Boxes & Baskets",
          "type": "standard",
          "items": [
            {
              "id": "zirconlunchbox",
              "name": "ZIRCON LUNCH BOX (1-2 servings)",
              "price": 380.00,
              "description": "Fried Rice or Jollof, Salad, Fried Chicken, Sausages, Fried Plantain, Donuts or Springrolls, 0.5L Juice, Apple Sauce."
            },
            {
              "id": "amberlunchbox",
              "name": "AMBER LUNCH BOX (3 servings)",
              "price": 500.00,
              "description": "Signature Jollof, Veggie Egg Fried Rice, Salad, Fried Chicken, Sausages, Tuna Sandwich, Donuts or Springrolls, 0.5L Fruit Juice, Fruits, Sauces, Fried Plantain."
            },
            {
              "id": "onyxlunchbasket",
              "name": "ONYX LUNCH BASKET (4 servings)",
              "price": 680.00,
              "description": "Signature Jollof, Veggie Egg Fried Rice, Salad, Fried Chicken, Sausages, Fried Plantain, Tuna Sandwiches, Springrolls or Donuts, Pancakes or Waffles, Syrup, Fruits, Fruit Juice, Water, Sauce."
            },
            {
              "id": "pearllunchbasket",
              "name": "PEARL LUNCH BASKET (6-8 servings)",
              "price": 900.00,
              "description": "Signature Jollof, Veggie Egg Fried Rice, Egg & Sausage Spaghetti, Salad, Fried Chicken, Sausages, Fried Plantain, Tuna Sandwiches, Pancakes or Waffles, Syrup, Springrolls or Donuts, Fruits, 1.5L Fruit Juice, Water, Sauce."
            },
            {
              "id": "opallunchbasket",
              "name": "OPAL LUNCH BASKET (12-15 servings)",
              "price": 1500.00,
              "description": "2 bowls Signature Jollof, 1 bowl Veggie Egg Fried Rice, 1 bowl Egg & Sausage Spaghetti, Salad, Fried Chicken, Sausages, Fried Plantain, Tuna Sandwiches, Pancakes or Waffles, Syrup, Springrolls or Donuts, Fruits, 2L Fruit Juice, 1 Champagne, Sauce."
            }
          ]
        }
      ]
    },
    {
      "id": "breakfast",
      "title": "Breakfast Menu",
      "subCategories": [
        {
          "title": "Breakfast Boxes & Baskets",
          "type": "standard",
          "items": [
            {
              "id": "rubybreakfastbox",
              "name": "RUBY BREAKFAST BOX (1-2 servings)",
              "price": 310.00,
              "description": "Waffles, Pancakes or Crepes, Syrup, Tuna Sandwich, Eggs, Sausage, Apple, Water, 0.5L Juice."
            },
            {
              "id": "jadebreakfastbox",
              "name": "JADE BREAKFAST BOX (3 servings)",
              "price": 460.00,
              "description": "American Doughnuts, Waffles, Pancakes or Crepes, Syrup, Sandwiches, Eggs, Sausages, Apples, 0.5L Juice, Hot Chocolate, Water."
            },
            {
              "id": "sapphirebreakfastbox",
              "name": "SAPPHIRE BREAKFAST BOX (4 servings)",
              "price": 670.00,
              "description": "Mini Burgers, Egg Wraps, American Doughnuts, Tuna Sandwich, Croissant, French Toast, Waffles, Pancakes or Crepes, Eggs, Sausages, 0.5L Juice, Water, Syrup, Apple, Hot Chocolate, Yogurt, Milo, Milk."
            }
          ]
        }
      ]
    },
    {
      "id": "cakes-desserts",
      "title": "Cakes & Desserts",
      "subCategories": [
        {
          "title": "Cakes",
          "type": "cake", 
          "items": [
            {
              "id": "small5cake",
              "name": "Small 5\" Cake",
              "price": 200.00,
              "description": "Perfect for small gatherings. Available in Vanilla, Red Velvet, Chocolate, Caramel, Strawberry.",
              "options": ["Vanilla", "Red Velvet", "Chocolate", "Caramel", "Strawberry"]
            },
            {
              "id": "6cake1flavour",
              "name": "6\" Cake (1 Flavour)",
              "price": 400.00,
              "description": "Standard 6 inch cake with one flavor selection.",
              "options": ["Vanilla", "Red Velvet", "Chocolate", "Caramel", "Strawberry"]
            },
            {
              "id": "6cake2flavours",
              "name": "6\" Cake (2 Flavours)",
              "price": 450.00,
              "description": "Standard 6 inch cake with two flavor selections.",
              "options": ["Vanilla", "Red Velvet", "Chocolate", "Caramel", "Strawberry"]
            },
            {
              "id": "8cake1flavour",
              "name": "8\" Cake (1 Flavour)",
              "price": 600.00,
              "description": "Medium 8 inch cake with one flavor selection.",
              "options": ["Vanilla", "Red Velvet", "Chocolate", "Caramel", "Strawberry"]
            },
            {
              "id": "10cake1flavour",
              "name": "10\" Cake (1 Flavour)",
              "price": 800.00,
              "description": "Large 10 inch cake with one flavor selection.",
              "options": ["Vanilla", "Red Velvet", "Chocolate", "Caramel", "Strawberry"]
            }
          ]
        },
        {
          "title": "Cake Accessories",
          "type": "standard",
          "items": [
            {
              "id": "candles",
              "name": "Candles",
              "price": 5.00
            },
            {
              "id": "flowers",
              "name": "Flowers",
              "price": 50.00
            },
            {
              "id": "edibleprintphotos",
              "name": "Edible Print/Photos",
              "price": 70.00
            }
          ]
        }
      ]
    },
    {
      "id": "finger-foods",
      "title": "Finger Foods & Platters",
      "subCategories": [
        {
          "title": "Party Platters",
          "type": "standard",
          "items": [
            {
              "id": "socialspreadbox",
              "name": "SOCIAL SPREAD BOX",
              "price": 1150.00,
              "description": "Sandwiches (8pcs), Springrolls (5pcs), Sausage Rolls (5pcs), Meat Pie (5pcs), Mini Pizza (8pcs), Chicken/Wings (10pcs), Sausage Kebab (5pcs), Cupcakes (6pcs), Samosa (5pcs)."
            },
            {
              "id": "theplatter",
              "name": "THE PARTY PLATTER (10pcs each)",
              "price": 1245.00,
              "description": "Chicken Wings, Meat Balls, Sausage Kebab, Samosa, Springrolls, Chicken Wrap."
            }
          ]
        }
      ]
    },
    {
      "id": "build-a-bite",
      "title": "Build-A-Bite",
      "subCategories": [
        {
          "title": "Custom Selection",
          "type": "builder",
          "groups": [
            {
              "groupName": "Feast Options",
              "items": [
                { "id": "chickenwrap", "name": "Chicken Wrap", "price": 0 },
                { "id": "cheeseeggwrap", "name": "Cheese Egg Wrap", "price": 0 },
                { "id": "minibeefchickenburger", "name": "Mini Beef/Chicken Burger", "price": 0 },
                { "id": "tunachickensandwich", "name": "Tuna/Chicken Sandwich", "price": 0 },
                { "id": "clubsandwich", "name": "Club Sandwich", "price": 0 }
              ]
            },
            {
              "groupName": "Savory Items",
              "items": [
                { "id": "quiche", "name": "Quiche", "price": 0 },
                { "id": "meatturnover", "name": "Meat Turnover", "price": 0 },
                { "id": "sausagerolls", "name": "Sausage Rolls", "price": 0 },
                { "id": "fishpie", "name": "Fish Pie", "price": 0 }
              ]
            },
            {
              "groupName": "Proteins (Add-ons)",
              "items": [
                { "id": "friedcalamari", "name": "Fried Calamari", "price": 0 },
                { "id": "spicywings", "name": "Spicy Wings", "price": 0 },
                { "id": "meatballs", "name": "Meat Balls", "price": 0 },
                { "id": "grilledchicken", "name": "Grilled Chicken", "price": 0 }
              ]
            }
          ]
        }
      ]
    }
  ]
}


4. Implementation Roadmap
Phase 1: Environment & Setup
Initialize React Vite.
Install Google Fonts (Playfair Display, Lato).
Create src/data/data.json and paste the content above.
Setup App.css with CSS variables for the color palette.
Phase 2: Core Components
Create Navbar.jsx (Mobile optimized).
Create Footer.jsx.
Create MenuItemCard.jsx (Reusable component for standard items).
Create CakeConfigurator.jsx (Specific logic for Cake types/options).
Create BuildABite.jsx (Checkbox/Counter logic for custom bundles).
Phase 3: Screen Development (Home Screen v2 Focus)
- **Constraint**: ALL images must be real photography. No placeholders or colored divs.
- **Home Screen Structure**:
  1. **Hero Section**: immersive, high-quality imagery.
  2. **Service Scroller (Carousel)**: Auto-scrolling, fast but readable. Items: "Lunch Served", "Take Away", "Gourmet Brunch", "Delivery", etc.
  3. **Menu Explore Carousel**:
     - Horizontal scroll with Left/Right navigation buttons.
     - Categories: Lunch Boxes, Breakfast Baskets, Cakes & Desserts, Finger Foods, etc.
     - Interaction: Clicking a category navigates to Menu Page filtered by that category.
  4. **Chef's Special (The Ultimate Sunday Brunch Box)**:
     - Prominent display.
     - **Exclusive Feature**: Direct "Add to Cart" button (only item on Home with this).
  5. **Customer Reviews**:
     - Visual "Snapshot" style reviews (Customer A, B, C).
  6. **Events We Cater For**:
     - Grid or Carousel of event types (Kids parties, Corporate, etc.).

- **Other Screens**:
  - Menu Page (Filtering logic).
  - Cart/Checkout.
  - WhatsApp Handoff.
Phase 4: Optimization & Polish
- [ ] **Scroll Animations**: Add `framer-motion` for reveal effects (fade up, stagger).
- [ ] **Parallax**: Subtle parallax on the Hero image.
- [ ] **Micro-interactions**: Hover states on cards (lift up + shadow increase).
- [ ] **Mobile Polish**: Ensure the "Premium" feel translates to mobile (no cramping).

Phase 5: Image Management (V2)
- Continue using the high-quality assets but with better framing in CSS (object-fit: cover, aspect-ratio).