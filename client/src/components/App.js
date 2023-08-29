import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./NavBar";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import Main from "./Main/Main";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <Route path="/login">
          <Login username={username} setUsername={setUsername} />
        </Route>
        <Route path="/logout">
          <Logout setUser={setUser} />
        </Route>
        <Route path="/signup">
          <Signup username={username} setUsername={setUsername} />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Router>
    </ChakraProvider>
  );
}

export default App;
