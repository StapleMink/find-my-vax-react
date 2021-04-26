import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Resources from "./Resources";
import Contact from "./Contact";
import About from "./About";
import HowToUse from "./HowToUse";
import Status from "./Status";

export default function App(): JSX.Element {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/status">
            <Status />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/resources">
            <Resources />
          </Route>
          <Route path="/howtouse">
            <HowToUse />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
