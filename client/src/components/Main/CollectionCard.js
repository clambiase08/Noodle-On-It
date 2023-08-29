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
}) {
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
          <Heading size="md">{name}</Heading>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button onClick={onClick}>Get Shopping List</Button>
        <Button onClick={onClickCollection}>Show Recipes</Button>
      </CardFooter>
    </Card>
  );
}
