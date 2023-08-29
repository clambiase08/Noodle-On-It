import React from "react";
import {
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";

export default function DishCard({ name, image, user, onClick }) {
  return (
    <CardBody onClick={onClick}>
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
        <Text>{user}</Text>
      </Stack>
    </CardBody>
  );
}
