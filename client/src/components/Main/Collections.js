import React from "react";
import { useHistory } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import { Card, SimpleGrid } from "@chakra-ui/react";

export default function Collections({ collections }) {
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
        image={collection.image}
        name={collection.name}
        onClick={handleClick}
        onClickCollection={handleClickCollection}
      />
    );
  });

  return (
    <SimpleGrid columns={3} spacing={4}>
      {collectionList}
    </SimpleGrid>
  );
}
