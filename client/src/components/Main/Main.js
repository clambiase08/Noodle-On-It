import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Collections from "./Collections";
import ShoppingList from "./ShoppingList";
import AddRecipe from "./AddRecipe";
import DishDetail from "./DishDetail";

export default function Main() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch("/dishes")
      .then((res) => res.json())
      .then((dishes) => setDishes(dishes));
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home dishes={dishes} />
        </Route>
        <Route path="/dish-details/:id">
          <DishDetail dishes={dishes} />
        </Route>
        <Route path="/collections" component={Collections} />
        <Route path="/shopping-list" component={ShoppingList} />
        <Route path="/add-recipe" component={AddRecipe} />
      </Switch>
    </div>
  );
}
