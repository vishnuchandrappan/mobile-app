import React from "react";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import store from "./redux/store";
import Routes from "./Resources/Routes";
function App() {
  return (
    <Provider store={store}>
      <Header />
      <Container>
        <Routes />
      </Container>
    </Provider>
  );
}

export default App;
