import React from "react";
import DishDetail from "./DishDetail";
import {
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function DishCard({ name, image, user, onClick }) {
  return (
    <CardBody onClick={onClick}>
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt={name}
        borderRadius="lg"
      />
      <Stack mt="6" spacing="3">
        <Heading size="md">{name}</Heading>
        <Text>{user}</Text>
      </Stack>
    </CardBody>
  );
}
