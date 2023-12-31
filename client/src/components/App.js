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
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchUser();
    // fetchCollections();
  }, []);

  const fetchCollections = (id) =>
    // fetch(`/collections?user_id=${id}`)
    fetch(`/collections`)
      .then((res) => res.json())
      .then((collections) => {
        const filteredCollections = collections.filter(
          (collections) => collections.user_id === parseInt(id)
        );
        setCollections(filteredCollections);
        console.log(filteredCollections);
      });

  const fetchUser = () =>
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          console.log(user);
          fetchCollections(user.id);
        });
      }
    });

  return (
    <ChakraProvider>
      <Router>
        <NavBar collections={collections} user={user} setUser={setUser} />
        <Route path="/login">
          <Login
            user={user}
            setUser={setUser}
            fetchUser={fetchUser}
            collections={collections}
            setCollections={setCollections}
          />
        </Route>
        <Route path="/logout">
          <Logout setUser={setUser} />
        </Route>
        <Route path="/signup">
          <Signup
            user={user}
            setUser={setUser}
            fetchUser={fetchUser}
            collections={collections}
            setCollections={setCollections}
          />
        </Route>
        <Route path="/">
          <Main
            collections={collections}
            user={user}
            setCollections={setCollections}
          />
        </Route>
      </Router>
    </ChakraProvider>
  );
}

export default App;
