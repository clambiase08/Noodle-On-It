import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Collections from "./Collections";
import ShoppingList from "./ShoppingList";
import AddRecipe from "./AddRecipe";
import DishDetail from "./DishDetail";
import CollectionDetail from "./CollectionDetail";

export default function Main() {
  const [dishes, setDishes] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/dishes")
      .then((res) => res.json())
      .then((dishes) => {
        setDishes(dishes);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/collections")
      .then((res) => res.json())
      .then((collections) => setCollections(collections));
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home dishes={dishes} loading={loading} />
        </Route>
        <Route path="/dish-details/:id">
          <DishDetail dishes={dishes} />
        </Route>
        <Route exact path="/collections">
          <Collections collections={collections} />
        </Route>
        <Route path="/collections/:id">
          <CollectionDetail collections={collections} />
        </Route>
        <Route path="/shopping-list/:id" component={ShoppingList} />
        <Route path="/add-recipe" component={AddRecipe} />
      </Switch>
    </div>
  );
}
