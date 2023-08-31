import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, useFormik, Field } from "formik";
import {
  Select,
  Button,
  Textarea,
  SelectField,
  FormLabel,
} from "@chakra-ui/react";

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

export default function DishDetail({ dishes, collections, user }) {
  const [toggleNote, setToggleNote] = useState(false);
  const [notesList, setNotesList] = useState([]);

  const relevantCollections = collections.map((collection) => collection.id);
  console.log(relevantCollections);
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
    if (relevantCollections.includes(note.collection_id)) {
      return <Text pb="1">{note.notes}</Text>;
    }
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

  const instructionsElements = dish.instructions.map((instruction, index) => (
    <p key={index}>{instruction}</p>
  ));

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
          window.location.reload();
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
          <Field
            as={Textarea}
            // type="text"
            onChange={props.handleChange}
            value={props.values.notes}
            name="notes"
            style={{ border: "1px solid" }}
            required
            placeholder="Add notes here..."
            focusBorderColor="orange.300"
            color="orange.500"
            _placeholder={{ color: "inherit" }}
            mb="5"
            w="90%"
          ></Field>
          <FormLabel color="orange.600" htmlFor="collection">
            Add to a Collection:
          </FormLabel>
          <Field
            as={SelectField}
            id="collection"
            type="string"
            name="collection"
            onChange={props.handleChange}
            w={"90%"}
            variant={"outline"}
            size={"lg"}
            borderColor="orange.300"
            required
            mb="5"
          >
            {collectionsDropdown}
          </Field>
          <Button
            bg={"orange.400"}
            fontWeight={600}
            color={"white"}
            size="md"
            type="submit"
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );

  return (
    <Grid
      h="200px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
      // background="#FCF8F3"
      mt="20"
    >
      <GridItem rowSpan={2} colSpan={2}>
        <Card>
          <CardBody>
            <Image
              src={
                dish.image.startsWith("http")
                  ? `${dish.image}`
                  : `http://localhost:4000/${dish.image}`
              }
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
          <Box mt="5">{instructionsElements}</Box>
        </Text>
      </GridItem>
      {user ? (
        <>
          <GridItem colSpan={2} ml="10">
            <Text
              lineHeight="1.5"
              fontWeight="bold"
              fontSize="20px"
              color="Color . Gray 3"
              width="357px"
              maxWidth="100%"
              mt="5"
            >
              Notes:
            </Text>
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
          <GridItem colSpan={2} mt="10">
            <Button
              colorScheme="orange"
              variant="outline"
              type="submit"
              onClick={handleToggleNote}
              mb="5"
            >
              Add Note
            </Button>
            {toggleNote ? noteForm : null}
          </GridItem>
        </>
      ) : (
        ""
      )}
    </Grid>
  );
}
