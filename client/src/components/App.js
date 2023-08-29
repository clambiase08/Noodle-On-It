import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./NavBar";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import Main from "./Main/Main";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={Signup} />
        <Route component={Main} />
      </Router>
    </ChakraProvider>
  );
}

export default App;
