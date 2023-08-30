import React from "react";
import {
  CardBody,
  Image,
  Stack,
  Heading,
  Center,
  Card,
  CardFooter,
  Button,
} from "@chakra-ui/react";

export default function CollectionCard({
  image,
  name,
  onClick,
  onClickCollection,
  id,
}) {
  function handleEdit(e) {
    // console.log(id);
    let x = true;
    while (x) {
      if (e.target.innerHTML === "all" || e.target.innerHTML === "favorite") {
        console.log("try again");
        x = false;
      } else {
        fetch(`/collections/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: e.target.innerHTML }),
        });
        x = false;
      }
    }
  }
  let nameJSX;
  if (name === "all" || name === "favorite") {
    nameJSX = <Heading size="md">{name}</Heading>;
  } else {
    nameJSX = (
      <Heading size="md" contentEditable onBlur={handleEdit}>
        {name}
      </Heading>
    );
  }
  return (
    <Card>
      <CardBody>
        <Center>
          <Image
            src={image}
            alt={name}
            borderRadius="lg"
            boxSize="sm"
            objectFit="cover"
          />
        </Center>
        <Stack mt="6" spacing="3">
          {/* <Heading size="md" contentEditable onBlur={handleEdit}>
            {name}
          </Heading> */}
          {nameJSX}
        </Stack>
      </CardBody>
      <CardFooter>
        <Button onClick={onClick}>Get Shopping List</Button>
        <Button onClick={onClickCollection}>Show Recipes</Button>
      </CardFooter>
    </Card>
  );
}
