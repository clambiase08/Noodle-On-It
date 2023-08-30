import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router";
import { Select } from "@chakra-ui/react";
import { useState } from "react";

// const handleClick = () => setSignUp((signUp) => !signUp);
// const handleClick = (e) => console.log(e);

// onSubmit: (values) => {
//   fetch(signUp ? "/signup" : "/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(values),
//   }).then((res) => {
//     if (res.ok) {
//       res.json().then((user) => {
//         console.log(user);
// updateUser(user)
// history.push('/')
//   });
// } else {
//12✅ Handle user errors if Auth fails
//12.1 add errors to state
//12.2 conditionally render the errors in jsx
//     res.json().then(console.log);
//   }
// });
// },

export default function AddRecipeForm({ ingredientList }) {
  const [displayIngredients, setDisplayIngredients] = useState([]);
  // function handleIngredientClick() {
  //   const quantity = {
  //     ingredient: formik.values.ingredient,
  //     measurement: formik.values.measurement,
  //     quantity: formik.values.quantity,
  //   };
  //   setDisplayIngredients([...displayIngredients, quantity]);
  //   // need to add handling that makes it so that you can't add one ingredient twice

  //   // dish id, ingredient id maybe try it after you add the dish to the db, then return the dish id
  // }
  console.log(displayIngredients);
  console.log(ingredientList);

  const history = useHistory();
  const measurementList = [
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
  ];

  // console.log(ingredientList);
  const ingDropDown = ingredientList.map((ingredient) => {
    return <option key={ingredient.id}>{ingredient.name}</option>;
  });
  const measurementDropDown = measurementList.map((measurement) => {
    return <option key={measurement}>{measurement}</option>;
  });

  const ingredientsAdded = displayIngredients.map((ingredient) => {
    return (
      <ul key={ingredient.ingredient}>
        {ingredient.ingredient}| {ingredient.quantity} {ingredient.measurement}
      </ul>
    );
  });

  const formSchema = yup.object().shape({
    dish_name: yup.string().required("Please enter a user name"),
    instructions: yup.string().required("Please add instructions"),
    time_to_cook: yup.number().required("Please enter a time to cook"),
    time_to_prepare: yup.number().required("Please enter a time to prepare"),
    image: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      dish_name: "",
      instructions: "",
      time_to_cook: "",
      time_to_prepare: "",
      image: "",
    },
    validationSchema: formSchema,
    onSubmit: (value) => {
      console.log(value);
      fetch("/dishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      }).then((r) => {
        if (r.ok) {
          r.json().then((dish) => {
            console.log("good!");
            console.log(dish);
            displayIngredients.forEach((ingredient) => {
              const new_ingredient = {
                quantity: parseInt(ingredient.quantity),
                measurement: ingredient.measurement,
                dish_id: dish.id,
                ingredient_id: ingredientList.find(
                  (ingredientListItem) =>
                    ingredientListItem.name === ingredient.ingredient
                ).id,
              };
              fetch("/quantities", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(new_ingredient),
              }).then((r) => {
                if (r.ok) {
                  r.json().then((quantity) => {
                    console.log("quantity good!");
                    console.log(quantity);
                    history.push("/");
                    window.location.reload();
                  });
                } else {
                  r.json().then((error) => {
                    console.log("no good");
                    console.log(error);
                  });
                }
              });
            });
            // have to make error handling if they don't include ingredients
            //have to add it to the dishes state
          });
        } else {
          r.json().then((error) => {
            console.log("no good");
            console.log(error);
          });
        }
      });
    },
  });

  const formSchema2 = yup.object().shape({
    quantity: yup.number().required("Please enter a time to prepare"),
    measurement: yup.string().required("Please enter a measrement"),
  });

  const formik2 = useFormik({
    initialValues: {
      ingredient: "Salt",
      quantity: "1",
      measurement: "tsp",
    },
    validationSchema: formSchema2,
    onSubmit: (value) => {
      // console.log(value);
      setDisplayIngredients([...displayIngredients, value]);
    },
  });

  return (
    <div>
      {/* <h2>Welcome to the add recipe</h2> */}
      <br />
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label>Recipe Name</label>
        <input
          type="text"
          name="dish_name"
          value={formik.values.dish_name}
          onChange={formik.handleChange}
          style={{ margin: "30px", border: "1px solid" }}
        />
        <label>Instructions</label>
        <textarea
          type="paragraph"
          name="instructions"
          value={formik.values.instructions}
          onChange={formik.handleChange}
          style={{ border: "1px solid" }}
        />
        <label>Time to Cook</label>
        <input
          type="number"
          name="time_to_cook"
          value={formik.values.time_to_cook}
          onChange={formik.handleChange}
          style={{ margin: "30px", border: "1px solid" }}
        />
        <label>Time to Prepare</label>
        <input
          type="number"
          name="time_to_prepare"
          value={formik.values.time_to_prepare}
          onChange={formik.handleChange}
          style={{ margin: "30px", border: "1px solid" }}
        />
        <button type="submit">Add Dish</button>
        <label>Image</label>
        <input
          type="string"
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
          style={{ margin: "30px", border: "1px solid" }}
        />
      </form>
      <form onSubmit={formik2.handleSubmit} style={{ margin: "30px" }}>
        <label>Ingredient List</label>
        <Select
          type="string"
          name="ingredient"
          onChange={formik2.handleChange}
          w={"200px"}
        >
          {ingDropDown}
        </Select>
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formik2.values.quantity}
          style={{ margin: "30px", border: "1px solid" }}
          onChange={formik2.handleChange}
          required
        />
        <label>Measurement</label>
        <Select
          type="string"
          name="measurement"
          onChange={formik2.handleChange}
          w={"200px"}
        >
          {measurementDropDown}
        </Select>
        <button type="submit">Add Ingredient</button>
      </form>
      <li>{ingredientsAdded}</li>
    </div>
  );
}
