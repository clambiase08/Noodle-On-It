import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// const handleClick = () => setSignUp((signUp) => !signUp);
// const handleClick = (e) => console.log(e);

const formSchema = yup.object().shape({
  dish_name: yup.string().required("Please enter a user name"),
  instructions: yup.string().required("Please add instructions"),
  time_to_cook: yup.number().required("Please enter a time to cook"),
  time_to_prepare: yup.number().required("Please enter a time to prepare"),
});

const formik = useFormik({
  initialValues: {
    dish_name: "",
    instructions: "",
    time_to_cook: "",
    time_to_prepare: "",
  },
  validationSchema: formSchema,
  onsubmit: (e) => console.log(e),
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
});

export default function AddRecipeForm() {
  return (
    <div>
      <h2>Welcome to the add recipe</h2>
      <Form onSubmit={formik.handleSubmit}>
        <label>Recipe Name</label>
        <input
          type="text"
          name="recipeName"
          value={dish_name}
          onChange={formik.handleChange}
        />
      </Form>
    </div>
  );
}
