import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./components/screens/Welcome";
import Navbar from "./components/layout/Navbar";
import YololEditor from "./components/layout/YololEditor";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Router>
      <React.Fragment>
        <Container>
        <Navbar />
          <Switch>
            <Route exact path="/welcome" component={Welcome}/>
            <Route exact path="/edit" component={YololEditor}/>
          </Switch>
        </Container>
      </React.Fragment>
    </Router>
  );
}

export default App;
