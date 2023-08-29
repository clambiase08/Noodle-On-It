import React from "react";
import { Text } from "@chakra-ui/react";

export default function IngredientList({ ingredient, quantity, measurement }) {
  return (
    <Text
      lineHeight="1.5"
      fontWeight="medium"
      fontSize="20px"
      color="Color . Gray 3"
      width="357px"
      maxWidth="100%"
    >
      {ingredient} | {quantity} {""}
      {measurement}
    </Text>
  );
}
