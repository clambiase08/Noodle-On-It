import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Collections from "./Collections";
import ShoppingList from "./ShoppingList";
import AddRecipe from "./AddRecipe";
import DishDetail from "./DishDetail";
import CollectionDetail from "./CollectionDetail";
import AddCollection from "./AddCollection";

export default function Main({ collections }) {
  const [dishes, setDishes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    fetch("/dishes")
      .then((res) => res.json())
      .then((dishes) => {
        setDishes(dishes);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/ingredients")
      .then((res) => res.json())
      .then((ingredients) => setIngredientList(ingredients));
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home dishes={dishes} loading={loading} />
        </Route>
        <Route path="/dish-details/:id">
          <DishDetail dishes={dishes} collections={collections} />
        </Route>
        <Route exact path="/collections">
          <Collections collections={collections} />
        </Route>
        <Route path="/collections/:id">
          <CollectionDetail collections={collections} />
        </Route>
        <Route path="/shopping-list/:id">
          <ShoppingList collections={collections} />
        </Route>
        <Route path="/add-recipe">
          <AddRecipe ingredientList={ingredientList} />
        </Route>
        <Route path="/add-collection">
          <AddCollection />
        </Route>
      </Switch>
    </div>
  );
}
