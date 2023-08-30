import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import DishCard from "./DishCard";
import { Card } from "@chakra-ui/react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

export default function CollectionDetail({ collections }) {
  const history = useHistory();

  const { id } = useParams();
  const collection = collections.find(
    (collection) => collection.id === parseInt(id)
  );


  if (!collection) {
    return <div>Collection not found</div>;
  }

  const collectionDishes = collection.notes.map((note) => {
    const handleClick = () => {
      history.push(`/dish-details/${note.dish.id}`);
    };
    return (
      <DishCard
        key={note.id}
        name={note.dish.dish_name}
        image={note.dish.image}
        onClick={handleClick}
      />
    );
  });

  // const noteForm = (
  //   <Formik
  //     initialValues={{ notes: "" }}
  //     onSubmit={(value) => console.log(value)}
  //   >
  //     {(props) => (
  //       <form onSubmit={props.handleSubmit}>
  //         <textarea
  //           type="paragraph"
  //           // type="text"
  //           onChange={props.handleChange}
  //           value={props.values.notes}
  //           name="notes"
  //           style={{ border: "1px solid" }}
  //         ></textarea>
  //         <button type="submit">Submit</button>
  //       </form>
  //     )}
  //   </Formik>
  // );

  return (
    <div>
      <Card>{collectionDishes}</Card>
    </div>
  );
}
