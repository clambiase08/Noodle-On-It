import React from "react";
import AddCollectionForm from "./AddCollectionForm";

export default function AddCollection({ collections, user, setCollections }) {
  return (
    <div>
      <h1>Add Collection</h1>
      <AddCollectionForm
        collections={collections}
        user={user}
        setCollections={setCollections}
      />
    </div>
  );
}
