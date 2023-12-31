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
  CardHeader,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";

export default function CollectionCard({
  image,
  name,
  onClick,
  onClickCollection,
  id,
  collections,
  setCollections,
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

  function handleDelete() {
    fetch(`/collections/${id}`, {
      method: "DELETE",
    })
      // .then((res) => res.json())
      .then(() => {
        const updatedCollections = collections.filter(
          (collection) => collection.id !== id
        );
        setCollections(updatedCollections);
      });
  }

  return (
    <Card>
      <CardBody>
        <Center>
          <Image
            src={image}
            alt={name}
            borderRadius="lg"
            boxSize="xs"
            objectFit="cover"
          />
        </Center>
        <Stack mt="6" spacing="3">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="md">{nameJSX}</Heading>
            {name === "all" ? (
              ""
            ) : (
              <IconButton
                size="sm"
                icon={<FaTrashAlt />}
                variant="outline"
                colorScheme="orange"
                onClick={handleDelete}
              ></IconButton>
            )}
          </Flex>
        </Stack>
      </CardBody>
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button colorScheme="orange" size="sm" onClick={onClick}>
          Get Shopping List
        </Button>
        <Button colorScheme="orange" size="sm" onClick={onClickCollection}>
          Show Recipes
        </Button>
      </CardFooter>
    </Card>
  );
}
