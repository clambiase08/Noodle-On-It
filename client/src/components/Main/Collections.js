import React from "react";
import { useHistory } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import { Card, SimpleGrid, Text, Box, Button, Center } from "@chakra-ui/react";

export default function Collections({ collections, setCollections }) {
  const history = useHistory();

  const collectionList = collections.map((collection) => {
    const handleClick = () => {
      history.push(`/shopping-list/${collection.id}`);
    };
    const handleClickCollection = () => {
      history.push(`/collections/${collection.id}`);
    };
    return (
      <CollectionCard
        key={collection.id}
        id={collection.id}
        image={collection.image}
        name={collection.name}
        onClick={handleClick}
        onClickCollection={handleClickCollection}
        collections={collections}
        setCollections={setCollections}
      />
    );
  });

  const handleClickAdd = () => {
    history.push("/add-collection");
  };

  return (
    <>
      <Text
        lineHeight="1.2"
        fontWeight="bold"
        fontSize="56px"
        color="Color . Gray 1"
        maxWidth="100%"
        mt="20"
        textAlign={"center"}
      >
        My Collections
      </Text>
      <SimpleGrid columns={4} spacing={4} mt="10">
        {collectionList}
      </SimpleGrid>
      <Center>
        <Button
          alignItems={"center"}
          colorScheme="orange"
          mt="10"
          variant="outline"
          onClick={handleClickAdd}
        >
          Add Collection
        </Button>
      </Center>
    </>
  );
}

{
}
