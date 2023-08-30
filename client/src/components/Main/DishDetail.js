import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, useFormik } from "formik";
import { Select, Button } from "@chakra-ui/react";

// http://localhost:4000/images/spaghetti.png

import {
  Box,
  Text,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Image,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import IngredientList from "./IngredientList";

export default function DishDetail({ dishes, collections }) {
  const [toggleNote, setToggleNote] = useState(false);
  const [notesList, setNotesList] = useState([]);

  console.log(notesList);
  useEffect(() => {
    fetch("/notes")
      .then((r) => r.json())
      .then((notes) => {
        const filteredNotes = notes.filter((note) => note.dish_id == id);
        setNotesList(filteredNotes.reverse());
      });
  }, []);

  function handleToggleNote(e) {
    setToggleNote(!toggleNote);
  }

  const { id } = useParams();
  const dish = dishes.find((dish) => dish.id === parseInt(id));

  if (!dish) {
    return <div>Dish not found</div>;
  }

  const notesToDisplay = notesList.map((note) => {
    return <Text pb="1">{note.notes}</Text>;
  });

  const ingredientList = dish.quantities.map((quantity) => {
    return (
      <IngredientList
        key={quantity.id}
        ingredient={quantity.ingredient.name}
        quantity={quantity.quantity}
        measurement={quantity.measurement}
      />
    );
  });

  const collectionsDropdown = collections.map((collection) => {
    return (
      <option key={collection.id} value={collection.id}>
        {collection.name}
      </option>
    );
  });

  function handlePostNote(value) {
    const new_note = {
      notes: value["notes"],
      collection_id: value["collection"],
      dish_id: `${id}`,
    };
    fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_note),
    }).then((r) => {
      if (r.ok) {
        r.json().then((note) => {
          console.log("good!");
          console.log(note);
          const notesToSpread = [...notesList];
          notesToSpread.unshift(note);
          setNotesList(notesToSpread);
        });
      } else {
        r.json().then((error) => {
          console.log("no good");
          console.log(error);
        });
      }
    });
  }

  const noteForm = (
    <Formik
      initialValues={{ notes: "", collection: `${collections[0]?.id}` }}
      onSubmit={(value) => handlePostNote(value)}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <textarea
            type="paragraph"
            // type="text"
            onChange={props.handleChange}
            value={props.values.notes}
            name="notes"
            style={{ border: "1px solid" }}
            required
          ></textarea>
          <Select
            type="string"
            name="collection"
            onChange={props.handleChange}
            w={"200px"}
            required
          >
            {collectionsDropdown}
          </Select>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </Formik>
  );

  return (
    <Grid
      h="200px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
      // background="#FCF8F3"
      mt="20"
    >
      <GridItem rowSpan={1} colSpan={1}>
        <Card>
          <CardBody>
            <Image
              src={`http://localhost:4000/${dish.image}`}
              alt={dish.dish_name}
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{dish.dish_name}</Heading>
              <Text>
                <p>Prep Time: {dish.time_to_prepare}min</p>
                <p>Cook Time: {dish.time_to_cook}min</p>
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={2}>
        <Text
          lineHeight="1.2"
          fontWeight="bold"
          fontSize="56px"
          color="Color . Gray 1"
          width="374px"
          maxWidth="100%"
        >
          Ingredients
        </Text>
        <Box mt="5">{ingredientList}</Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Text
          lineHeight="1.2"
          fontWeight="bold"
          fontSize="56px"
          color="Color . Gray 1"
          width="374px"
          maxWidth="100%"
        >
          Instructions
        </Text>
        <Text
          lineHeight="1.5"
          fontWeight="medium"
          fontSize="20px"
          color="Color . Gray 3"
          width="357px"
          maxWidth="100%"
        >
          <Box mt="5">{dish.instructions}</Box>
        </Text>
      </GridItem>
      <GridItem colSpan={5} ml="10">
        <Button type="submit" onClick={handleToggleNote}>
          Add Note
        </Button>
        <Text
          lineHeight="1.5"
          fontWeight="bold"
          fontSize="20px"
          color="Color . Gray 3"
          width="357px"
          maxWidth="100%"
          mt="10"
        >
          Notes:
        </Text>
        {toggleNote ? noteForm : null}
        <Text
          lineHeight="1.5"
          fontWeight="medium"
          fontSize="18px"
          color="Color . Gray 3"
          maxWidth="100%"
        >
          {notesToDisplay}
        </Text>
      </GridItem>
    </Grid>
  );
}
