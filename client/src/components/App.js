import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import Main from "./Main/Main";

function App() {
  const [username, setUsername] = useState("");
  return (
    <Router>
      <NavBar />
      <Route path="/login">
        <Login username={username} setUsername={setUsername} />
      </Route>
      <Route path="/logout" component={Logout} />
      <Route path="/signup">
        <Signup username={username} setUsername={setUsername} />
      </Route>
      <Route component={Main} />
    </Router>
  );
}

export default App;
