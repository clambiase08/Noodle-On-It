import React from "react";
import {
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";

export default function DishCard({ name, image, user, onClick, displayUser }) {
  // console.log(image);
  return (
    <CardBody onClick={onClick}>
      <Center>
        <Image
          src={
            image.startsWith("http")
              ? `${image}`
              : `http://localhost:4000/${image}`
          }
          alt={name}
          borderRadius="lg"
          boxSize="xs"
          objectFit="cover"
        />
      </Center>
      <Stack mt="6" spacing="3">
        <Heading size="md">{name}</Heading>
        {displayUser ? <Text>Added by @{user}</Text> : ""}
      </Stack>
    </CardBody>
  );
}
