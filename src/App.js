import React from "react";
import Container from "react-bootstrap/Container";
import { Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import Header from "./components/Header";
import Home from "./components/Home";
import { default as Login, default as NewEmployee } from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/employees/all" exact component={EmployeeList} />
        <Route path="/employees/new" exact component={NewEmployee} />
      </Container>
    </div>
  );
}

export default App;
