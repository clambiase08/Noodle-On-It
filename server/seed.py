#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import *


if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        Ingredient.query.delete()
        Quantity.query.delete()
        Dish.query.delete()
        Collection.query.delete()
        User.query.delete()
        Note.query.delete()

        fake = Faker()

        user_list = [
            {
                "username": "yonir",
                "password": "nottellingyou",
                "email": "fakeemail@email.com",
            },
            {
                "username": "xtina",
                "password": "nuh-uh",
                "email": "anotherfakeemail@email.com",
            },
        ]

        for user in user_list:
            new_user = User(
                username=user["username"],
                _password_hash=user["password"],
                email=user["email"],
            )
            db.session.add(new_user)
            db.session.commit()

        dish_list = [
            {
                "dish_name": "Spaghetti Bolognese",
                "user_id": 1,
                "instructions": "1. Heat oil in a pan. 2. Add onions and garlic. 3. Brown ground beef. 4. Add tomatoes and herbs. 5. Simmer for 30 minutes. 6. Cook spaghetti. 7. Serve sauce over spaghetti.",
                "image": None,
                "time_to_cook": 45,
                "time_to_prepare": 15,
            },
            {
                "dish_name": "Chicken Stir-Fry",
                "user_id": 1,
                "instructions": "1. Marinate chicken in soy sauce. 2. Heat oil in a wok. 3. Stir-fry vegetables. 4. Add chicken. 5. Add stir-fry sauce. 6. Serve over rice.",
                "image": None,
                "time_to_cook": 20,
                "time_to_prepare": 10,
            },
            {
                "dish_name": "Vegetable Curry",
                "user_id": 1,
                "instructions": "1. Sauté onions and garlic. 2. Add curry paste and vegetables. 3. Add coconut milk. 4. Simmer for 20 minutes. 5. Serve with rice or naan.",
                "image": None,
                "time_to_cook": 30,
                "time_to_prepare": 15,
            },
            {
                "dish_name": "Grilled Cheese Sandwich",
                "user_id": 1,
                "instructions": "1. Butter bread slices. 2. Add cheese between slices. 3. Heat pan and grill sandwich until cheese melts and bread is golden.",
                "image": None,
                "time_to_cook": 10,
                "time_to_prepare": 5,
            },
            {
                "dish_name": "Caesar Salad",
                "user_id": 2,
                "instructions": "1. Toss lettuce, croutons, and Parmesan. 2. Whisk together dressing ingredients. 3. Drizzle dressing over salad. 4. Top with grilled chicken if desired.",
                "image": None,
                "time_to_cook": 0,
                "time_to_prepare": 15,
            },
            {
                "dish_name": "Chocolate Brownies",
                "user_id": 2,
                "instructions": "1. Melt butter and chocolate. 2. Beat eggs and sugar. 3. Mix dry ingredients. 4. Combine wet and dry mixtures. 5. Bake in a preheated oven.",
                "image": None,
                "time_to_cook": 25,
                "time_to_prepare": 15,
            },
            {
                "dish_name": "Homemade Pizza",
                "user_id": 2,
                "instructions": "1. Roll out pizza dough. 2. Spread sauce and toppings. 3. Bake in a preheated oven until crust is golden and cheese is bubbly.",
                "image": None,
                "time_to_cook": 15,
                "time_to_prepare": 20,
            },
            {
                "dish_name": "Fruit Smoothie",
                "user_id": 2,
                "instructions": "1. Blend fruits, yogurt, and juice. 2. Add honey or sweetener if desired. 3. Blend until smooth and creamy.",
                "image": None,
                "time_to_cook": 0,
                "time_to_prepare": 5,
            },
            {
                "dish_name": "Beef Tacos",
                "user_id": 2,
                "instructions": "1. Brown ground beef. 2. Add taco seasoning and water. 3. Warm taco shells. 4. Assemble tacos with beef, lettuce, cheese, and salsa.",
                "image": None,
                "time_to_cook": 15,
                "time_to_prepare": 10,
            },
            {
                "dish_name": "Pasta Alfredo",
                "user_id": 2,
                "instructions": "1. Cook pasta until al dente. 2. Melt butter and garlic. 3. Add heavy cream and Parmesan. 4. Toss cooked pasta in the sauce. 5. Season with salt and pepper.",
                "image": None,
                "time_to_cook": 20,
                "time_to_prepare": 10,
            },
        ]

        for dish in dish_list:
            new_dish = Dish(
                dish_name=dish["dish_name"],
                user_id=dish["user_id"],
                instructions=dish["instructions"],
                time_to_cook=dish["time_to_cook"],
                time_to_prepare=dish["time_to_prepare"],
                image=dish["image"],
            )
            db.session.add(new_dish)
            db.session.commit()

        collection_list = [
            {"user_id": 1, "name": "all"},
            {"user_id": 2, "name": "all"},
            {"user_id": 1, "name": "favorites"},
            {"user_id": 2, "name": "favorites"},
            {"user_id": 1, "name": "weekend"},
        ]

        note_list = []
        for _ in range(len(dish_list)):
            collection_id = randint(1, 5)
            dish_id = randint(1, 10)
            # notes = f"{fake.sentence()}"

            note = Note(
                collection_id=collection_id, dish_id=dish_id, notes=fake.sentence()
            )
            db.session.add(note)
            db.session.commit()
            note_list.append(note)

        ingredient_list = [
            "Salt",
            "Pepper",
            "Olive oil",
            "Garlic",
            "Onion",
            "Tomato",
            "Chicken",
            "Beef",
            "Rice",
            "Pasta",
            "Carrot",
            "Broccoli",
            "Spinach",
            "Potato",
            "Bell pepper",
            "Lemon",
            "Lime",
            "Cilantro",
            "Basil",
            "Oregano",
            "Thyme",
            "Rosemary",
            "Parsley",
            "Cheddar cheese",
            "Mozzarella cheese",
            "Parmesan cheese",
            "Butter",
            "Milk",
            "Eggs",
            "Flour",
            "Sugar",
            "Honey",
            "Soy sauce",
            "Worcestershire sauce",
            "Mustard",
            "Ketchup",
            "Mayonnaise",
            "Vinegar",
            "Balsamic vinegar",
            "Red wine vinegar",
            "White wine vinegar",
            "Apple cider vinegar",
            "Ground beef",
            "Ground turkey",
            "Shrimp",
            "Salmon",
            "Tuna",
            "Avocado",
            "Salsa",
            "Sour cream",
            "Yogurt",
            "Cumin",
            "Paprika",
            "Coriander",
            "Chili powder",
            "Turmeric",
            "Ginger",
            "Cinnamon",
            "Nutmeg",
            "Cardamom",
            "Cloves",
            "Bay leaves",
            "Nutritional yeast",
            "Sunflower oil",
            "Sesame oil",
            "Peanut oil",
            "Coconut oil",
            "Almonds",
            "Walnuts",
            "Pecans",
            "Cashews",
            "Pistachios",
            "Sunflower seeds",
            "Pumpkin seeds",
            "Flaxseeds",
            "Chia seeds",
            "Quinoa",
            "Lentils",
            "Chickpeas",
            "Black beans",
            "Kidney beans",
            "Green beans",
            "Corn",
            "Peas",
            "Asparagus",
            "Zucchini",
            "Eggplant",
            "Cauliflower",
            "Brussels sprouts",
            "Cabbage",
            "Radish",
            "Beets",
            "Turnip",
            "Pumpkin",
            "Cucumber",
            "Green onion",
            "Scallion",
            "Shallots",
            "Red onion",
            "Sweet potato",
            "Bok choy",
            "Snow peas",
            "Leeks",
            "Kale",
            "Swiss chard",
            "Collard greens",
            "Arugula",
            "Romaine lettuce",
            "Iceberg lettuce",
            "Watercress",
            "Radicchio",
            "Fennel",
            "Celery",
            "Chives",
            "Sage",
            "Dill",
            "Mint",
            "Tarragon",
            "Red pepper flakes",
            "Black pepper",
            "White pepper",
            "Allspice",
            "Poppy seeds",
            "Couscous",
            "Farro",
            "Bulgur",
            "Millet",
            "Buckwheat",
            "Amaranth",
            "Polenta",
            "Grits",
            "Tortillas",
            "Whole wheat bread",
            "White bread",
            "Baguette",
            "Pita bread",
            "Rye bread",
            "Sourdough bread",
            "Cornbread",
            "Croissant",
            "Biscuits",
            "Pancakes",
            "Waffles",
            "Spaghetti",
            "Fettuccine",
            "Penne",
            "Linguine",
            "Rigatoni",
            "Lasagna",
            "Ravioli",
            "Tortellini",
            "Macaroni",
            "Angel hair pasta",
            "Udon noodles",
            "Rice noodles",
            "Ramen noodles",
            "Egg noodles",
            "Vermicelli",
            "Soba noodles",
            "Whole wheat pasta",
            "Macadamia nuts",
            "Brazil nuts",
            "Hazelnuts",
            "Pine nuts",
            "Peanuts",
            "Coconut",
            "Raisins",
            "Cranberries",
            "Blueberries",
            "Strawberries",
            "Blackberries",
            "Raspberries",
            "Cherries",
            "Apples",
            "Pears",
            "Oranges",
            "Mandarins",
            "Grapefruit",
            "Lemons",
            "Limes",
            "Bananas",
            "Pineapple",
            "Mangoes",
            "Papaya",
            "Kiwi",
            "Watermelon",
            "Cantaloupe",
            "Honeydew",
            "Peaches",
            "Nectarines",
            "Plums",
            "Apricots",
            "Dates",
            "Figs",
            "Prunes",
            "Pomegranate",
            "Dragon fruit",
            "Passion fruit",
            "Guava",
            "Star fruit",
            "Lychee",
            "Persimmon",
            "Mulberry",
            "Breadfruit",
            "Jackfruit",
            "Tamarind",
            "Ugli fruit",
            "Ackee",
            "Gooseberry",
            "Elderberry",
            "Boysenberry",
            "Currant",
            "Cloudberry",
            "Loganberry",
            "Marionberry",
            "Saskatoon berry",
            "Sea buckthorn",
            "Ambarella",
            "Açaí berry",
            "Rowan berry",
            "Yuzu",
            "Jabuticaba",
            "Lingonberry",
            "Feijoa",
            "Jujube",
            "Juneberry",
            "Salak",
            "Longan",
            "Noni fruit",
            "Durian",
            "Sapodilla",
        ]

        for ingredient in ingredient_list:
            new_ing = Ingredient(name=ingredient)
            db.session.add(new_ing)
            db.session.commit()

        measurement_list = [
            "tsp",
            "tbsp",
            "C",
            "pt",
            "qt",
            "gal",
            "oz",
            "fl oz",
            "lb",
            "L",
            "g",
            "kg",
            "mL",
            "",
        ]

        quantity_list = []
        for _ in range(len(dish_list)):
            measurement = measurement_list[randint(0, (len(measurement_list)) - 1)]
            quantity = randint(1, 20)
            dish_id = randint(1, 10)
            ingredient_id = randint(1, len(ingredient_list))

            quantity = Quantity(
                measurement=measurement,
                quantity=quantity,
                dish_id=dish_id,
                ingredient_id=ingredient_id,
            )
            db.session.add(quantity)
            db.session.commit()
            quantity_list.append(quantity)
