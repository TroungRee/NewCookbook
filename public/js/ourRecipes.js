$(document).ready(function(){


    $.post("serverCreate",{dish:"Tuna Casserole",
                     ingredients:"3 cups cooked macaroni, 1 (5 ounce) can tuna drained, 1 (10.75 ounce) can condensed cream of chicken soup, 1 cup shredded Cheddar cheese, 1 ½ cups French fried onions",
                     directions:"Step 1: Preheat oven to 350 degrees F (175 degrees C). Step 2: In a 9x13-inch baking dish, combine the macaroni, tuna, and soup. Mix well, and then top with cheese. Step 3: Bake at 350 degrees F (175 degrees C) for about 25 minutes, or until bubbly. Sprinkle with fried onions, and bake for another 5 minutes. Serve hot.",
                     category:"Dinner",
                     image:"Tuna Casserole.jpg",
                     index:4},null);

     $.post("serverCreate",{dish:"Easy Bake Fish",
                      ingredients:"3 tablespoons honey, 3 tablespoons Dijon mustard, 1 teaspoon lemon juice, 4 (6 ounce) salmon steaks, 0.5 teaspoon pepper",
                      directions:"Step 1: Preheat oven to 325 degrees F (165 degrees C). Step 2: In a small bowl, mix honey, mustard, and lemon juice. Spread the mixture over the salmon steaks. Season with pepper. Arrange in a medium baking dish. Step 3: Bake 20 minutes in the preheated oven, or until fish easily flakes with a fork.",
                      category:"Lunch",
                      image:"Easy Bake Fish.jpg",
                      index:5},null);
      $.post("serverCreate",{dish:"Crispy Baked Chicken",
                       ingredients:"2 cups crushed saltine crackers, 1 teaspoon seasoned salt, 1 pinch garlic powder, or to taste, 6 skinless, boneless chicken breast halves, 0.5 cups margarine, melted",
                       directions:"Step 1: Preheat oven to 425 degrees F (220 degrees C). Grease a baking dish. Step 2: Mix cracker crumbs, seasoned salt, and garlic powder in a shallow bowl. Dip chicken breasts into melted margarine and press into cracker mixture until coated. Arrange chicken in prepared baking dish. Step 3: Bake in preheated oven until chicken breasts are no longer pink in the center and the juices run clear, 45 to 60 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (75 degrees C).",
                       category:"Dinner",
                       image:"Crispy Baked Chicken.jpg",
                       index:6},null);
       $.post("serverCreate",{dish:"Peanut Butter Banana Smoothie",
                        ingredients:"2 bananas, broken into chunks, 2 cups milk, 0.5 cups peanut butter, 2 tablespoons honey, or to taste, 2 cups ice cubes",
                        directions:"Step 1: Place bananas, milk, peanut butter, honey, and ice cubes in a blender; blend until smooth, about 30 seconds.",
                        category:"Snack",
                        image:"Peanut Butter Banana Smoothie.jpg",
                        index:7},null);

});
