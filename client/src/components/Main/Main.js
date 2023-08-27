import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Collections from "./Collections";
import ShoppingList from "./ShoppingList";
import AddRecipe from "./AddRecipe";

export default function Main() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/collections" component={Collections} />
        <Route path="/shopping-list" component={ShoppingList} />
        <Route path="/add-recipe" component={AddRecipe} />
      </Switch>
    </div>
  );
}
